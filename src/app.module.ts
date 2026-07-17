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
import { MesssagesModule } from './messsages/messsages.module';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
    ,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src', 'schema.gql'),
      subscriptions: {
        'graphql-ws': {
          onConnect: (context) => {
            // handle connection
          },
          ondisconnect: (context) => {
            // handle disconnection
          },
        },
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI!
    ),
    UsersModule,
    PostsModule,
    CommentsModule,
    ReactionModule,
    GroupsModule,
    FriendRequestsModule,
    FollowsModule,
    NotificationsModule,
    MesssagesModule,
    EventsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
