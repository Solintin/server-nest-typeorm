import { IsString, IsNotEmpty, Length } from "class-validator";

export class CreateQuestionDto {
    @IsNotEmpty({ message: "Question is required" })
    @IsString()
    @Length(1, 255, { message: "Question must be between 1 and 255 characters" })
    question: string;

    @IsNotEmpty({ message: "Answer is required" })
    @IsString()
    answer: string;
}
