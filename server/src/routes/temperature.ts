import * as express from "express";
const createError = require("http-errors");
import Temperature from "../models/temperature";

const router = express.Router();

router.param(
    "id",
    async (
        req: express.Request,
        res: express.Response,
        next: Function,
        id: Number
    ) => {
        let temperature = null;
        try {
            temperature = await Temperature.findById(id);
        } catch (err) {
            return next(createError(500, err));
        }
        if (temperature === null) {
            return next(createError(404));
        }
        res.locals.requestedTemperature = temperature;
        next();
    }
);

// Get all temperatures
router.get("/", async (req: express.Request, res: express.Response) => {
    let temperatures = await Temperature.find().sort("-date");
    res.status(200).json({ data: temperatures });
});

// Get individual temperature
router.get("/:id", (req: express.Request, res: express.Response) => {
    res.status(200).json(res.locals.requestedTemperature);
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
        await Temperature.create([
            {
                createdAt: new Date(),
                sensors: req.body.sensors
            }
        ]);
        res.status(204).end();
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
