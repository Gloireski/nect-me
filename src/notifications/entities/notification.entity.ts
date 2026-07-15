// src/notifications/entities/notification.entity.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Notification {
  @Field(() => ID)
  id!: string;

  @Field(() => User)
  recipient!: User;

  @Field()
  category!: string;

  @Field()
  content!: string;

  @Field()
  read!: boolean;

  @Field()
  createdAt!: Date;
}
