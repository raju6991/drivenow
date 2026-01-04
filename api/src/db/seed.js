const db = require("./index");

const cars = [
	{ make: "Mitsubishi", model: "Lancer", year: 2011, weeklyRate: 180, available: 1, licensePlate: "ABC-123", imageUrl: "https://images.unsplash.com/photo-1705771802714-a3735fc6fc96?w=400&h=300&fit=crop" },
	{ make: "Nissan", model: "Micra", year: 2012, weeklyRate: 170, available: 1, licensePlate: "DEF-456", imageUrl: "https://images.unsplash.com/photo-1709645609654-55916e2defda?w=400&h=300&fit=crop" },
	{ make: "Mazda", model: "3", year: 2013, weeklyRate: 165, available: 1, licensePlate: "GHI-789", imageUrl: "https://images.unsplash.com/photo-1713096377080-b5b258dc7da3?w=400&h=300&fit=crop" },
	{ make: "Nissan", model: "Tiida", year: 2014, weeklyRate: 175, available: 1, licensePlate: "JKL-012", imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop" },
	{ make: "Toyota", model: "Yaris", year: 2015, weeklyRate: 185, available: 1, licensePlate: "MNO-345", imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
	{ make: "Kia", model: "Rio", year: 2013, weeklyRate: 160, available: 1, licensePlate: "PQR-678", imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop" },
];

// Create table and insert cars
db.serialize(() => {
	db.run(`
    CREATE TABLE IF NOT EXISTS cars (
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

	// First, clear existing cars to ensure fresh seed
	db.run("DELETE FROM cars");

	const stmt = db.prepare(`
    INSERT INTO cars 
    (make, model, year, weeklyRate, available, licensePlate, imageUrl) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

	cars.forEach(car => {
		stmt.run(car.make, car.model, car.year, car.weeklyRate, car.available, car.licensePlate, car.imageUrl);
	});

	stmt.finalize(() => {
		console.log("✅ Seeded cars successfully!");
		db.close();
	});
});
