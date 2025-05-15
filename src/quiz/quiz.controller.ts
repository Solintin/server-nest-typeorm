import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createQuizDto: CreateQuizDto) {
    try {
      return this.quizService.create(createQuizDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Get('min-question')
  findQuizzesWithMinQuestions(@Query('minQ') minQ: number) {
    return this.quizService.getQuizzesWithMinQuestions(minQ);
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }
  @Get('stats')
  findQuizStatistics() {
    return this.quizService.getQuizStatistics();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }
  @Get(':id/questions')
  findOneQuizQuestion(@Param('id') id: string) {
    return this.quizService.findOneQuizQuestion(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }
}
