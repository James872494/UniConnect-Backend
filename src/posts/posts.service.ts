// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Post, PostDocument } from './schemas/post.schema';

// @Injectable()
// export class PostsService {
//   constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

//   async create(data: { author: string; avatar: string; content: string }) {
//     const post = new this.postModel({
//       ...data,
//       timestamp: new Date(),
//       likes: 0,
//       replies: 0,
//     });
//     return post.save();
//   }

//   async findAll(): Promise<Post[]> {
//     return this.postModel.find().exec();
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Post, PostDocument } from './schemas/post.schema';

// @Injectable()
// export class PostsService {
// constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

// async create(data: { author: string; avatar: string; content: string }): Promise<Post> {
// const post = new this.postModel({
// ...data,
// userId: 'dummy-user-id', // replace with real logged-in user id
// timestamp: new Date(),
// likes: 0,
// replies: 0,
// });
// return post.save();
// }

// async findAll(): Promise<Post[]> {
// return this.postModel.find().sort({ timestamp: -1 }).exec();
// }

// async delete(id: string): Promise<{ deleted: boolean }> {
// const res = await this.postModel.deleteOne({ _id: id }).exec();
// return { deleted: res.deletedCount === 1 };
// }
// }

// src/posts/posts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(data: { author: string; avatar: string; content: string; userId: string }): Promise<Post> {
    const post = new this.postModel({
      ...data,
      timestamp: new Date(),
      likes: 0,
      replies: 0,
    });
    return post.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().sort({ timestamp: -1 }).exec();
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const res = await this.postModel.deleteOne({ _id: id }).exec();
    return { deleted: res.deletedCount === 1 };
  }
}
