import * as mongoose from "mongoose";

const currentSchema = new mongoose.Schema({
    sensors: {
        type: [{
            id: { type: Number },
            value: { type: Number }
        }],
        required: true
    }
});

export default mongoose.model("Current", currentSchema);
