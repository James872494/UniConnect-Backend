// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model, Types } from 'mongoose';
// import { Event, EventDocument } from './schemas/event.schema';
// import { CreateEventDto } from './dto/create-event.dto';
// import { NotificationsService } from '../notifications/notifications.service';

// @Injectable()
// export class EventsService {
//   constructor(
//     @InjectModel(Event.name) private eventModel: Model<EventDocument>,
//     private readonly notificationsService: NotificationsService,
//   ) {}

//   // Create a new event
//   async create(createEventDto: CreateEventDto): Promise<Event> {
//     if (!Types.ObjectId.isValid(createEventDto.creatorId)) {
//       throw new BadRequestException('Invalid creatorId');
//     }

//     const createdEvent = new this.eventModel({
//       ...createEventDto,
//       attendeesCount: 0,
//       attendees: [],
//       creatorId: new Types.ObjectId(createEventDto.creatorId),
//     });

//     const savedEvent = await createdEvent.save();

//     // Send global notification about new event
//     try {
//       await this.notificationsService.sendGlobalNotification(
//         `New Event: ${savedEvent.title}`,
//         `Check out the new event happening at ${savedEvent.location} on ${savedEvent.date} at ${savedEvent.time}`,
//       );
//     } catch (err) {
//       console.warn('Failed to send global notification', err);
//     }

//     return savedEvent;
//   }

//   // Get all events
//   async findAll(): Promise<Event[]> {
//     return this.eventModel.find().exec();
//   }

//   // Get one event by ID
//   async findOne(id: string): Promise<Event> {
//     if (!Types.ObjectId.isValid(id)) {
//       throw new NotFoundException('Invalid event ID');
//     }
//     const event = await this.eventModel.findById(id).exec();
//     if (!event) throw new NotFoundException('Event not found');
//     return event;
//   }

//   // RSVP or cancel attendance
//   async rsvp(eventId: string, userId: string, attending: boolean): Promise<Event> {
//     if (!Types.ObjectId.isValid(eventId)) throw new BadRequestException('Invalid eventId');
//     if (!userId) throw new BadRequestException('Invalid userId');

//     const event = await this.eventModel.findById(eventId);
//     if (!event) throw new NotFoundException('Event not found');

//     // ensure attendees array exists
//     if (!Array.isArray(event.attendees)) event.attendees = [];

//     if (attending) {
//       if (!event.attendees.includes(userId)) {
//         event.attendees.push(userId);
//       }
//     } else {
//       event.attendees = event.attendees.filter(id => id !== userId);
//     }

//     event.attendeesCount = event.attendees.length;

//     let updatedEvent: Event;
//     try {
//       updatedEvent = await event.save();
//     } catch (err) {
//       console.error('Error saving RSVP:', err);
//       throw new BadRequestException('Failed to update RSVP');
//     }

//     // Send notification to user if not the creator
//     if (event.creatorId.toString() !== userId) {
//       try {
//         await this.notificationsService.sendUserNotification(
//           attending
//             ? `You are attending "${event.title}"`
//             : `You have cancelled attendance for "${event.title}"`,
//           `Event Date: ${event.date} Time: ${event.time}`,
//           userId,
//         );
//       } catch (err) {
//         console.warn('Failed to send user notification', err);
//       }
//     }

//     return updatedEvent;
//   }

//   // Delete an event
//   async remove(id: string): Promise<void> {
//     if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid event ID');

//     const deleted = await this.eventModel.findByIdAndDelete(id).exec();
//     if (!deleted) throw new NotFoundException('Event not found');

//     // Notify users that event was deleted
//     try {
//       await this.notificationsService.sendGlobalNotification(
//         `Event Cancelled: ${deleted.title}`,
//         `The event scheduled on ${deleted.date} at ${deleted.time} has been cancelled.`,
//       );
//     } catch (err) {
//       console.warn('Failed to send global notification', err);
//     }
//   }
// }

// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model, Types } from 'mongoose';
// import { Event, EventDocument } from './schemas/event.schema';
// import { CreateEventDto } from './dto/create-event.dto';

// @Injectable()
// export class EventsService {
//   constructor(
//     @InjectModel(Event.name) private eventModel: Model<EventDocument>,
//   ) {}

//   async create(createEventDto: CreateEventDto): Promise<Event> {
//     if (!Types.ObjectId.isValid(createEventDto.creatorId)) {
//       throw new BadRequestException('Invalid creatorId');
//     }

