import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDetail } from './activity-detail';
import { Activity } from '../../stores/activity.store';
import { By } from '@angular/platform-browser';
import { FrownOutline } from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

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
      providers : [{provide : NZ_ICONS , useValue : [FrownOutline]}]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
