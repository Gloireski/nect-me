import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendMessageDto {
  @Field()
  senderId!: string; // viendra du token une fois l'auth en place

  @Field()
  recipientId!: string;

  @Field()
  content!: string;
}