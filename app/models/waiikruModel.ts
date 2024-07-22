// models/YourModel.ts
import mongoose from 'mongoose'

interface IWaiikruModel {
  name: string;
  message: string;
  image:string

}

const WaiikruModelSchema = new mongoose.Schema<IWaiikruModel>({
  name: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String, required: true },
})

export default mongoose.models.YourModel || mongoose.model<IWaiikruModel>('YourModel', WaiikruModelSchema)