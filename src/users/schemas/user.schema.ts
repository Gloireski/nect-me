// src/users/schemas/user.schema.ts
import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop()
  bio!: string;

  @Prop({ type: Map, of: Boolean, default: {} })
  preferences!: Map<string, boolean>;

  @Prop({ type: String, default: null })
  refreshTokenHash!: string | null;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('id').get(function (this: any) {
  return this._id.toHexString();
});

UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });