import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/modules/question/entities/question.entity';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Tag])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
