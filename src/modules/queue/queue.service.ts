// queue/queue.service.ts
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { EmailQueueType } from 'src/utils/enums';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('mail-queue') private mailQueue: Queue) {}

  async sendAccountVerification(data: any) {
    return await this.mailQueue.add(EmailQueueType.VERIFY_ACCOUNT, data, {
      attempts: 3,
      //   delay: 1000 * 60F * 10, // delay job 10 minutes
    });
  }
}
