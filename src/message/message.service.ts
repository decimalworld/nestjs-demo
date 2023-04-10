import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable({})
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectQueue('message') private messageQueue: Queue,
  ) {}

  async getAllMessage(): Promise<Message[]> {
    const allMessage = this.messageModel.find();
    return allMessage;
  }

  async createMessage(message: CreateMessageDto): Promise<Message> {
    const createdMessage = new this.messageModel(message);
    return createdMessage.save();
  }

  async generateBotMessage() {
    return await this.messageQueue.add('generateDelay', {
      message: 'this is a bot generated message',
    });
  }
}
