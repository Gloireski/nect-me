import { Resolver } from '@nestjs/graphql';
import { FollowsService } from './follows.service';

@Resolver('Follow')
export class FollowsResolver {
  constructor(private readonly followsService: FollowsService) {}
}
