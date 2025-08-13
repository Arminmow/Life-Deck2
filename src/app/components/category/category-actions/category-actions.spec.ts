import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryActions } from './category-actions';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons';

describe('CategoryActions', () => {
  let component: CategoryActions;
  let fixture: ComponentFixture<CategoryActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryActions],
      providers: [{ provide: NZ_ICONS, useValue: [PlusOutline] }],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
