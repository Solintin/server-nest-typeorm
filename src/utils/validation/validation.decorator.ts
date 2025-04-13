// src/decorators/joi-validation.decorator.ts
import { UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from './validation.pipes';

export function JoiValidation(schema: any) {
  return UsePipes(new JoiValidationPipe(schema));
}
