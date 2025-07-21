import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-form',
  imports: [NzFormModule, ReactiveFormsModule, NzInputModule, CommonModule],
  templateUrl: './activity-form.html',
  styleUrl: './activity-form.scss',
})
export class ActivityForm implements OnInit {
  constructor(private fb: NonNullableFormBuilder) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      icon: [''],
      banner: [''],
      lastActive: [''],
    });
  }

  get titleControl() {
    return this.form.get('title');
  }
}
