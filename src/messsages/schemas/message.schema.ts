import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  sender!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  recipient!: Types.ObjectId;

  @Prop({ type: String, required: true })
  content!: string;

  @Prop({ type: Date, default: null })
  readAt!: Date | null;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.index({ sender: 1, recipient: 1, createdAt: -1 }); // requêtes de conversation efficaces