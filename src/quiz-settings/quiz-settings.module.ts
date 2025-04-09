import { Module } from '@nestjs/common';
import { QuizSettingsService } from './quiz-settings.service';
import { QuizSettingsController } from './quiz-settings.controller';

@Module({
  controllers: [QuizSettingsController],
  providers: [QuizSettingsService],
})
export class QuizSettingsModule {}
