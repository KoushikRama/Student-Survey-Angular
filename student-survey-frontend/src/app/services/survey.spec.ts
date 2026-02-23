import { TestBed } from '@angular/core/testing';

import { SurveyService } from './survey';

describe('Survey', () => {
  let service: SurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
