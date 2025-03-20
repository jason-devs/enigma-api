import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  rotors: {
    type: [Number],
  },
  reflector: {
    type: String,
    enum: {
      values: ["B", "C"],
      message: "Reflector can only be of type B or C!",
    },
  },
  plugboard: {
    type: [String],
  },
  ringPositions: {
    type: [Number],
  },
  startRotations: {
    type: [Number],
  },
});

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
