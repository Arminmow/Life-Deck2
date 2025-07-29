import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCategoryModal } from './add-to-category-modal';

describe('AddToCategoryModal', () => {
  let component: AddToCategoryModal;
  let fixture: ComponentFixture<AddToCategoryModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToCategoryModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToCategoryModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
