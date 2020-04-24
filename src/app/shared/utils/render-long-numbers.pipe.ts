import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'renderLongNumbers', pure: false })
export class RenderLongNumbersPipe implements PipeTransform {
  transform(value: any): string {
    if (value === null) {
      return '';
    }
    if (value[0] === '+') {
      value = value.substring(1);
    }
    let str = value.toString(10);
    let newStr = '';
    let remainder = str.length % 3;
    let i = remainder;
    if (remainder !== 0) {
      newStr = newStr + str.substring(0, remainder) + "'";
    }
    for (i; i < str.length; i += 3) {
      newStr += str.substring(i, i + 3);
      if (str.length - i <= 3) {
        continue;
      }
      newStr += "'";
    }
    return newStr;
  }
}
