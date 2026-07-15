import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Group extends Document {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String })
  description!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner!: Types.ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] })
  members!: Types.ObjectId[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);