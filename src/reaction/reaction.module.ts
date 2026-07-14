// src/reaction/reaction.module.ts
import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionResolver } from './reaction.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Reaction, ReactionSchema } from './schemas/reaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Reaction.name,
      schema: ReactionSchema
    }])
  ],
  providers: [ReactionResolver, ReactionService],
  exports: [ReactionService]
})
export class ReactionModule {}
