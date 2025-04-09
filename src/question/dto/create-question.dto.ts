import {
  IsString,
  IsNotEmpty,
  Length,
  IsUUID,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty({ message: 'Question is required' })
  @IsString()
  @Length(1, 255, { message: 'Question must be between 1 and 255 characters' })
  question: string;

  @IsNotEmpty({ message: 'Answer is required' })
  @IsString()
  answer: string;

  @IsNotEmpty({ message: 'Quiz ID is required' })
  @IsString()
  @IsUUID()
  quizId: string;

  @IsArray()
  @IsUUID('all', { each: true })
  tags: string[];
}
