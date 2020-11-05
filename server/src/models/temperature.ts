import * as mongoose from "mongoose";

const temperatureSchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now },
    id: { type: Number },
    value: { type: Number },
});

export default mongoose.model("Temperature", temperatureSchema);
