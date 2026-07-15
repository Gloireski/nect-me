// src/users/dto/update-preferences.input.ts
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PreferenceInput {
  @Field()
  category!: string;

  @Field()
  enabled!: boolean;
}

@InputType()
export class UpdatePreferencesInput {
  @Field()
  userId!: string;

  @Field(() => [PreferenceInput])
  preferences!: PreferenceInput[];
}