import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDetail } from './activity-detail';
import { Activity } from '../../stores/activity.store';
import { By } from '@angular/platform-browser';

describe('ActivityDetail', () => {
  let component: ActivityDetail;
  let fixture: ComponentFixture<ActivityDetail>;
  let testActivity: Activity = {
    title: 'test ativity',
    id: '1',
    category_id: 'null',
    description: 'this is a test activity',
    created: new Date(),
    icon: 'test icon url',
    isRunning: false,
    lastPlayed: null,
    lastSessionStart: null,
    timeSpent: 100,
    banner: 'test banner url',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD render detail container WHEN activity is not null', () => {
    // Arrange
    component.activity = testActivity;
    // Act
    fixture.detectChanges();
    // Assert
    const detailContainer = fixture.debugElement.query(
      By.css(`[data-testId = "detail-container"]`)
    );
    expect(detailContainer).toBeTruthy();
  });
});
