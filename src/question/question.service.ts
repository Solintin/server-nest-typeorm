import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) { }
  async create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);
    return await this.questionRepository.save(question);
  }

  async findAll() {
    return await this.questionRepository.find();
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
