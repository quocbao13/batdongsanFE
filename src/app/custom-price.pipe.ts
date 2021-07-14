import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPrice'
})
export class CustomPricePipe implements PipeTransform {

  transform(value: any): any {
    console.log(value.toString().length);
    const length = value.toString().length;
    if (length < 4) {
      return value;
    } else if (length < 7) {
      return value.slice(0, length - 3) + ' ngàn';
    } else if (length < 10) {
      return value.slice(0, length - 6) + ' triệu';
    } else if (length < 13) {
      return value.slice(0, length - 9) + ' tỷ';
    } else {
      return 'Không';
    }
  }

}
