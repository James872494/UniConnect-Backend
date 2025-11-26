import { Injectable } from '@nestjs/common';
import NodeCache from 'node-cache';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  private cache = new NodeCache({ stdTTL: 3600 });

  constructor() {}

  // Send notification to a single user
  async sendUserNotification(title: string, message: string, userId: string) {
    const notifications = (this.cache.get(userId) as any[]) || [];
    const newNotification = { title, message, date: new Date(), read: false };
    this.cache.set(userId, [...notifications, newNotification]);
    console.log('User notification sent:', newNotification);
  }

  // Send notification to all users
  async sendGlobalNotification(title: string, message: string) {
    const globalNotifications = (this.cache.get('global') as any[]) || [];
    this.cache.set('global', [...globalNotifications, { title, message, date: new Date(), read: false }]);
    console.log('Global notification sent:', { title, message });
  }

  // Get user notifications
  getUserNotifications(userId: string) {
    return (this.cache.get(userId) as any[]) || [];
  }

  // Get global notifications
  getGlobalNotifications() {
    return (this.cache.get('global') as any[]) || [];
  }

  // Mark a notification as read for a user
  async markAsRead(userId: string, index: number) {
    const notifications: any[] = (this.cache.get(userId) as any[]) || [];
    if (notifications[index]) notifications[index].read = true;
    this.cache.set(userId, notifications);
    return notifications;
  }

  // Public email sending method
  public async sendEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: { user: 'test@example.com', pass: 'password' },
    });

    await transporter.sendMail({ from: 'noreply@uniconnect.com', to, subject, text });
    console.log(`Email sent to ${to} with subject "${subject}"`);
  }
}
