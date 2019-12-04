import { Component, OnInit } from '@angular/core';
import { StormNewsService } from 'src/app/services/storm-news.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  stormNewsServiceCurrentUserLength = false;

constructor(private stormNewsService: StormNewsService) { }

ngOnInit() { }

 async logout() {
   if (this.stormNewsService.currentUser.length) {
   this.stormNewsService.currentUser[0].isLogin = false;
   try {
   this.stormNewsService.logIn = 'Login';
   this.stormNewsServiceCurrentUserLength = false;
   this.stormNewsService.hello = '';
   await this.stormNewsService.putChangesUserArr();
   this.stormNewsService.currentUser = [];
  } catch (error) {
    console.log(error);
  }
}
}

}
