import { forwardRef, Module } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequestsResolver } from './friend-requests.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequest, FriendRequestSchema } from './schemas/friend-request.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: FriendRequest.name,
      schema: FriendRequestSchema
    }]),
    forwardRef(() => UsersModule),
  ],
  providers: [FriendRequestsResolver, FriendRequestsService],
  exports: [FriendRequestsService]
})
export class FriendRequestsModule {}
