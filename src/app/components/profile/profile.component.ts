import { Component, OnInit } from '@angular/core';
import { StormNewsService } from 'src/app/services/storm-news.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public changeProfileChecker = false;
  public nameSurname: string;

  constructor(public stormNewsService: StormNewsService) { }

  ngOnInit() {
  }

  changeProfile() {
console.log('ura');
this.changeProfileChecker = true;
  }
}
