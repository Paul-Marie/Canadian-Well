import * as express from "express";
const createError = require("http-errors");
import Temperature from "../models/temperature";

const router = express.Router();

// Get all temperatures
router.get("/", async (req: express.Request, res: express.Response) => {
    const temperatures = await Temperature.find().sort("date");
    res.status(200).json({ data: temperatures });
});

// Get individual temperature
router.get("/:id", async (req: express.Request, res: express.Response) => {
    const temperatures = await Temperature.find({
        id: req.params.id
    }).sort("date");
    res.status(200).json(temperatures);
});

// Delete existing temperature
router.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
        await res.locals.requestedTemperature.remove();
    } catch (err) {
        res.status(500).send(err);
    }
    res.status(204).json();
});

// Upload new temperature
router.post("/", async (req: express.Request, res: express.Response) => {
    try {
        await Temperature.create(
            req.body.sensors.map((sensor) => ({
                date: (sensor.date) ? new Date(sensor.date) : new Date(),
                id: sensor.id,
                value: sensor.value
            })));
        res.status(204).end();
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
