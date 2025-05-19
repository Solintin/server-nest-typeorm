import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionModule } from './modules/question/question.module';
import { QuizSettingsModule } from './modules/quiz-settings/quiz-settings.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';
import configuration from './config/configuration';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailService } from './modules/mail/mail.service';
import { MailModule } from './modules/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from '@nestjs/schedule';
import { mailConfig } from './config/mail.config';
import { QueueModule } from './modules/queue/queue.module';
@Module({
  imports: [
    QuizModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), // Loads environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...typeOrmConfig(configService),
      }),
    }),
    QuestionModule,
    QuizSettingsModule,
    TagModule,
    UserModule,
    EventEmitterModule.forRoot(),
    MailModule,
    ScheduleModule.forRoot(),
    MailerModule.forRoot({ ...mailConfig }),
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
