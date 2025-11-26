import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly notificationsService: NotificationsService, // inject notifications
  ) {}

  async create(userData: { supabaseId: string; fullName: string; email: string }) {
    const createdUser = new this.userModel(userData);
    const savedUser = await createdUser.save();

    // Send welcome notification
    await this.notificationsService.sendUserNotification(
      `Welcome to UniConnect, ${savedUser.fullName}!`,
      `Hi ${savedUser.fullName}, thanks for joining UniConnect! Explore events, posts, and connect with your community.`,
      savedUser._id.toString()
    );

    return savedUser;
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async notifyLogin(userId: string, fullName: string) {
    // Notify user on login
    await this.notificationsService.sendUserNotification(
      `Welcome back, ${fullName}!`,
      `Glad to see you again on UniConnect.`,
      userId,
    );
  }
}
