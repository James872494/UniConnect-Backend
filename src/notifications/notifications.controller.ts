import { Body, Controller, Get, Param, Post, Query, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

interface NotificationDto {
  userId?: string;
  title: string;
  message: string;
}

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Send notification to a single user
  @Post('user')
  async sendUserNotification(@Body() dto: NotificationDto) {
    if (!dto.userId) throw new Error('userId is required');
    await this.notificationsService.sendUserNotification(dto.title, dto.message, dto.userId);
    return { success: true };
  }

  // Send global notification
  @Post('global')
  async sendGlobalNotification(@Body() dto: NotificationDto) {
    await this.notificationsService.sendGlobalNotification(dto.title, dto.message);
    return { success: true };
  }

  // Get all notifications for a user
  @Get('user/:userId')
  getUserNotifications(@Param('userId') userId: string) {
    return this.notificationsService.getUserNotifications(userId);
  }

  // Get global notifications
  @Get('global')
  getGlobalNotifications() {
    return this.notificationsService.getGlobalNotifications();
  }

  // Mark a user notification as read
  @Patch('user/:userId/read')
  markAsRead(@Param('userId') userId: string, @Query('index') index: string) {
    return this.notificationsService.markAsRead(userId, parseInt(index));
  }

  // Send email manually (optional endpoint)
  @Post('email')
  sendEmail(@Body() body: { email: string; subject: string; message: string }) {
    return this.notificationsService.sendEmail(body.email, body.subject, body.message);
  }
}
