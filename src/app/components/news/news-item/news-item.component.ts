import { Component, OnInit, Input } from '@angular/core';
import { StormNewsService } from 'src/app/services/storm-news.service';
import { News } from 'src/app/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  urlImageChecker: boolean;
  @Input() itemNewsOne: News;
  constructor(public stormNewsService: StormNewsService, private router: Router) { }

  ngOnInit() {
    if (this.itemNewsOne.urlToImage === 'no such information') {
    this.urlImageChecker = false;
  } else {
    this.urlImageChecker = true;
  }}
  findItemIdFunc() {
    this.stormNewsService.chosingNewsId = this.itemNewsOne.id;
  }
}
