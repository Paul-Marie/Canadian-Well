import * as express from "express";
import Current from "../models/current";

const router = express.Router();

// Get current temperature
router.get("/", async (req: express.Request, res: express.Response) => {
    const current_temperatures = await Current.find({});
    res.status(200).json({ data: current_temperatures });
});

// Upload new current temperature by replacing the old one
router.post("/", async (req: express.Request, res: express.Response) => {
    try {
        await Current.findOneAndUpdate({}, {
            sensors: req.body.sensors
        });
        res.status(204).end();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Create the current temperature, must be used only one time at instalation
router.post("/create", async (req: express.Request, res: express.Response) => {
    try {
        await Current.create([{ sensors: {} }]);
        res.status(204).end();
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
