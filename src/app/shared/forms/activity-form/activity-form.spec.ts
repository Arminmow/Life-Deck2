import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityForm } from './activity-form';
import { LinkOutline } from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

describe('ActivityForm', () => {
  let component: ActivityForm;
  let fixture: ComponentFixture<ActivityForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityForm],
      providers: [{ provide: NZ_ICONS, useValue: [LinkOutline] }],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
