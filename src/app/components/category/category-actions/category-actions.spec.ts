import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryActions } from './category-actions';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { Category } from '../../../models/category.model';
import { CategoryStore } from '../../../stores/category/category.store';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Component, Input } from '@angular/core';
import { EditCategoryModal } from '../../../shared/modals/edit-category-modal/edit-category-modal';
import { AddToCategoryModal } from '../../../shared/modals/add-to-category-modal/add-to-category-modal';
import { By } from '@angular/platform-browser';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

/*--------------- STUB CHILD COMPONENTS ---------------- */

@Component({
  selector: 'app-edit-category-modal',
  template: '',
})
class EditCategoryModalStub {
  @Input() category!: Category;
}

@Component({
  selector: 'app-add-to-category-modal',
  template: '',
})
class AddToCategoryModalStub {
  @Input() category!: Category;
}

/* --------------------------------------------------- */

describe('CategoryActions', () => {
  let component: CategoryActions;
  let fixture: ComponentFixture<CategoryActions>;
  let categoryStoreSpy: jasmine.SpyObj<CategoryStore>;
  let nzModalService: NzModalService;

  const mockCategory: Category = {
    icon: 'iconUrl',
    id: '123',
    title: 'mock category',
  };

  beforeEach(async () => {
    categoryStoreSpy = jasmine.createSpyObj('CategoryStore', [
      'deleteCategoryEffect',
    ]);

    await TestBed.configureTestingModule({
      imports: [CategoryActions],
      providers: [
        provideNoopAnimations(),
        { provide: NZ_ICONS, useValue: [PlusOutline] },
        { provide: CategoryStore, useValue: categoryStoreSpy },
      ],
    })
      .overrideComponent(CategoryActions, {
        remove: { imports: [EditCategoryModal, AddToCategoryModal] },
        add: { imports: [EditCategoryModalStub, AddToCategoryModalStub] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CategoryActions);
    component = fixture.componentInstance;
    component.category = mockCategory;

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

  it('SHOULD pass correct inputs to child components', () => {
    // Arrange
    const firstChild = fixture.debugElement.query(
      By.css('app-edit-category-modal')
    );
    const secondChild = fixture.debugElement.query(
      By.css('app-add-to-category-modal')
    );

    // Act

    // Assert
    expect(firstChild.componentInstance.category).toEqual(mockCategory);
    expect(secondChild.componentInstance.category).toEqual(mockCategory);
  });

  it('SHOULD call deleteCategoryEffect WHEN delete is called', () => {
    // Arrange

    // Act
    component.delete();

    // Assert
    expect(categoryStoreSpy.deleteCategoryEffect).toHaveBeenCalledWith(
      mockCategory.id
    );
  });

  it('SHOULD call modal.confirm WHEN confirmDelete is called', () => {
    // Arrange

    // Act
    component.confirmDelete();

    // Assert
    expect(nzModalService.confirm).toHaveBeenCalledWith(
      jasmine.objectContaining({
        nzTitle: 'Are you sure you want to delete this category?',
        nzOkText: 'Yes, delete it',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzCancelText: 'Cancel',
        nzOnOk: jasmine.any(Function), // just verify its a function
      })
    );
  });

  it('SHOULD call delete WHEN nzOnOk callback runs from confirmDelete', () => {
    // Arrange
    spyOn(component, 'delete');

    // Act
    component.confirmDelete();

    // Assert
    expect(component.delete).toHaveBeenCalled();
  });

  it('SHOULD call deleteCategoryEffect WHEN nzOnOk callback runs from confirmDelete', () => {
    // Arrange
    component.confirmDelete();

    // Act
    // (nzOnOk is invoked inside the confirm spy you set up in beforeEach)

    // Assert
    expect(categoryStoreSpy.deleteCategoryEffect).toHaveBeenCalledWith(
      mockCategory.id
    );
  });
});
