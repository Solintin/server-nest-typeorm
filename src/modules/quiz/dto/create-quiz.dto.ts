import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateQuizDto {
  @IsString({
    message: 'Title must be a string',
  })
  @Length(3, 255, {
    message: 'Title must be between 3 and 255 characters',
  })
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsUUID()
  settingsId?: string;
}
