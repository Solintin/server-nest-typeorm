import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
// import { QuestionModule } from 'src/question/question.module';
import { Question } from 'src/modules/question/entities/question.entity';
import { QuizSetting } from '../quiz-settings/entities/quiz-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, QuizSetting])],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
