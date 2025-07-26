import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementForm } from './achievement-form';

describe('AchievementForm', () => {
  let component: AchievementForm;
  let fixture: ComponentFixture<AchievementForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
