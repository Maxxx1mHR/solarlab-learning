import { Pipe, PipeTransform } from '@angular/core';

const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноявбря',
  'декабря',
];

@Pipe({
  name: 'DateCustomPipe',
  standalone: true,
})
export class DateCustomPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const date = new Date(value);
    const currentDay = new Date().getDate();
    const month = date.getMonth();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    if (date.getDate() === currentDay) {
      return `Сегодня ${hours}:${minutes}`;
    }
    if (date.getDate() === currentDay - 1) {
      return `Вчера ${hours}:${minutes}`;
    }
    return `${date.getDate()} ${MONTHS[month]} ${hours}:${minutes}`;
  }
}
