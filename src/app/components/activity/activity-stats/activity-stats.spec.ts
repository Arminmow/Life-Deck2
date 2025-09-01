import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityStats } from './activity-stats';
import { Component, Input } from '@angular/core';
import { Activity } from '../../../models/activity.model';
import {
  FieldTimeOutline,
  HistoryOutline,
  CalendarOutline,
} from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { By } from '@angular/platform-browser';
import { ActivityBtn } from '../activity-btn/activity-btn';

/** -------------------- STUB CHILD COMPONENT -------------------- */

@Component({
  selector: 'app-activity-btn',
  template: '',
})
class ActivityBtnStub {
  @Input() activityId!: string;
  @Input() isRunning!: boolean;
}

/** -------------------- STUB PIPES -------------------- */
// I did stub pipes and override the real ones , but since my pipes are pure , fast and dont have any
// http calls or heavy liftings or async ops , I just left them be as is
// I know that using 'just now' in the test can cause problems if the pipe logic changes , but nvm for now

describe('ActivityStats', () => {
  let component: ActivityStats;
  let fixture: ComponentFixture<ActivityStats>;

  const mockActivity: Activity = {
    id: '123',
    isRunning: true,
    timeSpent: 5400, //1h 30m
    lastPlayed: null,
    created: new Date(),
    banner: 'banner url',
    category_id: null,
    description: 'test activity description',
    icon: 'icon url',
    lastSessionStart: null,
    title: 'mock activity',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityStats, ActivityBtnStub],
      providers: [
        {
          provide: NZ_ICONS,
          useValue: [FieldTimeOutline, HistoryOutline, CalendarOutline],
        },
      ],
    })
      .overrideComponent(ActivityStats, {
        remove: { imports: [ActivityBtn] },
        add: { imports: [ActivityBtnStub] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ActivityStats);
    component = fixture.componentInstance;
    component.activity = mockActivity;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD render activity-stats WHEN activity exists', () => {
    // Arrange
    const container = fixture.nativeElement.querySelector(
      '[data-testId="activity-stats"]'
    );
    // Act
    fixture.detectChanges();
    // Assert
    expect(container).toBeTruthy();
  });

  it('SHOULD pass correct inputs to ActivityBtn', () => {
    // Arrange
    const childDebugEl = fixture.debugElement.query(By.css('app-activity-btn'));
    const childInstance = childDebugEl.componentInstance as ActivityBtnStub;

    // Act
    fixture.detectChanges();
    // Assert
    expect(childInstance.activityId).toBe(mockActivity.id);
    expect(childInstance.isRunning).toBe(mockActivity.isRunning);
  });

  it('SHOULD render fallback text WHEN activity.lastPlayed is null', () => {
    // Arrange
    fixture.componentRef.setInput('activity', {
      ...mockActivity,
      lastPlayed: null,
    });

    // Act
    fixture.detectChanges();

    // Assert
    const lastPlayedEl = fixture.nativeElement.querySelector(
      '[data-testId="lastPlayed"]'
    );
    expect(lastPlayedEl.textContent).toContain('Not activated yet');
  });

  it('SHOULD render last played date WHEN activity.lastPlayed exists', () => {
    // Arrange
    const mockDate = new Date();
    fixture.componentRef.setInput('activity', {
      ...mockActivity,
      lastPlayed: mockDate,
    });

    // Act
    fixture.detectChanges();

    // Assert
    const lastPlayedEl = fixture.nativeElement.querySelector(
      '[data-testId="lastPlayed"]'
    );
    expect(lastPlayedEl.textContent).toContain('just now');
  });

  it('SHOULD render time spent WHEN activity.timeSpent exists', () => {
    // Arrange

    // Act

    // Assert
    const timeSpentEl = fixture.nativeElement.querySelector(
      '[data-testId="timeSpent"]'
    );
    expect(timeSpentEl.textContent).toContain('1h 30m');
  });

  it('SHOULD render 0m WHEN activity.timeSpent is null', () => {
    // Arrange
    fixture.componentRef.setInput('activity', {
      ...mockActivity,
      timeSpent: null,
    });

    // Act
    fixture.detectChanges();

    // Assert
    const timeSpentEl = fixture.nativeElement.querySelector(
      '[data-testId="timeSpent"]'
    );
    expect(timeSpentEl.textContent).toContain('0m');
  });

  it('SHOULD render the correct creation date', () => {
    // Arrange
    const fixedDate = new Date('2024-08-21T12:00:00');
    fixture.componentRef.setInput('activity', {
      ...mockActivity,
      created: fixedDate,
    });

    // Act
    fixture.detectChanges();

    // Assert
    const createdEl = fixture.nativeElement.querySelector(
      '[data-testId="createdDate"]'
    );
    expect(createdEl.textContent).toContain('21 August 2024');
  });

  it('SHOULD render empty string WHEN activity.created is null', () => {
    // Arrange
    fixture.componentRef.setInput('activity', {
      ...mockActivity,
      created: null,
    });

    // Act
    fixture.detectChanges();

    // Assert
    const createdEl = fixture.nativeElement.querySelector(
      '[data-testId="createdDate"]'
    );
    expect(createdEl.textContent.trim()).toBe('');
  });
});
