import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGroupDto {
  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  ownerId!: string;
}