import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDetail } from './activity-detail';
import { FrownOutline } from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { Activity } from '../../../models/activity.model';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

/* ----------------- STUB CHILD COMPONENTS ------------ */

@Component({
  selector: 'app-activity-actions',
  template: '',
})
class ActivityActionsStub {
  @Input() activity!: Activity;
}

@Component({
  selector: 'app-activity-modal',
  template: '',
})
class AppActivityModalStub {}

@Component({
  selector: 'app-activity-stats',
  template: '',
})
class AppActivityStatsStub {
  @Input() activity!: Activity;
}

describe('ActivityDetail', () => {
  let component: ActivityDetail;
  let fixture: ComponentFixture<ActivityDetail>;

  const mockActivity: Activity = {
    id: '123',
    isRunning: true,
    timeSpent: 5400, //1h 30m
    lastPlayed: null,
    created: new Date(),
    banner: 'bannerUrl',
    category_id: null,
    description: 'test activity description',
    icon: 'icon url',
    lastSessionStart: null,
    title: 'mock activity',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityDetail],
      providers: [{ provide: NZ_ICONS, useValue: [FrownOutline] }],
    })
      .overrideComponent(ActivityDetail, {
        set: {
          imports: [
            ActivityActionsStub,
            CommonModule,
            AppActivityModalStub,
            AppActivityStatsStub,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ActivityDetail);
    component = fixture.componentInstance;
    component.activity = mockActivity;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD pass correct inputs to child components', () => {
    // Arrange
    const firstChildDebugEl = fixture.debugElement.query(
      By.css('app-activity-actions')
    );
    const firstChildInstance =
      firstChildDebugEl.componentInstance as ActivityActionsStub;

    const secondChildDebugEl = fixture.debugElement.query(
      By.css('app-activity-stats')
    );
    const secondChildInstance =
      secondChildDebugEl.componentInstance as AppActivityStatsStub;

    // Act
    fixture.detectChanges();

    // Assert
    expect(firstChildInstance.activity).toEqual(mockActivity);
    expect(secondChildInstance.activity).toEqual(mockActivity);
  });

  it('SHOULD render activity-detail container WHEN activity exists', () => {
    // Arrange

    // Act
    fixture.detectChanges();

    // Assert
    const container = fixture.nativeElement.querySelector(
      '[data-testId="detail-container"]'
    );
    expect(container).toBeTruthy();
  });

  it('SHOULD not render activity-detail container WHEN activity is null', () => {
    // Arrange
    fixture.componentRef.setInput('activity', null);

    // Act
    fixture.detectChanges();

    // Assert
    const container = fixture.nativeElement.querySelector(
      '[data-testId="detail-container"]'
    );
    expect(container).toBeFalsy();
  });

  it('SHOULD render no-activity-container WHEN activity is null', () => {
    // Arrange
    fixture.componentRef.setInput('activity', null);

    // Act
    fixture.detectChanges();

    // Assert
    const container = fixture.nativeElement.querySelector(
      '[data-testId="no-activity-container"]'
    );
    expect(container).toBeTruthy();
  });

  it('SHOULD not render app-activity-actions & app-activity-stats child components WHEN activity is null', () => {
    // Arrange
    fixture.componentRef.setInput('activity', null);

    // Act
    fixture.detectChanges();

    // Assert
    const actions = fixture.nativeElement.querySelector('app-activity-actions');
    const stats = fixture.nativeElement.querySelector('app-activity-stats');

    expect(actions).toBeFalsy();
    expect(stats).toBeFalsy();
  });

  it('SHOULD render app-activity-modal child component WHEN activity is null', () => {
    // Arrange
    fixture.componentRef.setInput('activity', null);

    // Act
    fixture.detectChanges();

    // Assert
    const modal = fixture.nativeElement.querySelector('app-activity-modal');
    expect(modal).toBeTruthy();
  });

  it('SHOULD not render app-activity-modal child component WHEN activity exists', () => {
    // Arrange

    // Act

    // Assert
    const modal = fixture.nativeElement.querySelector('app-activity-modal');
    expect(modal).toBeFalsy();
  });

  it('SHOULD render activity banner and title WHEN activity exists', () => {
    // Arrange

    // Act

    // Assert
    const img = fixture.nativeElement.querySelector('img.activity-banner');
    const title = fixture.nativeElement.querySelector('h2.activity-title');

    expect(img.src).toContain(mockActivity.banner);
    expect(title.textContent).toContain(mockActivity.title);
  });
});
