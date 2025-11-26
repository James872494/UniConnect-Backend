import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from './schemas/post.schema';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  async create(@Body() body: { author: string; avatar: string; content: string }) {
    return this.postsService.create(body);
  }

  @Get()
  async findAll(): Promise<PostModel[]> {
    return this.postsService.findAll();
  }
}
