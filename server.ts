import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

async function initDB() {
  const [rows]: any = await pool.execute("SELECT DATABASE() as db");
  console.log("Connected to DB:", rows[0].db);
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
  console.log("DB ready.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/attempts", async (req, res) => {
    try {
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
      res.json({ id });
    } catch (err) {
      console.error("DB error:", err);
      res.status(500).json({ error: "Failed to save attempt" });
    }
  });

  app.get("/api/attempts", async (req, res) => {
    try {
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
      res.json(attempts);
    } catch (err) {
      console.error("DB error:", err);
      res.status(500).json({ error: "Failed to fetch attempts" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  await initDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
