import { Test, TestingModule } from '@nestjs/testing';
import { QuizSettingsService } from './quiz-settings.service';

describe('QuizSettingsService', () => {
  let service: QuizSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizSettingsService],
    }).compile();

    service = module.get<QuizSettingsService>(QuizSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
