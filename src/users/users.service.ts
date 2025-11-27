// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User, UserDocument } from './schemas/user.schema';
// import { NotificationsService } from '../notifications/notifications.service';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectModel(User.name) private userModel: Model<UserDocument>,
//     private readonly notificationsService: NotificationsService, // inject notifications
//   ) {}

//   async create(userData: { supabaseId: string; fullName: string; email: string }) {
//     const createdUser = new this.userModel(userData);
//     const savedUser = await createdUser.save();

//     // Send welcome notification
//     await this.notificationsService.sendUserNotification(
//       `Welcome to UniConnect, ${savedUser.fullName}!`,
//       `Hi ${savedUser.fullName}, thanks for joining UniConnect! Explore events, posts, and connect with your community.`,
//       savedUser._id.toString()
//     );

//     return savedUser;
//   }

//   async findAll() {
//     return this.userModel.find().exec();
//   }

//   async findByEmail(email: string) {
//     return this.userModel.findOne({ email }).exec();
//   }

//   async notifyLogin(userId: string, fullName: string) {
//     // Notify user on login
//     await this.notificationsService.sendUserNotification(
//       `Welcome back, ${fullName}!`,
//       `Glad to see you again on UniConnect.`,
//       userId,
//     );
//   }
// }

// users.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User, UserDocument } from './schemas/user.schema';
// import { NotificationsService } from '../notifications/notifications.service';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectModel(User.name) private userModel: Model<UserDocument>,
//     private readonly notificationsService: NotificationsService,
//   ) {}

//   async create(userData: { supabaseId: string; fullName: string; email: string }) {
//     const createdUser = new this.userModel(userData);
//     const savedUser = await createdUser.save();

//     await this.notificationsService.sendUserNotification(
//       `Welcome to UniConnect, ${savedUser.fullName}!`,
//       `Hi ${savedUser.fullName}, thanks for joining UniConnect! Explore events, posts, and connect with your community.`,
//       savedUser._id.toString()
//     );

//     return savedUser;
//   }

//   async findAll() {
//     return this.userModel.find().exec();
//   }

//   async findByEmail(email: string) {
//     return this.userModel.findOne({ email }).exec();
//   }

//   // Add this method
//   async findBySupabaseId(supabaseId: string) {
//     return this.userModel.findOne({ supabaseId }).exec();
//   }

//   async notifyLogin(userId: string, fullName: string) {
//     await this.notificationsService.sendUserNotification(
//       `Welcome back, ${fullName}!`,
//       `Glad to see you again on UniConnect.`,
//       userId,
//     );
//   }
// }


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { NotificationsService } from '../notifications/notifications.service';

export interface UserResponse {
  _id: string;
  fullName: string;
  email: string;
  bio: string;
  avatar: string;
  isFollowing: boolean;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(userData: { supabaseId: string; fullName: string; email: string }): Promise<UserDocument> {
    const createdUser = new this.userModel(userData);
    const savedUser = await createdUser.save();

    await this.notificationsService.sendUserNotification(
      `Welcome to UniConnect, ${savedUser.fullName}!`,
      `Hi ${savedUser.fullName}, thanks for joining UniConnect! Explore events, posts, and connect with your community.`,
      savedUser._id.toString()
    );

    return savedUser;
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.userModel.find().select('fullName email bio supabaseId').exec();
    return users.map(user => ({
      _id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      bio: user.bio || 'No bio available',
      avatar: user.fullName.charAt(0).toUpperCase(),
      isFollowing: false,
    }));
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findBySupabaseId(supabaseId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ supabaseId }).exec();
  }

  async notifyLogin(userId: string, fullName: string) {
    await this.notificationsService.sendUserNotification(
      `Welcome back, ${fullName}!`,
      `Glad to see you again on UniConnect.`,
      userId,
    );
  }

  // ✅ UPDATE METHOD - Fixes TS2339 error
  async updateBySupabaseId(
    supabaseId: string, 
    updateData: Partial<{ fullName: string; email: string; bio: string }>
  ): Promise<UserDocument> {
    const updatedUser = await this.userModel
      .findOneAndUpdate(
        { supabaseId },
        { $set: updateData },
        { new: true, runValidators: true }
      )
      .exec();
    
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return updatedUser;
  }
}
