// src/reaction/schemas/reaction.schema.ts
import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  User
} from '../../users/schemas/user.schema';
import {
  Post
} from '../../posts/schemas/post.schema';

@Schema()
export class Reaction extends Document {
  @Prop({
    type: String,
    required: true,
    enum: ['LIKE', 'UPVOTE']
  })
  type!: string;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Prop({ type: String, ref: 'User', required: true })
  user!: User;

  @Prop({ type: String, ref: 'Post', required: true })
  post!: Post;
}
export const ReactionSchema =  
SchemaFactory.createForClass(Reaction);