import { Component, OnInit, AfterContentInit } from '@angular/core';
import { StormNewsService } from 'src/app/services/storm-news.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, AfterContentInit {
constructor(public stormNewsService: StormNewsService) { }
  newsArrTaker = [];

  ngOnInit() { }

  ngAfterContentInit() {
    this.showNews();
  }
  async showNews() {
    const word = 'a' || 'а';
    let url;
    if (!this.stormNewsService.newsSource.typeOfNews) {
      url = `https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=bcac83edc8f44bbeb1a0118b3b622b4d`;
    }
    if (this.stormNewsService.newsSource.typeOfNews === 'top-headlines?') {
    // tslint:disable-next-line: max-line-length
    url = `https://newsapi.org/v2/${this.stormNewsService.newsSource.typeOfNews}` + `q=${this.stormNewsService.newsSource.controlWord}&` + `from=${this.stormNewsService.newsSource.dateFrom}&` + `to=${this.stormNewsService.newsSource.dateTo}&` + `country=${this.stormNewsService.newsSource.countrySelect}&` + `category=${this.stormNewsService.newsSource.categorySelect}&` + 'apiKey=bcac83edc8f44bbeb1a0118b3b622b4d';
    // tslint:disable-next-line: max-line-length
    } else if (this.stormNewsService.newsSource.typeOfNews === 'everything?' && (this.stormNewsService.newsSource.controlWord === '' || this.stormNewsService.newsSource.controlWord === ' ')) {
    // tslint:disable-next-line: max-line-length
    url = `https://newsapi.org/v2/${this.stormNewsService.newsSource.typeOfNews}` + `q=${word}&` + `from=${this.stormNewsService.newsSource.dateFrom}&` + `to=${this.stormNewsService.newsSource.dateTo}&` + `language=${this.stormNewsService.newsSource.languageSelect}&` +
    `sortBy=${this.stormNewsService.newsSource.sortBy}&` + 'apiKey=bcac83edc8f44bbeb1a0118b3b622b4d';
    } else {
      // tslint:disable-next-line: max-line-length
      url = `https://newsapi.org/v2/${this.stormNewsService.newsSource.typeOfNews}` + `q=${this.stormNewsService.newsSource.controlWord}&` + `from=${this.stormNewsService.newsSource.dateFrom}&` + `to=${this.stormNewsService.newsSource.dateTo}&` + `language=${this.stormNewsService.newsSource.languageSelect}&` +
      `sortBy=${this.stormNewsService.newsSource.sortBy}&` + 'apiKey=bcac83edc8f44bbeb1a0118b3b622b4d';
    }
    const req = new Request(url);
    // tslint:disable-next-line: only-arrow-functions
    const response = await fetch(req);
    const promiseResult = await response.json();
    this.stormNewsService.newsArr = promiseResult.articles;
// tslint:disable-next-line: forin
    for ( const arrkey in Object.keys(this.stormNewsService.newsArr)) {
  this.stormNewsService.newsArr[arrkey].id = +(arrkey) + 1;
  for (const objvalue of  Object.keys(this.stormNewsService.newsArr[+(arrkey)])) {
    if (this.stormNewsService.newsArr[arrkey][objvalue] === null || this.stormNewsService.newsArr[arrkey][objvalue] === 'null') {
      this.stormNewsService.newsArr[arrkey][objvalue] = 'no such information';
    }
  }
}
    this.newsArrTaker = this.stormNewsService.newsArr.slice(0);
}
}

