import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { Question } from 'src/modules/question/entities/question.entity';
import { QuizSetting } from '../quiz-settings/entities/quiz-setting.entity';

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
      relations: ['questions', 'settings'],
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
    const quizSettings = await this.quizSettingsRepo.findOneBy({
      id: updateQuizDto.settingsId,
    });

    delete updateQuizDto.settingsId;
    return await this.quizRepository.update(id, {
      ...updateQuizDto,
      ...(quizSettings ? { settings: quizSettings } : {}),
    });
  }

  async remove(id: string) {
    return await this.quizRepository.delete(id);
  }

  async getQuizzesWithMinQuestions(minQ: number): Promise<Quiz[]> {
    return this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoin('quiz.questions', 'questions')
      .groupBy('quiz.id')
      .having('COUNT(questions.id) >= :minQ', { minQ })
      .getMany();
  }
  async getQuizStatistics(): Promise<any[]> {
    return this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoin('quiz.settings', 'settings')
      .leftJoin('quiz.questions', 'questions')
      .select('quiz.id', 'quizId')
      .addSelect('quiz.title', 'quizTitle')
      .addSelect('settings.timeLimit', 'settingLimitCount')
      .addSelect('COUNT(questions.id)', 'questionCount')
      .groupBy('quiz.id')
      .addGroupBy('settings.timeLimit')
      .getRawMany();
  }
}
