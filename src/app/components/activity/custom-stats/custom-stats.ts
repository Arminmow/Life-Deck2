import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ActivityStore } from '../../../stores/activity/activity.store';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivityEffects } from '../../../stores/activity/activity.effects';
import { Activity } from '../../../models/activity.model';

@Component({
  selector: 'app-custom-stats',
  imports: [
    NzCardModule,
    CommonModule,
    NzButtonModule,
    NzPopoverModule,
    NzFormModule,
    NzInputNumberModule,
    ReactiveFormsModule,
  ],
  templateUrl: './custom-stats.html',
  styleUrl: './custom-stats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomStats implements OnInit {
  constructor(
    public activityStore: ActivityStore,
    private fb: FormBuilder,
    private activityEffectService: ActivityEffects
  ) {
    activityStore.selectedActivity$.subscribe((ac) => {
      console.log(ac?.customStats);
    });
  }

  form!: FormGroup;
  activity!: Activity | null;

  ngOnInit(): void {
    this.form = this.fb.group({
      statName: ['', Validators.required],
      initialValue: [''],
    });

    this.activityStore.selectedActivity$.subscribe((ac) => {
      this.activity = ac;
    });
  }

  visible: boolean = false;

  clickMe(e: MouseEvent): void {
    e.preventDefault();

    if (this.form.valid && this.activity) {
      const updatedActivity: Activity = {
        ...this.activity, // now TS knows activity is defined
        id: this.activity.id, // ensure id is included
        customStats: {
          ...this.activity.customStats,
          [this.form.value.statName]: this.form.value.initialValue,
        },
      };

      this.activityEffectService.updateActivityEffect(updatedActivity);
    }

    this.visible = false;
    console.log(this.form.value);
  }
}
