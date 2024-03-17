import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {

  transform(arr: any[], chunkSize: number): any[] {
    if (!Array.isArray(arr)) return [];
    return arr.reduce((acc, _, i) => (i % chunkSize ? acc : [...acc, arr.slice(i, i + chunkSize)]), []);
  }

}
