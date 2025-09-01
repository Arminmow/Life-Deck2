import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Activity } from '../../../models/activity.model';
import { ActivityEffects } from '../../../stores/activity/activity.effects';

@Component({
  selector: 'app-edit-activity-form',
  imports: [
    NzFormModule,
    NzInputModule,
    CommonModule,
    ReactiveFormsModule,
    NzInputNumberModule,
    NzButtonModule,
  ],
  templateUrl: './edit-activity-form.html',
  styleUrl: './edit-activity-form.scss',
})
export class EditActivityForm implements OnInit {
  @Input() activity!: Activity;
  @Output() formSubmited = new EventEmitter<void>();
  form!: FormGroup;
  constructor(
    private fb: NonNullableFormBuilder,
    private activityEffect: ActivityEffects
  ) {}

  ngOnInit(): void {
    if (this.activity) {
      const totalSeconds = this.activity.timeSpent || 0;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      this.form = this.fb.group({
        id: [this.activity.id],
        title: [
          this.activity.title,
          [Validators.required, Validators.minLength(3)],
        ],
        description: [this.activity.description],
        icon: [this.activity.icon],
        banner: [this.activity.banner],
        hours: [hours],
        minutes: [minutes],
      });
    }
  }

  get titleControl() {
    return this.form.get('title');
  }

  async submit() {
    if (this.form.valid) {
      const { hours, minutes, ...rest } = this.form.value;
      // Convert to seconds
      const timeSpent = hours * 3600 + minutes * 60;

      const updatedActivity: Activity = {
        ...rest,
        timeSpent,
      };

      this.activityEffect.updateActivityEffect(updatedActivity);
      this.formSubmited.emit();
    }
  }
}
