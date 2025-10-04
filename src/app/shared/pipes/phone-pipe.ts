import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true,
})
export class PhonePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    // const formatFirstChar = value.replace(/8/, '+7');
    const country = '+7';
    const part1 = value.slice(1, 4);
    const part2 = value.slice(4, 7);
    const part3 = value.slice(7, 9);
    const part4 = value.slice(9);

    return country + ' (' + part1 + ') ' + part2 + '-' + part3 + '-' + part4;
  }
}
