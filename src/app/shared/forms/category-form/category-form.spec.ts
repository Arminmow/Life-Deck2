import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryForm } from './category-form';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LinkOutline } from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

describe('CategoryForm', () => {
  let component: CategoryForm;
  let fixture: ComponentFixture<CategoryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryForm],
      providers: [
        provideNoopAnimations(),
        { provide: NZ_ICONS, useValue: [LinkOutline] },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
