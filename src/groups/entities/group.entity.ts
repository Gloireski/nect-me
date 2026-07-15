import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Group {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => User)
  owner!: User;

  @Field(() => [User])
  members!: User[];

  @Field()
  createdAt!: Date;
}