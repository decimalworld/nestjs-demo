import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  async getAllMessage(): Promise<Message[]> {
    return await this.messageService.getAllMessage();
  }

  @Post()
  async createMessage(
    @Body('message') message: CreateMessageDto,
  ): Promise<Message> {
    console.log(message);
    return await this.messageService.createMessage(message);
  }
}
