import { Quiz } from "src/quiz/entities/quiz.entity";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";

@Entity("questions")
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    question: string;

    @Column()
    answer: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Quiz, quiz => quiz.questions)
    quiz: Quiz;

}
