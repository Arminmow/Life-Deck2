import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementModal } from './achievement-modal';

describe('AchievementModal', () => {
  let component: AchievementModal;
  let fixture: ComponentFixture<AchievementModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
