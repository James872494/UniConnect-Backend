export class CreateNotificationDto {
  userId!: string;
  type!: 'post' | 'event' | 'system' | 'welcome' | 'login';
  title!: string;
  message!: string;
}
