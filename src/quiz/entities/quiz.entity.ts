import { Question } from "src/question/entities/question.entity";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";

@Entity("quizzes")
export class Quiz extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", { length: 255 })
    title: string;

    @Column("text")
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Question, question => question.quiz, { cascade: true })
    questions: Question[];
}
