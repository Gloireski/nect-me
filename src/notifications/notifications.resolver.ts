// src/notifications/notifications.resolver.ts
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { PubSub } from 'graphql-subscriptions';
import { CreateNotificationDto } from './dto/create- notification.dto';
import { Notification } from './entities/notification.entity';
// import {
//   Notification
// } from './schemas/notification.schema';

const pubSub = new PubSub();

@Resolver(of => Notification)
export class NotificationsResolver {
  constructor(
    private readonly notificationsService:
    NotificationsService
  ) {}
  
  @Mutation(returns => Notification)
  async createNotification(@Args('createNotificationDto') createNotificationDto: CreateNotificationDto
  ) {
    const newNotification =
      await this.notificationsService.create(createNotificationDto);

    pubSub.publish('notificationAdded', { notificationAdded: newNotification });
    return newNotification;
  }

  @Subscription(returns => Notification, {
    filter: (payload, variables, context) => {
      const userPreferences = context.user.preferences;
    return userPreferences.get(payload.notification.category) === true;
   }
  })
    notificationAdded() {
    return pubSub.asyncIterableIterator('notificationAdded');
  }
  
  // @Subscription(returns => Notification, {
  //   filter: (payload, variables) => 
  //     payload.notificationAdded.recipientId === variables.recipientId,
  //   })
  // notificationAdded(@Args('recipientId') recipientId: string) {
  //   return pubSub.asyncIterableIterator('notificationAdded'); //renamed from asyncIterator
  // }
}
