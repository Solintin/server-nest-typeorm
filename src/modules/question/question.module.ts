import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './entities/question.entity';
import { QuizModule } from '../quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/modules/tag/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Tag]), QuizModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
