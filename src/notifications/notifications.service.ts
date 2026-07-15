// src/notifications/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification
} from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create- notification.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification>
  {
    const createdNotification = new this.notificationModel(
      createNotificationDto
    );
    return createdNotification.save();
  }

  async createNotification(userId: string, category: string, content: string)
  {
    const user = await this.userModel.findById(userId).exec();
    // Check user preferences
    if (user?.preferences.get(category)) {
    const notification = new this.notificationModel(
      { userId, category, content }
    );
    
    return notification.save();
    }
    // If user preference is not set to true, do not create
    // notification
    return null;
  }
}