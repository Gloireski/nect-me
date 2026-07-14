// src/friend-requests/dto/send-friend-request.dto.ts
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendFriendRequestDto {
  @Field()
  requesterId!: string; // TODO: viendra du token une fois l'auth en place

  @Field()
  recipientId!: string;
}