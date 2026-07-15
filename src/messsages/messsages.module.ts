import { Module } from '@nestjs/common';
import { MesssagesService } from './messsages.service';
import { MesssagesResolver } from './messsages.resolver';

@Module({
  providers: [MesssagesResolver, MesssagesService],
})
export class MesssagesModule {}
