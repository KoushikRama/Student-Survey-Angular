import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyList } from './survey-list';

describe('SurveyList', () => {
  let component: SurveyList;
  let fixture: ComponentFixture<SurveyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
