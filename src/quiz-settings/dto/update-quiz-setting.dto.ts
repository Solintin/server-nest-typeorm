import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizSettingDto } from './create-quiz-setting.dto';

export class UpdateQuizSettingDto extends PartialType(CreateQuizSettingDto) {}
