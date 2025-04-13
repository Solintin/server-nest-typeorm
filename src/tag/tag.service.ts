import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}
  async create(createTagDto: CreateTagDto) {
    const newTag = this.tagRepo.create(createTagDto);
    return await this.tagRepo.save(newTag);
  }

  async findAll() {
    return await this.tagRepo.find();
  }

  async findOne(id: string) {
    return this.tagRepo.findOne({
      where: {
        id,
      },
    });
  }

  update(id: string, updateTagDto: UpdateTagDto) {
    return this.tagRepo.update({ id }, { ...updateTagDto });
  }

  async remove(id: string) {
    return await this.tagRepo.delete(id);
  }
}
