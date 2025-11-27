// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type UserDocument = User & Document;

// @Schema({ timestamps: true })
// export class User {
//   @Prop({ required: true })
//   supabaseId: string;

//   @Prop({ required: true })
//   fullName: string;

//   @Prop({ required: true, unique: true })
//   email: string;
// }

// export const UserSchema = SchemaFactory.createForClass(User);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  supabaseId: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  bio?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
