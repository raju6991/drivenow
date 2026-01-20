const request = require("supertest");
const sqlite3 = require("sqlite3").verbose();
const express = require("express");

// --- Setup in-memory DB ---
const db = new sqlite3.Database(":memory:");
const app = express();
app.use(express.json());

db.serialize(() => {
	db.run(`
    CREATE TABLE cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      make TEXT,
      model TEXT,
      year INTEGER,
      weeklyRate INTEGER,
      available INTEGER DEFAULT 1,
      licensePlate TEXT UNIQUE,
      imageUrl TEXT
    )
  `);

	const stmt = db.prepare(`
    INSERT INTO cars 
    (make, model, year, weeklyRate, available, licensePlate, imageUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

	const cars = [
		{
			make: "Nissan",
			model: "Tiida",
			year: 2011,
			weeklyRate: 180,
			available: 1,
			licensePlate: "ABC-123",
			imageUrl: "url1",
		},
		{
			make: "Toyota",
			model: "Yaris",
			year: 2012,
			weeklyRate: 170,
			available: 1,
			licensePlate: "DEF-456",
			imageUrl: "url2",
		},
		{
			make: "Hyundai",
			model: "Accent",
			year: 2013,
			weeklyRate: 165,
			available: 1,
			licensePlate: "GHI-789",
			imageUrl: "url3",
		},
		{
			make: "Suzuki",
			model: "Swift",
			year: 2014,
			weeklyRate: 175,
			available: 1,
			licensePlate: "JKL-012",
			imageUrl: "url4",
		},
		{
			make: "Mitsubishi",
			model: "Mirage",
			year: 2015,
			weeklyRate: 185,
			available: 1,
			licensePlate: "MNO-345",
			imageUrl: "url5",
		},
		{
			make: "Kia",
			model: "Rio",
			year: 2013,
			weeklyRate: 160,
			available: 1,
			licensePlate: "PQR-678",
			imageUrl: "url6",
		},
	];

	cars.forEach((c) => {
		stmt.run(
			c.make,
			c.model,
			c.year,
			c.weeklyRate,
			c.available,
			c.licensePlate,
			c.imageUrl,
		);
	});
	stmt.finalize();
});

// --- API route for test ---
app.get("/api/cars", (_req, res) => {
	db.all("SELECT * FROM cars", [], (err, rows) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json(rows);
	});
});

describe("GET /api/cars", () => {
	it("should return all seeded cars", async () => {
		const res = await request(app).get("/api/cars");
		expect(res.statusCode).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body.length).toBe(6);
		res.body.forEach((car) => {
			expect(car).toHaveProperty("id");
			expect(car).toHaveProperty("make");
			expect(car).toHaveProperty("model");
			expect(car).toHaveProperty("year");
			expect(car).toHaveProperty("weeklyRate");
			expect(car).toHaveProperty("available");
			expect(car).toHaveProperty("licensePlate");
			expect(car).toHaveProperty("imageUrl");
		});
	});
});
