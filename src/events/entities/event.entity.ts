import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Group } from '../../groups/entities/group.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Event {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  date!: Date;

  @Field(() => Group)
  group!: Group;

  @Field(() => [User])
  attendees!: User[];
}