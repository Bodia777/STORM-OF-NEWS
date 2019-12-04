import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { StormNewsService } from 'src/app/services/storm-news.service';
import { ModalLoginCheckComponent } from '../modal-login-check/modal-login-check.component';
// import { Visitor } from 'src/app/interface';
import {Subject, Observable} from 'rxjs';
// import {takeUntil} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-modal-registration',
  templateUrl: './modal-registration.component.html',
  styleUrls: ['./modal-registration.component.scss']
})

export class ModalRegistrationComponent implements OnInit {
  userNew = {isLogin: false};
  regisrtrationForm: FormGroup;
  passwordWalidationChecker = 0;
  regForstring = /^(([a-z]+ )*[a-z]+)?$/i;
  regForlogin = /^([0-9a-zA-Z]+)$/i;
  regExpMail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{2,4})$/i;
  regExpPhone = /^([\+0-9])([0-9]{9,12})$/;
  regExpPassSpace = /([\s])/;
  regExpPassUpperCase = /([A-Z])/;
  regExpPassLowerCase = /([a-z])/;
  regExpPassNumber = /([0-9])/;
  regExpPassSpecSymbol = /\W/;
  passwordLengthChecker = false;
  passwordLowercaseChecker = false;
  passwordUppercaseChecker = false;
  passwordNumberChecker = false;
  passwordSymbolChecker = false;
  passwordSpaceChecker = false;

  // private unsubscribed = new Subject();

  constructor(
    public dialog3: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef < ModalRegistrationComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stormNewsService: StormNewsService,
    // private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.createregistrationForm();
  }

  private createregistrationForm(): void {
    this.regisrtrationForm = this.fb.group({
      userName: [],
      userSurname: [],
      userLogin: [],
      userMail: [],
      userPhone: [],
      userPassword: [],
      userPass2: []
    });
  }
  onSubmit(): void {}
  inputPasswordChange(): void {
    this.passwordWalidationChecker = 0;
    // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: no-string-literal
    if (this.regisrtrationForm.controls['userPassword'].value.length >= 8) {
      this.passwordLengthChecker = true;
    } else {
      this.passwordLengthChecker = false;
      this.passwordWalidationChecker++;
      // tslint:disable-next-line: no-string-literal && tslint:disable-next-line: no-unused-expression
      // this.regisrtrationForm.controls['userPassword'].invalid === true;
    }
    // tslint:disable-next-line: no-string-literal
    if (this.regisrtrationForm.controls['userPassword'].value.match(this.regExpPassLowerCase)) {
      this.passwordLowercaseChecker = true;
    } else {
      // tslint:disable-next-line: no-string-literal && tslint:disable-next-line: no-unused-expression
      // this.regisrtrationForm.controls['userPassword'].invalid === true;
      this.passwordWalidationChecker++;
      this.passwordLowercaseChecker = false;
    }
    // tslint:disable-next-line: no-string-literal
    if (this.regisrtrationForm.controls['userPassword'].value.match(this.regExpPassUpperCase)) {
      this.passwordUppercaseChecker = true;
    } else {
      // tslint:disable-next-line: no-string-literal && tslint:disable-next-line: no-unused-expression
      // this.regisrtrationForm.controls['userPassword'].invalid === true;
      this.passwordUppercaseChecker = false;
      this.passwordWalidationChecker++;
    }
    // tslint:disable-next-line: no-string-literal
    if (this.regisrtrationForm.controls['userPassword'].value.match(this.regExpPassNumber)) {
      this.passwordNumberChecker = true;
    } else {
      // tslint:disable-next-line: no-string-literal && tslint:disable-next-line: no-unused-expression
      // this.regisrtrationForm.controls['userPassword'].invalid === true;
      this.passwordNumberChecker = false;
      this.passwordWalidationChecker++;
    }
    // tslint:disable-next-line: no-string-literal
    if (this.regisrtrationForm.controls['userPassword'].value.match(this.regExpPassSpecSymbol)) {
      this.passwordSymbolChecker = true;
    } else {
      // tslint:disable-next-line: no-string-literal && tslint:disable-next-line: no-unused-expression
      // this.regisrtrationForm.controls['userPassword'].invalid === true;
      this.passwordSymbolChecker = false;
      this.passwordWalidationChecker++;
    }
    // tslint:disable-next-line: no-string-literal
    if (this.regisrtrationForm.controls['userPassword'].value.match(this.regExpPassSpace)) {
      this.passwordSpaceChecker = false;
      this.passwordWalidationChecker++;
      // tslint:disable-next-line: no-unused-expression && tslint:disable-next-line: no-string-literal
    } else {
      this.passwordSpaceChecker = true;
    }
    if (this.passwordWalidationChecker > 0) {
      // tslint:disable-next-line: no-string-literal
      this.regisrtrationForm.controls['userPassword'].setValue('');
      // tslint:disable-next-line: no-string-literal && tslint:disable-next-line: no-unused-expression
      this.regisrtrationForm.controls['userPassword'].markAsTouched;
    }
  }

    addNewUser(): void {
      // tslint:disable-next-line: forin
      for (const key in this.regisrtrationForm.value) {
        this.userNew[key] = this.regisrtrationForm.value[key];
      }
      this.userNew.isLogin = false;
      this.stormNewsService.newUser = Object.assign(this.userNew, );
      this.stormNewsService.postNewUser();
      this.regisrtrationForm.reset();
      this.dialogRef.close(2);
  }
  confirmPassFunc() {
    // tslint:disable-next-line: no-string-literal
    if (this.regisrtrationForm.controls['userPass2'].value !== this.regisrtrationForm.controls['userPassword'].value) {
      // tslint:disable-next-line: no-string-literal
      this.regisrtrationForm.controls['userPass2'].setValue('');
      // tslint:disable-next-line: no-unused-expression && tslint:disable-next-line: no-string-literal
      this.regisrtrationForm.controls['userPass2'].markAsTouched;
    }
}
  checkLoginRepeat() {
    // tslint:disable-next-line: forin
    this.stormNewsService.getUserArr()
    .subscribe(
      (userarr) => {},
      (err) => {console.log(err); }
    );
    for (const key in this.stormNewsService.userArr) {
      // tslint:disable-next-line: no-string-literal
      if (this.stormNewsService.userArr[key].userLogin === this.regisrtrationForm.controls['userLogin'].value) {
        const dialogRef3 = this.dialog3.open(ModalLoginCheckComponent, {
          data: {
            choseTextInModalCheckComponent: 'This login has already exist!'
          }
        });
        dialogRef3.afterClosed().subscribe(result => {});
        // tslint:disable-next-line: no-string-literal
        this.regisrtrationForm.controls['userLogin'].setValue('');
      }
    }
  }
}

//   getUserArr(): void {
// this.stormNewsService.getUserArr()
// .subscribe(
//   (userArr) => {console.log(userArr);
//   },
//   (err) => {console.log(err);
//   });
//   }
// }

// getUserArr(): Observable<Array<Visitor>> {
//   return this.http.get<Array<Visitor>>(this.url);
// }

// async getIdNewUser(this.) {
//   const url = 'http://localhost:3000/userArr';
//   const req = new Request(url);
//   const response = await fetch(req);
//   const promiseResult = await response.json();
//   user.userId = promiseResult.length+1;
//   this.newUser = Object.assign(user, );
//   console.log(this.newUser, 'get');
//   this.http.post('http://localhost:3000/userArr', this.newUser).subscribe()
// }
