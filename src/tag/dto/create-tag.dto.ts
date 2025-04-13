import Joi from 'src/utils/validation/validation.custom';
export class CreateTagDto {
  name: string;
}

export const createQuestionTagSchema = Joi.object({
  name: Joi.string().required(),
});
export const updateQuestionTagSchema = Joi.object({
  name: Joi.string().optional(),
});
