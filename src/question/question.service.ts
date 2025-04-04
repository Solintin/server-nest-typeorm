import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizService } from 'src/quiz/quiz.service';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly quizService: QuizService
  ) { }
  async create(createQuestionDto: CreateQuestionDto) {
    const quiz = await this.quizService.findOne(createQuestionDto.quizId);
    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }
    const question = this.questionRepository.create(createQuestionDto);
    question.quiz = quiz;
    return await this.questionRepository.save(question);
  }

  async findAll() {
    return await this.questionRepository.find({ relations: ["quiz"] });
  }

  async findOne(id: string) {
    return await this.questionRepository.findOne({ where: { id } });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return await this.questionRepository.update(id, updateQuestionDto);
  }

  async remove(id: string) {
    return await this.questionRepository.delete(id);
  }
}
