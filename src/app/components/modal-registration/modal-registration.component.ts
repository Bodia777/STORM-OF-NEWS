import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { StormNewsService } from 'src/app/services/storm-news.service';
import { ModalLoginCheckComponent } from '../modal-login-check/modal-login-check.component';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-modal-registration',
  templateUrl: './modal-registration.component.html',
  styleUrls: ['./modal-registration.component.scss']
})

export class ModalRegistrationComponent implements OnInit, OnDestroy {
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
  private unsubscribed = new Subject();

  // private unsubscribed = new Subject();

  constructor(
    public dialog3: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef < ModalRegistrationComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stormNewsService: StormNewsService,
  ) {}

  ngOnInit(): void {
    this.createregistrationForm();
  }
  ngOnDestroy(): void {
    this.unsubscribed.next();
    this.unsubscribed.complete();
  }

  private createregistrationForm(): void {
    if (this.stormNewsService.changeProfileChecker === false) {
    this.regisrtrationForm = this.fb.group({
      userName: [],
      userSurname: [],
      userLogin: [],
      userMail: [],
      userGender: ['', Validators.required],
      userPhone: [],
      userPassword: [],
      userPass2: [],
      firstLogin: true,
      isLogin: false,
    });
  } else {
    this.regisrtrationForm = this.fb.group({
      userName: [this.stormNewsService.currentUser[0].userName],
      userSurname: [this.stormNewsService.currentUser[0].userSurname],
      userLogin: [this.stormNewsService.currentUser[0].userLogin],
      userMail: [this.stormNewsService.currentUser[0].userMail],
      userGender: [this.stormNewsService.currentUser[0].userGender, Validators.required],
      userPhone: [this.stormNewsService.currentUser[0].userPhone],
      userPassword: [this.stormNewsService.currentUser[0].userPassword],
      userPass2: [this.stormNewsService.currentUser[0].userPass2],
      firstLogin: false,
      id: [this.stormNewsService.currentUser[0].id],
      isLogin: true,
    });
  }
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
      if (this.stormNewsService.changeProfileChecker === false) {
      // tslint:disable-next-line: forin
      for (const key in this.regisrtrationForm.value) {
        this.userNew[key] = this.regisrtrationForm.value[key];
      }
      this.userNew.isLogin = false;
      this.stormNewsService.newUser = Object.assign(this.userNew, );
      this.stormNewsService.postNewUser();
      this.regisrtrationForm.reset();
      this.dialogRef.close(2);
    // tslint:disable-next-line: max-line-length && tslint:disable-next-line: no-string-literal
    } else if (this.stormNewsService.changeProfileChecker === true && this.stormNewsService.currentUser[0].userLogin === this.regisrtrationForm.controls['userLogin'].value) {
      // tslint:disable-next-line: forin
      this.stormNewsService.currentUser[0] = Object.assign(this.regisrtrationForm.value, );
      this.stormNewsService.putChangesUserArr();
      this.dialogRef.close();
      this.stormNewsService.changeProfileChecker = false;
    // tslint:disable-next-line: max-line-length && tslint:disable-next-line: no-string-literal
    } else if (this.stormNewsService.changeProfileChecker === true && this.stormNewsService.currentUser[0].userLogin !== this.regisrtrationForm.controls['userLogin'].value) {
      this.stormNewsService.getUserArr()
      .pipe(takeUntil(this.unsubscribed))
      .subscribe(
        (userarr) => {
          this.stormNewsService.userArr = userarr.slice();
          for (const key in this.stormNewsService.userArr) {
            // tslint:disable-next-line: no-string-literal
            if (this.stormNewsService.userArr[key].userLogin === this.regisrtrationForm.controls['userLogin'].value) {
              // tslint:disable-next-line: no-string-literal
              this.regisrtrationForm.controls['userLogin'].setValue(this.stormNewsService.currentUser[0].userLogin);
              // tslint:disable-next-line: no-unused-expression
              this.stormNewsService.changeProfileChecker = false;
              console.log(this.stormNewsService.currentUser[0].userLogin);
              break;
            } else {
              // tslint:disable-next-line: forin && tslint:disable-next-line: no-shadowed-variable
                this.stormNewsService.currentUser[0] = Object.assign(this.regisrtrationForm.value, );
                this.stormNewsService.putChangesUserArr();
                // tslint:disable-next-line: no-unused-expression
                this.stormNewsService.changeProfileChecker = false;
                this.dialogRef.close();
                }
            }
          },
        (err) => {console.log('userarr doesn\'t response'); }
      );
    }
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
    if (this.stormNewsService.changeProfileChecker === false) {
      this.loginCheckFunction();
        } else {
          // tslint:disable-next-line: no-string-literal
      if (this.stormNewsService.currentUser[0].userLogin === this.regisrtrationForm.controls['userLogin'].value) {
    } else {
    this.loginCheckFunction();
        }
  }
}

cancel() {
  this.stormNewsService.changeProfileChecker = false;
}

loginCheckFunction(): void {
  this.stormNewsService.getUserArr()
  .pipe(takeUntil(this.unsubscribed))
  .subscribe(
    (userarr) => {
      this.stormNewsService.userArr = userarr.slice();
      for (const key in this.stormNewsService.userArr) {
        // tslint:disable-next-line: no-string-literal
        if (this.stormNewsService.userArr[key].userLogin === this.regisrtrationForm.controls['userLogin'].value) {
          this.modalChangeTextFunction();
           // tslint:disable-next-line: no-string-literal
          if (this.stormNewsService.changeProfileChecker === false) {
          this.regisrtrationForm.controls.userLogin.setValue('');
          } else {
            // tslint:disable-next-line: no-string-literal
            this.regisrtrationForm.controls['userLogin'].setValue(this.stormNewsService.currentUser[0].userLogin);
          }
          } else { }
        }
  },
    (err) => {console.log('userarr doesn\'t response'); }
  );
}
modalChangeTextFunction(): void {
  if ( this.stormNewsService.changeProfileChecker === false ) {
    const dialogRef3 = this.dialog3.open(ModalLoginCheckComponent, {
      data: {
        choseTextInModalCheckComponent: 'This login has already exist!'
      }
    });
    dialogRef3.afterClosed().subscribe(result => {});
     } else {
    const dialogRef3 = this.dialog3.open(ModalLoginCheckComponent, {
        data: {
         choseTextInModalCheckComponent: 'This login has already exist! Login hasn\'t changed'
      }
    });
    dialogRef3.afterClosed().subscribe(result => {});
}
}
}
