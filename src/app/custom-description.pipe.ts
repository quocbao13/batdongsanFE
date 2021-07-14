import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDescription'
})
export class CustomDescriptionPipe implements PipeTransform {

  transform(value: any): any {
    const valueReturn = value.split('<li>').join(' - ').split('</li>').join('').split('<ul>').join('');
    if (valueReturn.length > 500) {
      return valueReturn.slice(0, 500) + ' ...';
    }
    return valueReturn;
  }

}
