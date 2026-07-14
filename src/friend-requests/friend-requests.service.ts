// src/friend-requests/friend-requests.service.ts
import {
  Injectable,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendRequest } from './schemas/friend-request.schema';
import { FriendRequestAction } from './dto/respond-friend-request.dto';

@Injectable()
export class FriendRequestsService {
  constructor(
    @InjectModel(FriendRequest.name)
    private readonly friendRequestModel: Model<FriendRequest>,
  ) {}

  async sendRequest(requesterId: string, recipientId: string) {
    if (requesterId === recipientId) {
      throw new BadRequestException('You cannot send a friend request to yourself.');
    }

    const existing = await this.friendRequestModel.findOne({
      $or: [
        { requester: requesterId, recipient: recipientId },
        { requester: recipientId, recipient: requesterId },
      ],
    });

    if (existing) {
      if (existing.status === 'BLOCKED') {
        throw new ForbiddenException('This friend request cannot be sent.');
      }
      if (existing.status === 'ACCEPTED') {
        throw new ConflictException('You are already friends with this user.');
      }
      throw new ConflictException('A friend request already exists between these users.');
    }

    const created = new this.friendRequestModel({
      requester: requesterId,
      recipient: recipientId,
      status: 'PENDING',
    });

    // await created.save();
    // return created.populate(['requester', 'recipient']); // peuple avant de retourner, m2
    return created.save();
  }

  async respondToRequest(requestId: string, respondingUserId: string, action: FriendRequestAction) {
    const request = await this.friendRequestModel.findById(requestId);
    if (!request) {
      throw new NotFoundException('Friend request not found.');
    }
    if (request.recipient.toString() !== respondingUserId) {
      throw new ForbiddenException('Only the recipient can respond to this request.');
    }
    if (request.status !== 'PENDING') {
      throw new BadRequestException('This request has already been handled.');
    }

    request.status = action;
    // await request.save();
    // return request.populate(['requester', 'recipient']); // m2

    return request.save();
  }

  async blockUser(blockerId: string, blockedId: string) {
    if (blockerId === blockedId) {
      throw new BadRequestException('You cannot block yourself.');
    }

    const existing = await this.friendRequestModel.findOne({
      $or: [
        { requester: blockerId, recipient: blockedId },
        { requester: blockedId, recipient: blockerId },
      ],
    });

    if (existing) {
      existing.status = 'BLOCKED';
      // await existing.save();
      // return existing.populate(['requester', 'recipient']); // m2
      return existing.save();
    }

    const created = new this.friendRequestModel({
      requester: blockerId,
      recipient: blockedId,
      status: 'BLOCKED',
    });
    // await created.save();
    // return created.populate(['requester', 'recipient']); 
    return created.save();
  }

  async getFriends(userId: string) {
    const requests = await this.friendRequestModel
      .find({ 
        status: 'ACCEPTED', 
        $or: [{ requester: userId }, { recipient: userId }] 
      })
      .populate('requester')
      .populate('recipient');

    return requests.map((request) => {
      const requesterId = (request.requester as any)._id.toString();
      return requesterId === userId ? request.recipient : request.requester;
    });
  }

  async getPendingIncoming(userId: string) {
    return this.friendRequestModel
      .find({ recipient: userId, status: 'PENDING' })
      // .populate('requester')
      // .populate('recipient');
  }

  async getPendingOutgoing(userId: string) {
    return this.friendRequestModel
      .find({ requester: userId, status: 'PENDING' })
      // .populate('requester')
      // .populate('recipient');
  }
}