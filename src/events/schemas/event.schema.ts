// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// export type EventDocument = Event & Document;

// @Schema({ timestamps: true })
// export class Event {
//   @Prop({ required: true })
//   title: string;

//   @Prop()
//   description: string;

//   @Prop({ required: true })
//   date: string;

//   @Prop({ required: true })
//   time: string;

//   @Prop({ required: true })
//   location: string;

//   @Prop({ default: 0 })
//   attendeesCount: number;

//   @Prop({ default: [] })
//   attendees: string[];

//   @Prop({ required: true })
//   capacity: number;

//   @Prop()
//   category: string;

//   @Prop()
//   imageUrl: string;

//   @Prop({ required: true, type: Types.ObjectId })
//   creatorId: Types.ObjectId;
// }

// export const EventSchema = SchemaFactory.createForClass(Event);

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type EventDocument = Event & Document;

// @Schema({ timestamps: true })
// export class Event {
//   @Prop({ required: true })
//   title: string;

//   @Prop({ required: true })
//   description: string;

//   @Prop({ required: true })
//   date: string;

//   @Prop({ required: true })
//   time: string;

//   @Prop({ required: true })
//   location: string;

//   @Prop({ required: true })
//   capacity: number;

//   @Prop({ required: true })
//   category: string;

//   @Prop({ required: true })
//   creatorId: string;

//   @Prop({ type: [String], default: [] })
//   attendees: string[];

//   @Prop({ default: 0 })
//   attendeesCount: number;

//   @Prop()
//   imageUrl?: string;
// }

// export const EventSchema = SchemaFactory.createForClass(Event);



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

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  creatorId: string;

  @Prop({ type: [String], default: [] })
  attendees: string[];

  @Prop({ default: 0 })
  attendeesCount: number;

  @Prop()
  imageUrl?: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
