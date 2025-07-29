import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryForm } from './edit-category-form';

describe('EditCategoryForm', () => {
  let component: EditCategoryForm;
  let fixture: ComponentFixture<EditCategoryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategoryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategoryForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
