import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ActivityBtn } from './activity-btn';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { CaretRightOutline } from '@ant-design/icons-angular/icons';
import { ActivityService } from '../../../services/activity/activity-service';
import { ActivityStore } from '../../../stores/activity/activity.store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ChangeDetectorRef } from '@angular/core';

describe('ActivityBtn', () => {
  let component: ActivityBtn;
  let fixture: ComponentFixture<ActivityBtn>;
  let activityServiceSpy: jasmine.SpyObj<ActivityService>;
  let activityStoreSpy: jasmine.SpyObj<ActivityStore>;
  let notificationSpy: jasmine.SpyObj<NzNotificationService>;
  let cdr: ChangeDetectorRef;

  beforeEach(async () => {
    activityServiceSpy = jasmine.createSpyObj('ActivityService', [
      'stopActivity',
      'startActivity',
    ]);

    activityStoreSpy = jasmine.createSpyObj('ActivityStore', [
      'stopActivity',
      'startActivity',
    ]);

    notificationSpy = jasmine.createSpyObj('NzNotificationService', [
      'success',
      'error',
    ]);

    await TestBed.configureTestingModule({
      imports: [ActivityBtn],
      providers: [
        { provide: ActivityService, useValue: activityServiceSpy },
        { provide: ActivityStore, useValue: activityStoreSpy },
        { provide: NzNotificationService, useValue: notificationSpy },
        { provide: NZ_ICONS, useValue: [CaretRightOutline] },
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityBtn);
    component = fixture.componentInstance;
    cdr = fixture.componentRef.injector.get(ChangeDetectorRef);
    component.activityId = '123';
    component.isRunning = false;
    component.loading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD call startActivity on activityService and activityStore WHEN not running and clicked', fakeAsync(() => {
    // Arrange
    fixture.componentRef.setInput('isRunning', false);

    // Act
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', null);

    tick();

    // Assert
    expect(activityServiceSpy.startActivity).toHaveBeenCalledWith('123');
    expect(activityStoreSpy.startActivity).toHaveBeenCalledWith('123');
    expect(notificationSpy.success).toHaveBeenCalledWith(
      '',
      'Activity Started successfully'
    );
  }));

  it('SHOULD call stopActivity on activityService and activityStore WHEN running and clicked', fakeAsync(() => {
    // Arrange
    fixture.componentRef.setInput('isRunning', true);

    // Act
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', null);

    tick();

    // Assert
    expect(activityServiceSpy.stopActivity).toHaveBeenCalledWith('123');
    expect(activityStoreSpy.stopActivity).toHaveBeenCalledWith('123');
    expect(notificationSpy.success).toHaveBeenCalledWith(
      '',
      'Activity Stopped successfully'
    );
  }));

  it('SHOULD change loading to true WHEN clicked and false when async is done', fakeAsync(() => {
    // Arrange
    component.loading = false;

    // Act
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', null);

    // Assert
    expect(component.loading).toBeTrue();

    tick();

    expect(component.loading).toBeFalse();
  }));

  it('SHOULD render icon WHEN loading is false', () => {
    // Arrange
    component.loading = false;

    // Act
    fixture.detectChanges();

    // Assert
    const icon = fixture.nativeElement.querySelector('[data-testId="icon"]');
    expect(icon).toBeTruthy();
  });

  it('SHOULD render loading text WHEN loading is true', () => {
    // Arrange
    component.loading = true;

    // Act
    cdr.detectChanges();
    fixture.detectChanges();

    // Assert
    const loadingText = fixture.nativeElement.querySelector(
      '[data-testId="loading"]'
    );
    expect(loadingText).toBeTruthy();
    expect(loadingText.textContent).toContain('Wait');
  });

  it('SHOULD disable btn WHEN loading is true', () => {
    // Arrange
    component.loading = true;

    // Act
    cdr.detectChanges();
    fixture.detectChanges();

    // Assert
    const btn = fixture.nativeElement.querySelector('[data-testId="btn"]');
    expect(btn.disabled).toBeTrue();
  });

  it('SHOULD render correct btn text based on running state', () => {
    // Arrange
    fixture.componentRef.setInput('isRunning', false);

    // Act
    fixture.detectChanges();

    // Assert
    const btnText = fixture.nativeElement.querySelector(
      '[data-testId="btn-text"]'
    );
    expect(btnText.textContent).toContain('Start');

    // Arrange
    fixture.componentRef.setInput('isRunning', true);

    // Act
    fixture.detectChanges();

    // Assert
    expect(btnText.textContent).toContain('Stop');
  });
});
