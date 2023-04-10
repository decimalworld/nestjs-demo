import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Message } from 'src/message/schemas/message.schema';

@Schema()
export class Room {
  @Prop()
  name: string;
  @Prop()
  secret: string;
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
  })
  messages: Message[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
