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

  // @Prop({ type: [User], ref: 'User', allowNull: true })
  // friendRequests!: string;

  // @Prop({ type: [User], ref: 'user', allowNull: true})
  // followers!: User;

  // @Prop({ type: [User], ref: 'user', allowNull: true})
  // followings!: User;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const UserSchema =
SchemaFactory.createForClass(User);