// src/pipes/joi-validation.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.Schema) {}

  transform(value: any) {
    // Reject if body is missing, null, not an object, or empty object
    if (
      !value ||
      typeof value !== 'object' ||
      Object.keys(value).length === 0
    ) {
      throw new BadRequestException('Request body cannot be empty');
    }

    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(
        error.details.map((detail) => detail.message).join(', '),
      );
    }
    return value;
  }
}
