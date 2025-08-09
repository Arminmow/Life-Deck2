import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryModal } from './edit-category-modal';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons';

describe('EditCategoryModal', () => {
  let component: EditCategoryModal;
  let fixture: ComponentFixture<EditCategoryModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategoryModal],
      providers: [{provide : NZ_ICONS , useValue : [PlusOutline]}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategoryModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
