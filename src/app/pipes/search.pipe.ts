import { Pipe, PipeTransform } from '@angular/core';
import { News } from '../interface';
import { StormNewsService } from '../services/storm-news.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  constructor(public stormNewsService: StormNewsService) { }

  transform(newsArrTaker: Array<News>, searchInputWord: string = '', searchSelectBy: string = '' ): Array<News> {
    if (searchSelectBy === 'any field' && searchInputWord.trim()) {
      return newsArrTaker.filter((item: any) => {
        item.searchAnyField = '';
        const itemsofObj = Object.entries(item);
        // tslint:disable-next-line: variable-name
        itemsofObj.forEach((value: any, key: number, arr: any): void => {
        item.searchAnyField +=  value;
      });
        return item.searchAnyField.toLowerCase().includes(searchInputWord.toLowerCase());
      });
    } else {
      if (!searchInputWord.trim()) {
      return newsArrTaker;
    } else {
      return newsArrTaker.filter((item) => {
        // tslint:disable-next-line: max-line-length
        return item[searchSelectBy].toLowerCase().includes(searchInputWord.toLowerCase());
      });
    }
  }
  }
}
