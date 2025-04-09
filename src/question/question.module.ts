import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './entities/question.entity';
import { QuizModule } from '../quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), QuizModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
