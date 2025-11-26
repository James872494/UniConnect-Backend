// events.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event, EventSchema } from './schemas/event.schema';
import { NotificationsModule } from '../notifications/notifications.module'; // <-- import

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    NotificationsModule, // <-- add here
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
