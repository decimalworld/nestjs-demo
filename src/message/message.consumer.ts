import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MessageGateway } from './message.gateway';

@Processor('message')
export class MessageConsumer {
  constructor(private messageGateway: MessageGateway) {}

  @Process('generateDelay')
  async generateDelay(job: Job<unknown>) {
    setTimeout(() => {
      this.messageGateway.generateMessage({
        name: 'bot',
        text: job.data['message'],
      });
    }, 5000);
  }
}
