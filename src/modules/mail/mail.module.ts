import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueModule } from '../queue/queue.module';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { MailService } from './mail.service';
import { VerifyReminderService } from './verify-reminder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UserModule),
    forwardRef(() => QueueModule),
  ],
  providers: [VerifyReminderService, MailService],
  exports: [MailService],
})
export class MailModule {}
