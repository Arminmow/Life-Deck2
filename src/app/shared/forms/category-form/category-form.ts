import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ActivityStore } from '../../../stores/activity/activity.store';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Category } from '../../../models/category.model';
import { CategoryStore } from '../../../stores/category/category.store';

@Component({
  selector: 'app-category-form',
  imports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    CommonModule,
    NzSelectModule,
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
})
export class CategoryForm implements OnInit {
  @Output() formSubmited = new EventEmitter<void>();

  constructor(
    private fb: NonNullableFormBuilder,
    public activityStore: ActivityStore,
    private categoryStore : CategoryStore
  ) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      icon: [''],
      activities: [[]],
    });
  }

  async submit() {
    console.log(this.form.value);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const newCategory: Category & { activities: string[] } = this.form.value;
    await this.categoryStore.addCategoryEffect(newCategory);
    this.form.reset();
    this.formSubmited.emit();
  }

  get titleControl() {
    return this.form.get('title');
  }
}
