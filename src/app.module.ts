import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionModule } from './reaction/reaction.module';
import { ApolloDriver } from '@nestjs/apollo';
import { GroupsModule } from './groups/groups.module';
import { FriendRequestsModule } from './friend-requests/friend-requests.module';
import { FollowsModule } from './follows/follows.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src', 'schema.gql')
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb+srv://belem:Belem235%40@snp.ts4upow.mongodb.net/?appName=snp'
    ),
    UsersModule,
    PostsModule,
    CommentsModule,
    ReactionModule,
    GroupsModule,
    FriendRequestsModule,
    FollowsModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
