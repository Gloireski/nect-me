// src/reaction/reaction.entity.ts
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

export enum ReactionType {
  LIKE = 'LIKE',
  UPVOTE = 'UPVOTE',
}
registerEnumType(ReactionType, { name: 'ReactionType' });

@ObjectType()
@Schema()
export class Reaction extends Document {
  @Field(() => ID)
  id!: string;

  @Field(() => ReactionType)
  type!: ReactionType;

  @Field()
  createdAt!: Date;

  @Field(() => User)
  user!: Types.ObjectId | User;

  @Field(() => Post)
  post!: Types.ObjectId | Post;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);