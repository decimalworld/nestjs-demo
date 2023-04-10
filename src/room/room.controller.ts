import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller()
export class RoomController {
  constructor(private roomService: RoomService) {}
  @Get('/rooms')
  async getAllRoom() {
    const rooms = await this.roomService.getAllRoom();
    return rooms;
  }

  @Get('/rooms/:id')
  async getRoomId(@Param('id') id: string) {
    const room = await this.roomService.getRoomId(id);
    return room;
  }

  @Post('/rooms/')
  async createRoom(@Body('room') room: CreateRoomDto) {
    const createdRoom = await this.roomService.createRoom(room);
    return createdRoom;
  }

  @Delete('/rooms/:id')
  async deleteRoom(@Param('id') id: string) {
    const deletedRoom = await this.roomService.deleteRoom(id);
    return deletedRoom;
  }

  @Put('/rooms/:id')
  async addMessage(@Body('room') updateRoom, @Param('id') roomId: string) {
    const updatedRoom = await this.roomService.addMessageToRoom(
      updateRoom.message,
      roomId,
    );
    return updatedRoom;
  }
}
