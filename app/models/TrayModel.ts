import mongoose from 'mongoose'


const trayModelSchema = new mongoose.Schema<IWaiikruModel>({
  name: { type: String, required: true },
  message: { type: String, required: true },
  selectedTray: { type: String, required: true },
})

const TrayModel = mongoose.models.Tray || mongoose.model<IWaiikruModel>('Tray', trayModelSchema)

export default TrayModel