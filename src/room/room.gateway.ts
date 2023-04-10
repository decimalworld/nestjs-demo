import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { RoomService } from './room.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class RoomGateway {
  constructor(private roomService: RoomService) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(name: string) {
    const room = {
      name: name,
      secret: crypto.randomUUID(),
    };
    this.roomService.createRoom(room);
  }
}
