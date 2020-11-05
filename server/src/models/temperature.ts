import * as mongoose from "mongoose";

const temperatureSchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now },
    sensors: {
        type: [{
            id: { type: Number },
            value: { type: Number }
        }], required: true }
});

export default mongoose.model("Temperature", temperatureSchema);
