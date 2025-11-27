// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type PostDocument = Post & Document;

// @Schema({ timestamps: true })
// export class Post {
//   @Prop({ required: true })
//   author: string;

//   @Prop({ required: true })
//   avatar: string;

//   @Prop({ required: true })
//   content: string;

//   @Prop({ default: 0 })
//   likes: number;

//   @Prop({ default: 0 })
//   replies: number;

//   @Prop()
//   timestamp: Date;
// }

// export const PostSchema = SchemaFactory.createForClass(Post);

// posts/schemas/post.schema.ts
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type PostDocument = Post & Document;

// @Schema()
// export class Post {
//   @Prop({ required: true })
//   author: string; // User's fullName

//   @Prop()
//   avatar: string;

//   @Prop({ required: true })
//   content: string;

//   @Prop({ required: true })
//   userId: string; // MongoDB user _id

//   @Prop({ default: Date.now })
//   timestamp: Date;

//   @Prop({ default: 0 })
//   likes: number;

//   @Prop({ default: 0 })
//   replies: number;
// }

// export const PostSchema = SchemaFactory.createForClass(Post);

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type PostDocument = Post & Document;

// @Schema()
// export class Post {
// @Prop({ required: true })
// author: string; // User's fullName

// @Prop()
// avatar: string;

// @Prop({ required: true })
// content: string;

// @Prop({ required: true })
// userId: string; // MongoDB user _id

// @Prop({ default: Date.now })
// timestamp: Date;

// @Prop({ default: 0 })
// likes: number;

// @Prop({ default: 0 })
// replies: number;
// }

// export const PostSchema = SchemaFactory.createForClass(Post);

// src/posts/schemas/post.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  author: string; // fullName

  @Prop()
  avatar: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  userId: string; // MongoDB user _id

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  replies: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
