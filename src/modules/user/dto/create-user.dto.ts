import Joi from 'src/utils/validation/validation.custom';
import { ApiProperty } from '@nestjs/swagger';
import { SortOrder, UserRole } from 'src/utils/enums';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Soliu Alley',
  })
  name: string;

  @ApiProperty({
    description: 'Email address of the user. Must be unique and valid.',
    example: 'soliualley@example.com',
  })
  email: string;

  @ApiProperty({
    description:
      'Password for the user account. Should be strong and at least 8 characters.',
    example: 'StrongP@ssw0rd!',
  })
  password: string;
  @ApiProperty({
    description:
      'Password for the user account. Should be strong and at least 8 characters.',
    enum: UserRole,
  })
  role: UserRole;

  @ApiProperty({
    description: 'Phone number of the user in international format.',
    example: '+2348165966977',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Confirmation of the password. Must match the password field.',
    example: 'StrongP@ssw0rd!',
  })
  confirm: string;
}

export const CreateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(128).required(),
  role: Joi.valid(...Object.values(UserRole)).optional(),

  confirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password must match password',
  }),
});

export class GetUserDTO {
  @ApiProperty({ required: false })
  limit?: number;

  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  sort?: string;

  @ApiProperty({ enum: SortOrder })
  sortDirection?: SortOrder;

  @ApiProperty({ required: false, type: () => Date })
  createdBefore?: Date;

  @ApiProperty({ required: false, type: () => Date })
  createdAfter?: Date;

  @ApiProperty({ required: false })
  q?: string;
}
