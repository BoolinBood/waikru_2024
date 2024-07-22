// models/YourModel.ts
import mongoose from 'mongoose'

interface IWaiikruModel {
  name: string;
  message: string;

}

const WaiikruModelSchema = new mongoose.Schema<IWaiikruModel>({
  name: { type: String, required: true },
  message: { type: String, required: true },
  // Define other fields
})

export default mongoose.models.YourModel || mongoose.model<IWaiikruModel>('YourModel', WaiikruModelSchema)