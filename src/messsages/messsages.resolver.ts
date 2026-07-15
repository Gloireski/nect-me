import { Resolver } from '@nestjs/graphql';
import { MesssagesService } from './messsages.service';

@Resolver('Messsage')
export class MesssagesResolver {
  constructor(private readonly messsagesService: MesssagesService) {}
}
