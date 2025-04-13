import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';
import { QuizSetting } from 'src/quiz-settings/entities/quiz-setting.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(QuizSetting)
    private readonly quizSettingsRepo: Repository<QuizSetting>,
  ) {}

  async create(createQuizDto: CreateQuizDto) {
    const quizSettings = await this.quizSettingsRepo.findOneBy({
      id: createQuizDto.settingsId,
    });
    const quiz = this.quizRepository.create({
      ...createQuizDto,
    });
    if (quizSettings) {
      quiz.settings = quizSettings;
    }
    return await this.quizRepository.save(quiz);
  }

  async findAll() {
    const quizzes = await this.quizRepository.find({
      relations: ['questions'],
    });
    return quizzes;
  }

  async findOne(id: string) {
    return await this.quizRepository.findOne({ where: { id } });
  }

  async findOneQuizQuestion(id: string) {
    return await this.questionRepository.find({
      where: { quiz: { id } },
      relations: ['quiz'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    return await this.quizRepository.update(id, updateQuizDto);
  }

  async remove(id: string) {
    return await this.quizRepository.delete(id);
  }
}
