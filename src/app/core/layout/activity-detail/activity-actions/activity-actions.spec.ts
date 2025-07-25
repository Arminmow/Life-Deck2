import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityActions } from './activity-actions';

describe('ActivityActions', () => {
  let component: ActivityActions;
  let fixture: ComponentFixture<ActivityActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
