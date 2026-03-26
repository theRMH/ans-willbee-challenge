import type { VercelRequest, VercelResponse } from "@vercel/node";
import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 3,
      connectTimeout: 10000,
    });
  }
  return pool;
}

async function ensureTable() {
  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id VARCHAR(60) PRIMARY KEY,
      studentName VARCHAR(255) NOT NULL,
      totalScore INT NOT NULL,
      zone VARCHAR(255) NOT NULL,
      recommendation TEXT,
      timestamp BIGINT NOT NULL,
      score_Commerce INT DEFAULT 0,
      score_Economics INT DEFAULT 0,
      score_English INT DEFAULT 0,
      score_Maths INT DEFAULT 0,
      score_Accountancy INT DEFAULT 0,
      score_Costing INT DEFAULT 0
    )
  `);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Log env check (no secrets)
  console.log("DB_HOST:", process.env.DB_HOST ? "set" : "MISSING");
  console.log("DB_USER:", process.env.DB_USER ? "set" : "MISSING");
  console.log("DB_PASS:", process.env.DB_PASS ? "set" : "MISSING");
  console.log("DB_NAME:", process.env.DB_NAME ? "set" : "MISSING");

  try {
    await ensureTable();

    if (req.method === "POST") {
      const a = req.body;
      const id = `db_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      await getPool().execute(
        `INSERT INTO quiz_attempts (id, studentName, totalScore, zone, recommendation, timestamp,
          score_Commerce, score_Economics, score_English, score_Maths, score_Accountancy, score_Costing)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id, a.studentName, a.totalScore, a.zone, a.recommendation || "",
          a.timestamp,
          a.scores?.Commerce || 0, a.scores?.Economics || 0, a.scores?.English || 0,
          a.scores?.Maths || 0, a.scores?.Accountancy || 0, a.scores?.Costing || 0,
        ]
      );
      return res.json({ id });
    }

    if (req.method === "GET") {
      const [rows] = await getPool().execute(
        "SELECT * FROM quiz_attempts ORDER BY timestamp DESC"
      );
      const attempts = (rows as any[]).map((r) => ({
        id: r.id,
        studentName: r.studentName,
        totalScore: r.totalScore,
        zone: r.zone,
        recommendation: r.recommendation,
        timestamp: Number(r.timestamp),
        scores: {
          Commerce: r.score_Commerce,
          Economics: r.score_Economics,
          English: r.score_English,
          Maths: r.score_Maths,
          Accountancy: r.score_Accountancy,
          Costing: r.score_Costing,
        },
      }));
      return res.json(attempts);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error("DB error:", err?.message || err);
    res.status(500).json({ error: "DB error", detail: err?.message });
  }
}
