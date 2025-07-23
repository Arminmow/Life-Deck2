import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDetail } from './activity-detail';

describe('ActivityDetail', () => {
  let component: ActivityDetail;
  let fixture: ComponentFixture<ActivityDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
