// src/posts/posts.resolver.ts
import {
  Resolver,
  Query,
  Mutation,
  Args
} from '@nestjs/graphql';
import { CreatePostDto } from './dto/create-post-dto';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';

@Resolver(of => Post)
export class PostsResolver {
  constructor(
  private readonly postsService: PostsService
  ) {}

  @Query(returns => [Post])
  async posts() {
    return this.postsService.findAll();
  }

  @Mutation(returns => Post)
  async createPost(
  @Args('createPostDto') createPostDto:
  CreatePostDto
  ) {
    return this.postsService.create(createPostDto);
  }
}