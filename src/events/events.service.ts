import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    private readonly notificationsService: NotificationsService, // inject notification service
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel({
      ...createEventDto,
      attendees: 0,
      isAttending: false,
    });
    const savedEvent = await createdEvent.save();

    // Send notification to all users about new event
    await this.notificationsService.sendGlobalNotification(
      `New Event: ${savedEvent.title}`,
      `Check out the new event happening at ${savedEvent.location} on ${savedEvent.date}`
    );

    return savedEvent;
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(id: string, updateData: Partial<CreateEventDto & { isAttending?: boolean }>): Promise<Event> {
    const event = await this.eventModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!event) throw new NotFoundException('Event not found');

    // Send notification if RSVP status changed
    if (updateData.isAttending !== undefined) {
      const status = updateData.isAttending ? 'attending' : 'cancelled attendance for';
      await this.notificationsService.sendUserNotification(
        `You have ${status} "${event.title}"`,
        `Your attendance status has been updated for the event on ${event.date}`,
        event._id.toString(), // you can pass userId if you track it
      );
    }

    return event;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.eventModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Event not found');

    // Optional: notify users that the event was deleted
    await this.notificationsService.sendGlobalNotification(
      `Event Cancelled: ${deleted.title}`,
      `The event scheduled on ${deleted.date} has been cancelled.`
    );
  }
}
