import { Resolver } from '@nestjs/graphql';
import { GroupsService } from './groups.service';

@Resolver('Group')
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}
}
