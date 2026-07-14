// src/comments/entities/comment.entity.ts
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

@ObjectType()
@Schema()
export class Comment extends Document {
  @Field(() => ID)
  id!: string;

  @Field()
  content!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field()
  isDeleted!: boolean;

  @Field(() => User)
  author!: Types.ObjectId | User;

  @Field(() => Post)
  post!: Types.ObjectId | Post;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);