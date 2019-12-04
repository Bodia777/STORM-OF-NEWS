import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StormNewsService } from 'src/app/services/storm-news.service';

@Component({
  selector: 'app-main-text',
  templateUrl: './main-text.component.html',
  styleUrls: ['./main-text.component.scss']
})
export class MainTextComponent implements OnInit {
  cheker: boolean;

  constructor(private router: Router, private stormNewsService: StormNewsService, private route: ActivatedRoute) { }

  ngOnInit() { }
}
