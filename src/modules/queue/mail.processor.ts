// queue/processors/mail.processor.ts
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bullmq';
import { EmailQueueType } from 'src/utils/enums';
import { MailService } from '../mail/mail.service';

@Processor('mail-queue')
export class MailProcessor {
  constructor(private readonly mailService: MailService) {}

  @Process(EmailQueueType.VERIFY_ACCOUNT)
  async handleSendVerification(job: Job) {
    await this.mailService.SendMessage(job.data);
  }
}
