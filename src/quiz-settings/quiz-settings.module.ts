import { Module } from '@nestjs/common';
import { QuizSettingsService } from './quiz-settings.service';
import { QuizSettingsController } from './quiz-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizSetting } from './entities/quiz-setting.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizSetting, Quiz])],
  controllers: [QuizSettingsController],
  providers: [QuizSettingsService],
})
export class QuizSettingsModule {}
