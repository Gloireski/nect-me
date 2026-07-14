// src/users/users/resolvers.ts
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FriendRequest } from 'src/friend-requests/entities/friend-request.entity';
import { FriendRequestsService } from 'src/friend-requests/friend-requests.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly friendRequestsService: FriendRequestsService
  ) {}

  @Mutation(returns => User)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Query(returns => [User])
  async users() {
    return this.usersService.findAll();
  }

  @ResolveField(() => FriendRequest)
  async friendRequest(@Parent() user: User) {
    this.friendRequestsService.getPendingIncoming(user.id);
  }
}
