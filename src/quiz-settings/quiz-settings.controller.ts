import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizSettingsService } from './quiz-settings.service';
import { CreateQuizSettingDto } from './dto/create-quiz-setting.dto';
import { UpdateQuizSettingDto } from './dto/update-quiz-setting.dto';

@Controller('quiz-settings')
export class QuizSettingsController {
  constructor(private readonly quizSettingsService: QuizSettingsService) {}

  @Post()
  create(@Body() createQuizSettingDto: CreateQuizSettingDto) {
    return this.quizSettingsService.create(createQuizSettingDto);
  }

  @Get()
  findAll() {
    return this.quizSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizSettingDto: UpdateQuizSettingDto) {
    return this.quizSettingsService.update(+id, updateQuizSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizSettingsService.remove(+id);
  }
}
