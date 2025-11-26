import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  location: string;

  @Prop({ default: 0 })
  attendees: number;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  category: string;

  @Prop({ default: false })
  isAttending: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
