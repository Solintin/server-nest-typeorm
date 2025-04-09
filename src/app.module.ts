import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionModule } from './question/question.module';
import { QuizSettingsModule } from './quiz-settings/quiz-settings.module';

@Module({
  imports: [QuizModule,
    ConfigModule.forRoot({ isGlobal: true }), // Loads environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...typeOrmConfig
      })
    }), QuestionModule, QuizSettingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
