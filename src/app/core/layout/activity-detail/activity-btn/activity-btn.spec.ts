import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBtn } from './activity-btn';

describe('ActivityBtn', () => {
  let component: ActivityBtn;
  let fixture: ComponentFixture<ActivityBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
