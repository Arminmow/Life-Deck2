import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSpent',
})
export class PrettyDurationPipe implements PipeTransform {
  transform(seconds: number | null | undefined): string {
    if (!seconds || seconds < 60) return '0m';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0 && minutes === 0) {
      return `${hours}h`;
    }

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
  }
}
