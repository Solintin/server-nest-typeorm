import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserEvent } from 'src/common/constant.event';
import { QueueService } from 'src/modules/queue/queue.service';
import { User } from 'src/modules/user/entities/user.entity';
import { MailService } from '../modules/mail/mail.service';

@Injectable()
export class UserCreatedListener {
  constructor(private queueService: QueueService) {}
  @OnEvent(UserEvent.SEND_WELCOME_MAIL)
  async handleUserCreatedEvent(payload: User) {
    try {
      const mailPayload = {
        subject: 'Verify your email',
        template: 'verify-email',
        email: payload.email,
        name: payload.name ?? '',
        link: 'https://google.com',
      };
      const job = (await this.queueService.sendAccountVerification({
        ...mailPayload,
      })) as any;

      Logger.log(`Job  Id ${job.id} completed successfully`);

      return { jobId: job.id, message: 'Email queued successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