//     const createdEvent = new this.eventModel({
//       ...createEventDto,
//       attendeesCount: 0,
//       attendees: [],
//       creatorId: new Types.ObjectId(createEventDto.creatorId),
//     });

//     return createdEvent.save();
//   }

//   async findAll(): Promise<Event[]> {
//     return this.eventModel.find().sort({ createdAt: -1 }).exec();
//   }

//   async findOne(id: string): Promise<Event> {
//     if (!Types.ObjectId.isValid(id)) {
//       throw new NotFoundException('Invalid event ID');
//     }
//     const event = await this.eventModel.findById(id).exec();
//     if (!event) throw new NotFoundException('Event not found');
//     return event;
//   }

//   async rsvp(eventId: string, userId: string, attending: boolean): Promise<Event> {
//     if (!Types.ObjectId.isValid(eventId)) throw new BadRequestException('Invalid eventId');
//     if (!userId) throw new BadRequestException('Invalid userId');

//     const event = await this.eventModel.findById(eventId);
//     if (!event) throw new NotFoundException('Event not found');

//     if (!Array.isArray(event.attendees)) event.attendees = [];

//     if (attending) {
//       if (!event.attendees.includes(userId)) {
//         event.attendees.push(userId);
//       }
//     } else {
//       event.attendees = event.attendees.filter(id => id !== userId);
//     }

//     event.attendeesCount = event.attendees.length;
//     return event.save();
//   }

//   async remove(id: string): Promise<void> {
//     if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid event ID');

//     const deleted = await this.eventModel.findByIdAndDelete(id).exec();
//     if (!deleted) throw new NotFoundException('Event not found');
//   }
// }

// import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Event, EventDocument } from './schemas/event.schema';

// @Injectable()
// export class EventsService {
//   constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

//   async create(createEventDto: any): Promise<Event> {
//     const createdEvent = new this.eventModel(createEventDto);
//     return createdEvent.save();
//   }

//   async findAll(): Promise<Event[]> {
//     return this.eventModel.find().sort({ date: 1 }).exec();
//   }

//   async findOne(id: string): Promise<EventDocument> {  // ✅ Return EventDocument
//     const event = await this.eventModel.findById(id).exec();
//     if (!event) {
//       throw new NotFoundException('Event not found');
//     }
//     return event;
//   }

//   async toggleRsvp(id: string, userId: string, attending: boolean): Promise<Event> {
//     const event = await this.findOne(id);  // ✅ Now EventDocument with save()

//     const userIndex = event.attendees.indexOf(userId);
    
//     if (attending && userIndex === -1 && event.attendees.length < event.capacity) {
//       // Add to attendees
//       event.attendees.push(userId);
//     } else if (!attending && userIndex !== -1) {
//       // Remove from attendees (Cancel RSVP)
//       event.attendees.splice(userIndex, 1);
//     }
    
//     event.attendeesCount = event.attendees.length;
//     return event.save();  // ✅ Now works - EventDocument has save()
//   }

//   async deleteEvent(id: string, userId: string): Promise<{ message: string }> {
//     const event = await this.findOne(id);  // ✅ EventDocument
    
//     if (event.creatorId !== userId) {
//       throw new ForbiddenException("You can only delete your own events");
//     }
    
//     await this.eventModel.deleteOne({ _id: id });
//     return { message: 'Event deleted successfully' };
//   }
// }






import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

  async create(createEventDto: any): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().sort({ date: 1 }).exec();
  }

  async findOne(id: string): Promise<EventDocument> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async toggleRsvp(id: string, userId: string, attending: boolean): Promise<EventDocument> {
    const event = await this.findOne(id);

    const userIndex = event.attendees.indexOf(userId);
    
    if (attending && userIndex === -1 && event.attendees.length < event.capacity) {
      event.attendees.push(userId);
    } else if (!attending && userIndex !== -1) {
      event.attendees.splice(userIndex, 1);
    }
    
    event.attendeesCount = event.attendees.length;
    await event.save();
    
    // ✅ CRITICAL: Add isAttending for frontend
    (event as any).isAttending = event.attendees.includes(userId);
    
    return event;
  }

  async deleteEvent(id: string, userId: string): Promise<{ message: string }> {
    const event = await this.findOne(id);
    
    if (event.creatorId !== userId) {
      throw new ForbiddenException("You can only delete your own events");
    }
    
    await this.eventModel.deleteOne({ _id: id });
    return { message: 'Event deleted successfully' };
  }
}
