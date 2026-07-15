// src/users/entities/user.entity.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserPreference } from './user-preference.entity';

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

  @Field(() => [UserPreference], { nullable: true })
  preferences?: UserPreference[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}