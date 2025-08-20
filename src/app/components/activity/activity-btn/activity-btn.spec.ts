import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBtn } from './activity-btn';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { CaretRightOutline } from '@ant-design/icons-angular/icons';

describe('ActivityBtn', () => {
  let component: ActivityBtn;
  let fixture: ComponentFixture<ActivityBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityBtn],
      providers: [{provide: NZ_ICONS , useValue : [CaretRightOutline]}]
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
