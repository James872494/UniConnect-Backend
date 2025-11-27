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
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Post, PostDocument } from './schemas/post.schema';

// @Injectable()
// export class PostsService {
//   constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

//   async create(data: { author: string; avatar: string; content: string; userId: string }): Promise<Post> {
//     const post = new this.postModel({
//       ...data,
//       timestamp: new Date(),
//       likes: 0,
//       replies: 0,
//     });
//     return post.save();
//   }

//   async findAll(): Promise<Post[]> {
//     return this.postModel.find().sort({ timestamp: -1 }).exec();
//   }

//   async delete(id: string): Promise<{ deleted: boolean }> {
//     const res = await this.postModel.deleteOne({ _id: id }).exec();
//     return { deleted: res.deletedCount === 1 };
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Post, PostDocument } from './schemas/post.schema';

// @Injectable()
// export class PostsService {
//   constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

//   async create(data: { author: string; avatar: string; content: string; userId: string }): Promise<Post> {
//     const post = new this.postModel({
//       ...data,
//       likes: 0,
//       replies: 0,
//     });
//     return post.save();
//   }

//   async findAll(): Promise<Post[]> {
//     const posts = await this.postModel.find().sort({ createdAt: -1 }).exec();
//     return posts.map(post => ({
//       _id: post._id.toString(),
//       author: post.author,
//       avatar: post.avatar,
//       content: post.content,
//       userId: post.userId,
//       likes: post.likes || 0,
//       replies: post.replies || 0,
//       // ✅ Frontend gets createdAt as ISO string automatically
//     }));
//   }

//   async delete(id: string): Promise<{ deleted: boolean }> {
//     const res = await this.postModel.deleteOne({ _id: id }).exec();
//     return { deleted: res.deletedCount === 1 };
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';

export interface PostResponse {
  _id: string;
  author: string;
  avatar: string;
  content: string;
  userId: string;
  timestamp: string;
  likes: number;
  replies: number;
}

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

  async findAll(): Promise<PostResponse[]> {
    const posts = await this.postModel.find().sort({ timestamp: -1 }).exec();
    return posts.map(post => ({
      _id: post._id.toString(),
      author: post.author,
      avatar: post.avatar,
      content: post.content,
      userId: post.userId,
      timestamp: post.timestamp.toISOString(),
      likes: post.likes || 0,
      replies: post.replies || 0,
    }));
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const res = await this.postModel.deleteOne({ _id: id }).exec();
    return { deleted: res.deletedCount === 1 };
  }
}
