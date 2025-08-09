import { Component, Input, OnInit } from '@angular/core';
import { ActivityStore, Category } from '../../../core/stores/activity.store';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-edit-category-form',
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    CommonModule,
    NzButtonModule,
  ],
  templateUrl: './edit-category-form.html',
  styleUrl: './edit-category-form.scss',
})
export class EditCategoryForm implements OnInit {
  constructor(
    private activityStore: ActivityStore,
    private fb: NonNullableFormBuilder
  ) {}

  @Input() category!: Category;

  form!: FormGroup;

  ngOnInit(): void {
    if (this.category) {
      this.form = this.fb.group({
        id: [this.category.id],
        title: [
          this.category.title,
          [Validators.required, Validators.minLength(3)],
        ],
        icon: [this.category.icon],
      });
    }
  }

  get titleControl() {
    return this.form.get('title');
  }

  submit() {
    if (this.form.valid) {
      this.activityStore.updateCategoryEffect(
        this.category.id,
        this.form.value
      );
    }
  }
}
