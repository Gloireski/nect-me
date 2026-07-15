// src/users/users/resolvers.ts
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FriendRequest } from 'src/friend-requests/entities/friend-request.entity';
import { FriendRequestsService } from 'src/friend-requests/friend-requests.service';
import { UserPreference } from './entities/user-preference.entity';
import { UpdatePreferencesInput } from './dto/update-preferences.input';

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

  @ResolveField(() => [UserPreference])
  preferences(@Parent() user: any) {
    const map: Map<string, boolean> = user.preferences ?? new Map();
    return Array.from(map.entries()).map(([category, enabled]) => ({ category, enabled }));
  }

  @Mutation(returns => User)
  async updatePreferences(
    @Args('input') input: UpdatePreferencesInput,
  ) {
    // convertit le tableau [{ category, enabled }] en Map<string, boolean>
    // pour correspondre à ce qu'attend le service/schema Mongoose
    const preferencesMap = new Map(
      input.preferences.map((p) => [p.category, p.enabled]),
    );
    return this.usersService.updatePreferences(input.userId, preferencesMap);
  }
}
