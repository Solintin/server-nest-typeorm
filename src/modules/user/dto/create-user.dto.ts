import Joi from 'src/utils/validation/validation.custom';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  confirm: string;
}

export const CreateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(128).alphanum().required(),
  confirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password must match password',
  }),
});
