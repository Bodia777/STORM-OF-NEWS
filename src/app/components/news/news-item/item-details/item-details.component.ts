import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { StormNewsService } from 'src/app/services/storm-news.service';
import { DomSanitizer } from '@angular/platform-browser';
import {Location} from '@angular/common';


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  numberId: number;
  res: string;
  constructor(public stormNewsService: StormNewsService, private location: Location) { }

  ngOnInit() {
    this.numberId = this.stormNewsService.chosingNewsId - 1;
    this.res = this.stormNewsService.newsArr[this.numberId].url;
  }
  backRoute() {
    this.location.back();
  }

}
