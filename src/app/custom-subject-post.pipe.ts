import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSubjectPost'
})
export class CustomSubjectPostPipe implements PipeTransform {

  transform(value: any): any {
    if (value.length > 50) {
      return value.slice(0, 50) + '...';
    }
    return value;
  }

}
