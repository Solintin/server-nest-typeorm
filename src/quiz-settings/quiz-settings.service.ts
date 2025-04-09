import { Injectable } from '@nestjs/common';
import { CreateQuizSettingDto } from './dto/create-quiz-setting.dto';
import { UpdateQuizSettingDto } from './dto/update-quiz-setting.dto';

@Injectable()
export class QuizSettingsService {
  create(createQuizSettingDto: CreateQuizSettingDto) {
    return 'This action adds a new quizSetting';
  }

  findAll() {
    return `This action returns all quizSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizSetting`;
  }

  update(id: number, updateQuizSettingDto: UpdateQuizSettingDto) {
    return `This action updates a #${id} quizSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizSetting`;
  }
}
