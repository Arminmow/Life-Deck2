import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined): string {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) return '';

    const now = Date.now();
    const seconds = Math.floor((+now - +date) / 1000);

    if (seconds < 0) {
      return 'Future!?';
    }

    const oneDay = 86400;

    // If more than or equal to 1 day → always return days
    if (seconds >= oneDay) {
      const days = Math.floor(seconds / oneDay);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    // Otherwise → keep normal sub-day handling
    const intervals: Record<string, number> = {
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);
      if (interval >= 1) {
        return `${interval} ${key}${interval > 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }
}
