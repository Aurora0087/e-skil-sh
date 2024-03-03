import { Document, Schema, model, models } from "mongoose";

export interface IVideoContent extends Document {
    _id: string;
    title: string;
    description?: string;
    createdAt: Date;
    imageUrl: string;
    videoeUrl: string;
    price: number;
    category: { _id: string, name: string }
    organizer: { _id: string, firstName: string, lastName: string }
}

const VideoContentSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    videoeUrl: { type: String, required: true },
    price: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
})

const VideoContent = models.VideoContent || model('VideoContent', VideoContentSchema);

export default VideoContent;