import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reaction } from './schemas/reaction.schema';
import { CreateReactionDto } from './dto/create-reaction.dto';

@Injectable()
export class ReactionService {
  constructor(
    @InjectModel(Reaction.name) private reactionModel:
    Model<Reaction>
  ) {}
  
  async findAll(): Promise<Reaction[]> {
    return this.reactionModel.find().exec();
  }

  async create(createReactionDto: CreateReactionDto):
  Promise<Reaction>
  {
    const createdReaction =
    new this.reactionModel(createReactionDto);
    return createdReaction.save();
  }
}
