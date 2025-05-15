import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { In, Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizService } from 'src/quiz/quiz.service';
import { TagService } from 'src/tag/tag.service';
import { Tag } from 'src/tag/entities/tag.entity';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly quizService: QuizService,
  ) {}
  async create(createQuestionDto: CreateQuestionDto) {
    const quiz = await this.quizService.findOne(createQuestionDto.quizId);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    const tags = createQuestionDto.tags
      ? await this.tagRepository.findBy({
          id: In(createQuestionDto.tags as string[]),
        })
      : [];
    const question = this.questionRepository.create({
      ...createQuestionDto,
      tags,
    });
    question.quiz = quiz;
    return await this.questionRepository.save(question);
  }

  async findAll() {
    return await this.questionRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    return await this.questionRepository.findOne({ where: { id } });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    const tags = updateQuestionDto.tags
      ? await this.tagRepository.findBy({
          id: In(updateQuestionDto.tags as string[]),
        })
      : question?.tags; // leave old tags
    return await this.questionRepository.update(id, {
      ...updateQuestionDto,
      tags,
    });
  }

  async findAllByQuizId(
    quizId: string,
  ): Promise<{ data: Question[]; count: number }> {
    const data = await this.questionRepository.find({
      where: { quiz: { id: quizId } },
      relations: ['tags'],
      order: { createdAt: 'DESC' },
    });
    const count = data.length;
    return {
      data,
      count,
    };
  }

  async remove(id: string) {
    return await this.questionRepository.delete(id);
  }
}
