const express = require("express");
const { db } = require("../db");
const { cars } = require("../db/schema");
const validate = require("../middleware/validate");
const {
	createCarSchema,
	updateCarSchema,
	carQuerySchema,
} = require("../validators/car.schema");

const router = express.Router();

/**
 * GET /api/cars
 * Optional query:
 *  - ?available=true|false
 */
router.get("/", async (req, res) => {
	try {
		// ✅ Validate query params with Zod
		const parsedQuery = carQuerySchema.safeParse(req.query);

		if (!parsedQuery.success) {
			return res.status(400).json({
				error: "Invalid query parameters",
				issues: parsedQuery.error.format(),
			});
		}

		let query = db.select().from(cars);

		// ✅ Apply filter if provided
		if (parsedQuery.data.available !== undefined) {
			query = query.where({
				available: parsedQuery.data.available ? 1 : 0,
			});
		}

		const result = await query;

		res.status(200).json({
			count: result.length,
			data: result.map((car) => ({
				id: car.id,
				make: car.make,
				model: car.model,
				year: car.year,
				weeklyRate: car.weeklyRate,
				available: Boolean(car.available),
				licensePlate: car.licensePlate,
				imageUrl: car.imageUrl,
				createdAt: car.createdAt,
				updatedAt: car.updatedAt,
			})),
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

/**
 * POST /api/cars
 * Admin only (future auth)
 */
router.post("/", validate(createCarSchema), async (req, res) => {
	try {
		await db.insert(cars).values({
			...req.body,
			available: req.body.available ? 1 : 0,
		});

		res.status(201).json({ message: "Car created successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

/**
 * PATCH /api/cars/:id
 */
router.patch("/:id", validate(updateCarSchema), async (req, res) => {
	try {
		const carId = Number(req.params.id);

		if (Number.isNaN(carId)) {
			return res.status(400).json({ error: "Invalid car ID" });
		}

		await db
			.update(cars)
			.set({
				...req.body,
				available:
					typeof req.body.available === "boolean"
						? req.body.available
							? 1
							: 0
						: undefined,
			})
			.where({ id: carId });

		res.json({ message: "Car updated successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
