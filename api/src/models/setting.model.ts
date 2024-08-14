import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  isReadOnly: { type: Boolean, default: false },
  badWords: { type: [String], default: [] },
});

const SettingsModel = mongoose.model("Settings", SettingsSchema);

export default SettingsModel;
