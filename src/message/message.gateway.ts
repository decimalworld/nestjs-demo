import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server;

  constructor(private messageService: MessageService) {}

  @SubscribeMessage('findAllMessages')
  async handleFindAllMessage(@MessageBody() data: string) {
    const messages = await this.messageService.getAllMessage();
    return messages;
  }

  @SubscribeMessage('createMessage')
  async handleCreateMessage(@MessageBody() message) {
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('join')
  async handJoin(@MessageBody() data: string) {
    return data;
  }

  @SubscribeMessage('typing')
  handleTyping(@MessageBody() data: string) {
    this.server.emit('typing', data);
    return data;
  }

  @SubscribeMessage('botMessage')
  handleBotMessage(@MessageBody() data: string) {
    console.log(data);
    this.messageService.generateBotMessage();
    return data;
  }

  generateMessage(message) {
    this.server.emit('message', message);
    return;
  }
}
