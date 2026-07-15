import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String })
  description!: string;

  @Prop({ type: Date, required: true })
  date!: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true })
  group!: Types.ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] })
  attendees!: Types.ObjectId[];
}

export const EventSchema = SchemaFactory.createForClass(Event);