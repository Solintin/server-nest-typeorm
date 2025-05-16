import Joi from 'src/utils/validation/validation.custom';

export class CreateQuizSettingDto {
  timeLimit: number;
  shuffleQuestions: boolean;
  showResults: boolean;
  attemptAllowed: number;
  quizId?: string;
}

export const createQuizSettingSchema = Joi.object({
  timeLimit: Joi.number().integer().min(0).max(1440).required(),
  shuffleQuestions: Joi.boolean().required(),
  showResults: Joi.boolean().required(),
  attemptAllowed: Joi.number().required(),
  quizId: Joi.string().trim().guid({ version: 'uuidv4' }).optional(),
});

export const updateQuizSettingSchema = Joi.object({
  timeLimit: Joi.number().integer().min(0).max(1440).optional(),
  shuffleQuestions: Joi.boolean().optional(),
  showResults: Joi.boolean().optional(),
  attemptAllowed: Joi.number().optional(),
  quizId: Joi.string().trim().guid({ version: 'uuidv4' }).optional(),
});
