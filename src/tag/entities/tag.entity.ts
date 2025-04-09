import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Question, (q) => q.tags)
  questions: Question[];
}
