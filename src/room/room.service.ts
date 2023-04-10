import { Injectable } from '@nestjs/common';
import { Room } from './schemas/room.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel('Room') private roomModel: Model<Room>,
    @InjectModel('Message') private messageModel: Model<Room>,
  ) {}
  async getAllRoom() {
    return await this.roomModel.find();
  }
  async getRoomId(id: string) {
    return await this.roomModel.findById(id).populate('messages');
  }
  async getRoomSecret(id: string) {
    return { secret: (await this.roomModel.findById(id)).secret };
  }
  async createRoom(room: CreateRoomDto) {
    const createdRoom = this.roomModel.create(room);
    return createdRoom;
  }
  async deleteRoom(id: string) {
    const deletedRoom = this.roomModel.findByIdAndDelete(id);
    return deletedRoom;
  }
  async addMessageToRoom(message_id: string, room_id: string) {
    const message = await this.messageModel.findById(message_id);
    const updatedRoom = await this.roomModel.findByIdAndUpdate(
      room_id,
      {
        $push: { messages: message._id },
      },
      { new: true, useFindAndModify: false },
    );
    const updatedMessage = message.updateOne({ room: updatedRoom._id });
    return updatedRoom;
  }
}
