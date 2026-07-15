// src/users/entities/user-preference.entity.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserPreference {
  @Field()
  category!: string;

  @Field()
  enabled!: boolean;
}