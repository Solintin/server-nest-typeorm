import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Repository } from 'typeorm';
import { CreateQuizSettingDto } from './dto/create-quiz-setting.dto';
import { UpdateQuizSettingDto } from './dto/update-quiz-setting.dto';
import { QuizSetting } from './entities/quiz-setting.entity';

@Injectable()
export class QuizSettingsService {
  constructor(
    @InjectRepository(QuizSetting)
    private readonly quizSettingRepo: Repository<QuizSetting>,
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
  ) {}
  async create(createQuizSettingDto: CreateQuizSettingDto) {
    const quizSetting = this.quizSettingRepo.create({
      ...createQuizSettingDto,
    });

    if (createQuizSettingDto?.quizId) {
      const getQuiz = await this.quizRepo.findOneBy({
        id: createQuizSettingDto.quizId,
      });
      if (getQuiz) {
        quizSetting.quiz = getQuiz;
      }
    }

    return await this.quizSettingRepo.save(quizSetting);
  }

  async findAll() {
    return await this.quizSettingRepo.find();
  }

  async findOne(id: string) {
    return this.quizSettingRepo.findOne({
      where: {
        id,
      },
      relations: ['quiz.questions'],
    });
  }

  async update(id: string, updateQuizSettingDto: UpdateQuizSettingDto) {
    return await this.quizSettingRepo.update(
      { id },
      { ...updateQuizSettingDto },
    );
  }

  async remove(id: string) {
    return await this.quizSettingRepo.delete(id);
  }
}
