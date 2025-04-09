import { Test, TestingModule } from '@nestjs/testing';
import { QuizSettingsController } from './quiz-settings.controller';
import { QuizSettingsService } from './quiz-settings.service';

describe('QuizSettingsController', () => {
  let controller: QuizSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizSettingsController],
      providers: [QuizSettingsService],
    }).compile();

    controller = module.get<QuizSettingsController>(QuizSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
