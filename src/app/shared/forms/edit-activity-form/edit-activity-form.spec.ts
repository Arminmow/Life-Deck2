import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActivityForm } from './edit-activity-form';

describe('EditActivityForm', () => {
  let component: EditActivityForm;
  let fixture: ComponentFixture<EditActivityForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditActivityForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditActivityForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
