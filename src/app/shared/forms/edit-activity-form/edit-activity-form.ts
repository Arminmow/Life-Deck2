import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Activity, ActivityStore } from '../../../stores/activity/activity.store';
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
    private activityStore: ActivityStore
  ) {}

  ngOnInit(): void {
    if (this.activity) {
      this.form = this.fb.group({
        id: [this.activity.id],
        title: [
          this.activity.title,
          [Validators.required, Validators.minLength(3)],
        ],
        description: [this.activity.description],
        icon: [this.activity.icon],
        banner: [this.activity.banner],
        timeSpent: [this.activity.timeSpent],
      });
    }
  }

  get titleControl() {
    return this.form.get('title');
  }

  async submit() {
    console.log('Submitting...');

    if (this.form.valid) {
      console.log('OK');

      const updatedActivity: Activity = this.form.value;
      console.log(updatedActivity);

      await this.activityStore.updateActivityEffect(updatedActivity);
      this.formSubmited.emit();
    }
  }
}
