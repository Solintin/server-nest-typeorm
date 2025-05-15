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
} from '@nestjs/common';
import { QuestionService } from './question.service';
import {
  CreateQuestionDto,
  createQuestionSchema,
  updateQuestionSchema,
} from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JoiValidation } from 'src/utils/validation/validation.decorator';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @JoiValidation(createQuestionSchema)
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }
  @Get('/quiz/:id')
  findAllByQuizId(@Param('id') id: string) {
    return this.questionService.findAllByQuizId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  @JoiValidation(updateQuestionSchema)
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
