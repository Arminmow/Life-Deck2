import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityActions } from './activity-actions';
import { ActivityEffects } from '../../../stores/activity/activity.effects';
import { ConfirmType, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Activity } from '../../../models/activity.model';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { MinusOutline } from '@ant-design/icons-angular/icons';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ActivityActions', () => {
  let component: ActivityActions;
  let fixture: ComponentFixture<ActivityActions>;
  let activityEffectSpy: jasmine.SpyObj<ActivityEffects>;
  // let modalSpy: jasmine.SpyObj<NzModalService>; //NG ZORRO needs the real one for some reason :)
  let nzModalService: NzModalService;

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
    activityEffectSpy = jasmine.createSpyObj('ActivityEffects', [
      'removeActivitiesFromCategoryEffect',
      'removeActivityEffect',
    ]);

    await TestBed.configureTestingModule({
      imports: [ActivityActions],
      providers: [
        provideNoopAnimations(),
        { provide: NZ_ICONS, useValue: [MinusOutline] },
        { provide: ActivityEffects, useValue: activityEffectSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityActions);
    component = fixture.componentInstance;
    component.activity = mockActivity;
    component.isVisible = false;

    nzModalService = fixture.debugElement.injector.get(NzModalService);
    spyOn(nzModalService, 'confirm').and.callFake((cfg: any) => {
      if (cfg && typeof cfg.nzOnOk === 'function') {
        const result = cfg.nzOnOk(); // may be void or a Promise
        return result instanceof Promise
          ? (result as unknown as NzModalRef)
          : ({} as NzModalRef);
      }
      return {} as NzModalRef;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SHOULD render remove-btn WHEN activity.category_id exists', () => {
    // Arrange
    fixture.componentRef.setInput('activity', {
      ...mockActivity,
      category_id: '456',
    });
    // Act
    fixture.detectChanges();
    // Assert
    const removeBtn = fixture.nativeElement.querySelector(
      '[data-testId="remove-btn"]'
    );
    expect(removeBtn).toBeTruthy();
  });

  it('SHOULD call removeActivityEffect WHEN confirmDelete OK is triggered', () => {
    // Arrange

    // Act
    component.confirmDelete();

    // Assert
    expect(nzModalService.confirm).toHaveBeenCalled();
    expect(activityEffectSpy.removeActivityEffect).toHaveBeenCalledWith(
      mockActivity.id
    );
  });

  it('SHOULD call removeActivitiesFromCategoryEffect WHEN confirmRemove OK is triggered', () => {
    // Arrange

    // Act
    component.confirmRemove();
    // Assert
    expect(nzModalService.confirm).toHaveBeenCalled();
    expect(
      activityEffectSpy.removeActivitiesFromCategoryEffect
    ).toHaveBeenCalledWith([mockActivity.id]);
  });

  it('SHOULD set isVisible to true WHEN showModal is called', () => {
    // Arrange

    // Act
    component.showModal();

    // Assert
    expect(component.isVisible).toBeTrue();
  });

  it('SHOULD set isVisible to false WHEN handleCancel is called', () => {
    // Arrange
    component.isVisible = true;

    // Act
    fixture.detectChanges();
    component.handleCancel();

    // Assert
    expect(component.isVisible).toBeFalse();
  });

  it('delete() should call removeActivityEffect with activity id', () => {
    activityEffectSpy.removeActivityEffect.calls.reset();

    component.delete();

    expect(activityEffectSpy.removeActivityEffect).toHaveBeenCalledTimes(1);
    expect(activityEffectSpy.removeActivityEffect).toHaveBeenCalledWith(
      mockActivity.id
    );
  });

  it('remove() should call removeActivitiesFromCategoryEffect with activity id array', () => {
    activityEffectSpy.removeActivitiesFromCategoryEffect.calls.reset();

    component.remove();

    expect(
      activityEffectSpy.removeActivitiesFromCategoryEffect
    ).toHaveBeenCalledTimes(1);
    expect(
      activityEffectSpy.removeActivitiesFromCategoryEffect
    ).toHaveBeenCalledWith([mockActivity.id]);
  });
});
