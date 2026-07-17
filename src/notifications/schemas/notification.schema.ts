// src/notifications/schemas/notification.schema.ts
import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  User
} from '../../users/schemas/user.schema';

@Schema()
export class Notification extends Document {
  @Prop({ required: true })
  message!: string;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Prop({ type: String, ref: 'User', required: true })
  recipient!: User;

  @Prop({ type: Boolean, default: false })
  read!: boolean;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.virtual('id').get(function (this: any) {
  return this._id.toHexString();
});

NotificationSchema.set('toJSON', { virtuals: true });
NotificationSchema.set('toObject', { virtuals: true });