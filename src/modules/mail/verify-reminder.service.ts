// verify-reminder.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from './mail.service';
import { User } from '../user/entities/user.entity';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class VerifyReminderService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private queueService: QueueService,
  ) {}

  // Runs every day at 8am
  @Cron(CronExpression.EVERY_5_MINUTES)
  async remindUnverifiedUsers() {
    const users = await this.userRepo.find({ where: { isVerified: false } });
    for (const user of users) {
      const link = `https://yourapp.com/verify?email=${user.email}`;
      const payload = {
        subject: 'Reminder Verification email',
        template: 'verify-email',
        email: user.email,
        name: user.name,
        link,
      };
      await this.queueService.sendAccountVerification(payload);
    }
  }
}
