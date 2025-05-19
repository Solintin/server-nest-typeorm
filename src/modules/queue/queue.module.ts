// queue/queue.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { MailProcessor } from './mail.processor';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
    forwardRef(() => MailModule),
  ],
  providers: [QueueService, MailProcessor],
  exports: [QueueService],
})
export class QueueModule {}
