import type { VercelRequest, VercelResponse } from "@vercel/node";
import mysql from "mysql2/promise";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

async function ensureTable() {
  await pool.execute(`
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
  try {
    await ensureTable();

    if (req.method === "POST") {
      const a = req.body;
      const id = `db_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      await pool.execute(
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
      const [rows] = await pool.execute(
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
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "DB error" });
  }
}
