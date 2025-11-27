// import { Controller, Get, Post, Body } from '@nestjs/common';
// import { PostsService } from './posts.service';
// import { Post as PostModel } from './schemas/post.schema';

// @Controller('posts')
// export class PostsController {
//   constructor(private readonly postsService: PostsService) {}

//   @Post('create')
//   async create(@Body() body: { author: string; avatar: string; content: string }) {
//     return this.postsService.create(body);
//   }

//   @Get()
//   async findAll(): Promise<PostModel[]> {
//     return this.postsService.findAll();
//   }
// }

// import { Controller, Get, Post as HttpPost, Body, Delete, Param } from '@nestjs/common';
// import { PostsService } from './posts.service';
// import { Post as PostModel } from './schemas/post.schema';

// @Controller('posts')
// export class PostsController {
// constructor(private readonly postsService: PostsService) {}

// @HttpPost('create')
// async create(
// @Body() body: { author: string; avatar: string; content: string },
// ): Promise<PostModel> {
// return this.postsService.create(body);
// }

// @Get()
// async findAll(): Promise<PostModel[]> {
// return this.postsService.findAll();
// }

// @Delete(':id')
// async delete(@Param('id') id: string) {
// return this.postsService.delete(id);
// }
// }

// src/posts/posts.controller.ts
import { Controller, Get, Post as HttpPost, Body, Delete, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from './schemas/post.schema';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost('create')
  async create(
    @Body() body: { author: string; avatar: string; content: string; userId: string },
  ): Promise<PostModel> {
    return this.postsService.create(body);
  }

  @Get()
  async findAll(): Promise<PostModel[]> {
    return this.postsService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}
