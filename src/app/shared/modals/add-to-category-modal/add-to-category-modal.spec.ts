import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCategoryModal } from './add-to-category-modal';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';

describe('AddToCategoryModal', () => {
  let component: AddToCategoryModal;
  let fixture: ComponentFixture<AddToCategoryModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToCategoryModal],
      providers : [{provide : NZ_ICONS , useValue : [PlusOutline]}]
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
