// src/reaction/reaction.resolver.ts
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { Reaction } from './entities/reaction.entity';

@Resolver('Reaction')
export class ReactionResolver {
  constructor(private readonly reactionService: ReactionService) {}

  @Query(returns => [Reaction])
  async reactions() {
    return this.reactionService.findAll();
  }

  @Mutation(returns => Reaction)
  async createReaction(
  @Args('createReactionDto') createReactionDto:
  CreateReactionDto
  ) {
    return this.reactionService.create(
    createReactionDto
    );
  }
}
