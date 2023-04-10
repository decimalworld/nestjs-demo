import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';
import { BullModule } from '@nestjs/bull';
import { MessageConsumer } from './message.consumer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    BullModule.registerQueue({
      name: 'message',
    }),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway, MessageConsumer],
})
export class MessageModule {}
