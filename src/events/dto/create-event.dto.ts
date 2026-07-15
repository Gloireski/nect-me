import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEventDto {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  date!: Date;

  @Field()
  groupId!: string;
}