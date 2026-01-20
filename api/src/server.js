const express = require("express");
const db = require("./db");

// Load environment variables
require("dotenv").config();

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(
	cors({
		origin: ["https://gccheapcarrental.com", "http://localhost:5173"], // allow production and development frontend
		methods: ["GET", "POST", "PUT", "DELETE"],
	}),
);

app.get("/", (_req, res) => {
	res.send("Node Works");
});

app.get("/api/cars", (_req, res) => {
	db.all("SELECT * FROM cars", [], (err, rows) => {
		if (err) return res.status(500).json({ error: err.message });
		console.log("Returning rows:", rows.length);
		res.json(rows);
	});
});

app.post("/api/enquiries", (req, res) => {
	const { name, phone, email, rental_duration, vehicle_interest, message } =
		req.body;

	// Validate required fields
	if (!name || !phone) {
		return res.status(400).json({ error: "Name and phone are required" });
	}

	// Log the enquiry for now (email setup needed)
	console.log("New Enquiry Received:");
	console.log("Name:", name);
	console.log("Phone:", phone);
	console.log("Email:", email || "Not provided");
	console.log("Rental Duration:", rental_duration || "Not specified");
	console.log("Vehicle Interest:", vehicle_interest || "Not specified");
	console.log("Message:", message || "Not provided");
	console.log("---");

	// For now, just return success without email
	// TODO: Configure proper email service
	res.status(200).json({ message: "Enquiry received successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
