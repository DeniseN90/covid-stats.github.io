import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'renderLongNumbers', pure: false })
export class RenderLongNumbersPipe implements PipeTransform {
  transform(value: any): string {
    let isSigned = false;
    if (value === null) {
      return '';
    }
    if (value[0] === '+') {
      isSigned = true;
      value = value.substring(1);
    }
    let str = value.toString();
    let newStr = '';
    let remainder = str.length % 3;
    let i = remainder;
    if (remainder !== 0) {
      newStr = newStr + str.substring(0, remainder);
      if (str.substring(remainder).length >= 3) {
        newStr += ",";
      }
    }
    for (i; i < str.length; i += 3) {
      newStr += str.substring(i, i + 3);
      if (str.length - i <= 3) {
        continue;
      }
      newStr += ",";
    }
    if (isSigned) {
      newStr = '+ '.concat(newStr);
      return newStr;
    }
    return newStr;
  }
}
