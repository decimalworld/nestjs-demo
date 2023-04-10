import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import { Room } from 'src/room/schemas/room.schema';

@Schema()
export class Message {
  @Prop()
  name: string;
  @Prop()
  text: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
  room: Room;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
