// src/users/entities/user.entity.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [String], { nullable: true })
  preferences?: string[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}