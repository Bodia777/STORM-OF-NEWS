import { Injectable, OnDestroy } from '@angular/core';
import { Visitor, News } from 'src/app/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StormNewsService implements OnDestroy {

// tslint:disable-next-line: ban-types
public newUser: Visitor = {
  id: 0,
  userLogin: '',
  userName: '',
  userMail: '',
  userPhone: '',
  userPass2: '',
  userPassword: '',
  userSurname: '',
  isLogin: false
};
public userArr: Array<Visitor> = [];
public newsArr: Array<News> = [];
public chosingNewsId: number;
public currentUser = [];
public hello = '';
public logIn = 'Login';
private url = 'http://localhost:3000/userarr';
private unsubscribed = new Subject();

  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
    this.unsubscribed.next();
    this.unsubscribed.complete();
  }

getUserArr(): Observable<Array<Visitor>> {
  return this.http.get<Array<Visitor>>(this.url);
}

async postNewUser() {
  const req = new Request(this.url);
  const response = await fetch(req);
  const promiseResult = await response.json();
  this.newUser.id = promiseResult.length + 1;
  this.http.post(this.url, this.newUser)
  .pipe(takeUntil(this.unsubscribed))
  .subscribe();
}
  putChangesUserArr(): Promise<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  const options = { headers };
  return new Promise((res, rej) => {
  this.http.put(`${this.url}/${this.currentUser[0].id}`, this.currentUser[0], options)
  .pipe(takeUntil(this.unsubscribed))
  .subscribe(
                (data) => {res(data);
                           this.currentUser[0] = Object.assign(data);
                           this.currentUser = [];
                           this.currentUser.push(data);
                },
                (err) => {rej(err); }
              ); });
}
}
