import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], searchValue: string): any[] {
    return (
      value.filter((x) =>
        JSON.stringify(x).toLowerCase().includes(searchValue)
      ) || []
    );
  }
}
