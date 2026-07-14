// src/friend-requests/friend-requests.resolver.ts
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequest } from './entities/friend-request.entity';
import { User } from '../users/entities/user.entity';
import { SendFriendRequestDto } from './dto/send-friend-request.dto';
import { RespondFriendRequestDto } from './dto/respond-friend-request.dto';
import { UsersService } from 'src/users/users.service';

@Resolver(() => FriendRequest)
export class FriendRequestsResolver {
  constructor(
    private readonly friendRequestsService: FriendRequestsService,
    private readonly usersService: UsersService,
  ) {}

  @ResolveField(() => User)
  async requester(@Parent() friendRequest: FriendRequest) {
    return this.usersService.getUser((friendRequest as any).requester.toString());
  }

  @ResolveField(() => User)
  async recipient(@Parent() friendRequest: FriendRequest) {
    return this.usersService.getUser((friendRequest as any).recipient.toString());
  }
  
  @Mutation(() => FriendRequest)
  async sendFriendRequest(@Args('input') input: SendFriendRequestDto) {
    return this.friendRequestsService.sendRequest(input.requesterId, input.recipientId);
  }

  @Mutation(() => FriendRequest)
  async respondToFriendRequest(
    @Args('input') input: RespondFriendRequestDto,
    @Args('userId') userId: string, // stand-in pour l'utilisateur connecté
  ) {
    return this.friendRequestsService.respondToRequest(input.requestId, userId, input.action);
  }

  @Mutation(() => FriendRequest)
  async blockUser(
    @Args('blockerId') blockerId: string,
    @Args('blockedId') blockedId: string,
  ) {
    return this.friendRequestsService.blockUser(blockerId, blockedId);
  }

  @Query(() => [User])
  async friends(@Args('userId') userId: string) {
    return this.friendRequestsService.getFriends(userId);
  }

  @Query(() => [FriendRequest])
  async incomingFriendRequests(@Args('userId') userId: string) {
    return this.friendRequestsService.getPendingIncoming(userId);
  }

  @Query(() => [FriendRequest])
  async outgoingFriendRequests(@Args('userId') userId: string) {
    return this.friendRequestsService.getPendingOutgoing(userId);
  }
}