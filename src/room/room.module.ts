import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Room, RoomSchema } from './schemas/room.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/message/schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
