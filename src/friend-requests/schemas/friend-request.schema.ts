// src/friend-requests/schemas/friend-request.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) // ajoute createdAt/updatedAt automatiquement
export class FriendRequest extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  requester!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  recipient!: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'DECLINED', 'BLOCKED'],
    default: 'PENDING',
  })
  status!: string;
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);

// empêche deux demandes identiques dans le même sens
FriendRequestSchema.index({ requester: 1, recipient: 1 }, { unique: true });