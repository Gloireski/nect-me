import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor (
    @InjectModel (User.name) private userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found.`);
    }
    return user;
  }

  async updatePreferences(
    userId: string,
    preferences: Map<string, boolean>
  ): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, { preferences }, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with id "${userId}" not found.`);
    }

    return updatedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async setRefreshTokenHash(userId: string, hash: string | null): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { refreshTokenHash: hash }).exec();
  }
}
