// mail.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async SendMessage(payload: any) {
    const { email: to, subject, template, ...rest } = payload;
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template,
        context: {
          ...rest,
        },
      });
    } catch (error) {
      console.log(error);
    }
    Logger.log(`Mail sent successfully to ${to}`);
  }
}
