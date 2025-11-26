import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(data: { author: string; avatar: string; content: string }) {
    const post = new this.postModel({
      ...data,
      timestamp: new Date(),
      likes: 0,
      replies: 0,
    });
    return post.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }
}
