import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-achievement-form',
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    CommonModule,
  ],
  templateUrl: './achievement-form.html',
  styleUrl: './achievement-form.scss',
})
export class AchievementForm {
  achievementForm!: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit() {
    this.achievementForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      icon: [''],
    });
  }

  onSubmit() {
    if (this.achievementForm.valid) {
      // handle form value
      console.log(this.achievementForm.value);
    }
  }

  get titleControl() {
    return this.achievementForm.get('title');
  }
}
