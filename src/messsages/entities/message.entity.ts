import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Message {
  @Field(() => ID)
  id!: string;

  @Field(() => User)
  sender!: User;

  @Field(() => User)
  recipient!: User;

  @Field()
  content!: string;

  @Field({ nullable: true })
  readAt?: Date;

  @Field()
  createdAt!: Date;
}