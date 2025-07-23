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
import { SupabaseService } from '../../../supabase/supabase.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ActivityStore } from '../../../core/stores/activity.store';

@Component({
  selector: 'app-activity-form',
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    CommonModule,
    NzButtonModule,
  ],
  templateUrl: './activity-form.html',
  styleUrl: './activity-form.scss',
})
export class ActivityForm implements OnInit {
  constructor(
    private fb: NonNullableFormBuilder,
    private activityStore: ActivityStore
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      icon: [''],
      banner: [''],
    });
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      const formValue = this.form.value;

      this.activityStore.addActivityEffect({
        id: '',
        title: formValue.title,
        description: formValue.description,
        icon: formValue.icon,
        banner: formValue.banner,
        created: new Date(),
        lastPlayed: null,
        isRunning: false,
        lastSessionStart: null,
        timeSpent: null
      });

   
      this.form.reset();
    } catch (err: any) {
      console.error('Failed to add activity:', err.message);
      alert('Something went wrong while adding activity.');
    }
  }

  get titleControl() {
    return this.form.get('title');
  }
}
