const sqlite3 = require("sqlite3").verbose();
const path = require("node:path");

const dbPath = path.resolve(__dirname, "cars.db");
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error("Failed to connect to SQLite DB:", err.message);
	} else {
		console.log("Connected to SQLite DB:", dbPath);
	}
});

module.exports = db;
