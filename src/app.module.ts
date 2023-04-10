import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MessageModule,
    RoomModule,
  ],
})
export class AppModule {}
