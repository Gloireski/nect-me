// src/friend-requests/entities/friend-request.entity.ts
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

export enum FriendRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  BLOCKED = 'BLOCKED',
}
registerEnumType(FriendRequestStatus, { name: 'FriendRequestStatus' });

@ObjectType()
export class FriendRequest {
  @Field(() => ID)
  id!: string;

  @Field(() => User)
  requester!: User;

  @Field(() => User)
  recipient!: User;

  @Field(() => FriendRequestStatus)
  status!: FriendRequestStatus;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}