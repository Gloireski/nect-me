// src/friend-requests/dto/respond-friend-request.dto.ts
import { Field, InputType, registerEnumType } from '@nestjs/graphql';

// Enum volontairement restreint : on ne peut pas "répondre" BLOCKED ou PENDING
export enum FriendRequestAction {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}
registerEnumType(FriendRequestAction, { name: 'FriendRequestAction' });

@InputType()
export class RespondFriendRequestDto {
  @Field()
  requestId!: string;

  @Field(() => FriendRequestAction)
  action!: FriendRequestAction;
}