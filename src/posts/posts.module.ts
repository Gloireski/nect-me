import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Post.name,
      schema: PostSchema
    }])
  ],
  providers: [PostsService, PostsResolver],
  exports: [PostsService]
})
export class PostsModule {
}
