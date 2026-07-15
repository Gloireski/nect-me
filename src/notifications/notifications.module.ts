import { forwardRef, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Notification.name,
      schema: NotificationSchema,
      
    },
    { name: User.name, schema: UserSchema }
  ]),
    // forwardRef(() => UsersModule)
    UsersModule
  ],
  providers: [NotificationsResolver, NotificationsService],
  exports: [NotificationsService]
})
export class NotificationsModule {}
