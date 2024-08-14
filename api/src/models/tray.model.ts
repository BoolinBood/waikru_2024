import mongoose from "mongoose";

const trayModelSchema = new mongoose.Schema<TrayType>({
  name: { type: String, required: true },
  message: { type: String, required: true },
  flower: { type: String, required: true },
  dept: { type: String, required: true },
  degree: { type: String, required: false },
});

const TrayModel =
  mongoose.models.Tray || mongoose.model<TrayType>("Tray", trayModelSchema);

export default TrayModel;
