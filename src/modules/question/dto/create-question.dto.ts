import Joi from 'src/utils/validation/validation.custom';
export class CreateQuestionDto {
  question: string;
  answer: string;
  quizId: string;
  tags?: string[];
}

export const createQuestionSchema = Joi.object({
  question: Joi.string().required().min(1).max(255),
  answer: Joi.string().required(),
  quizId: Joi.string().uuid().required(),
  tags: Joi.array().items(Joi.string().uuid()).optional(),
});

export const updateQuestionSchema = createQuestionSchema.fork(
  ['question', 'answer', 'quizId', 'tags'],
  (schema) => schema.optional(),
);
