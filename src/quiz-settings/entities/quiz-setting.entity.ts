import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_settings')
export class QuizSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 60 })
  timeLimit: number;

  @Column({ default: false })
  shuffleQuestions: boolean;

  @Column({ default: false })
  showResults: boolean;

  @Column({ default: 1 })
  attemptAllowed: number;

  @OneToOne(() => Quiz, (q) => q.settings)
  quiz: Quiz;
}
