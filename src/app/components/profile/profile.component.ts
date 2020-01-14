import { Component, OnInit, DoCheck, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { StormNewsService } from 'src/app/services/storm-news.service';
import { ModalRegistrationComponent } from '../modal-registration/modal-registration.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, DoCheck, OnDestroy {
  public nameSurname: string;
  profileNewsFormGroup: FormGroup;
  maxDate = new Date();
  public url: any;
  public uploadFile: File = null;
  private myLocalStorage = window.localStorage;
@ViewChild('divForPhoto', {static: false}) changePhoto: ElementRef;

  // tslint:disable-next-line: max-line-length
  constructor(public stormNewsService: StormNewsService, public dialog2: MatDialog, private fb: FormBuilder, private renderer: Renderer2, private router: Router) { }

  ngOnInit() {
    this.profileNewsFormGroup = this.fb.group({
      typeOfNews: ['top-headlines?', Validators.required],
      controlWord: [''],
      dateFrom: [''],
      dateTo: [''],
      countrySelect: [''],
      categorySelect: [''],
      languageSelect: [''],
      sortBy: ['']
    });
    if (this.stormNewsService.currentUser[0].firstLogin === false) {
    this.getItemFromLocalStorage('typeOfNews');
    this.getItemFromLocalStorage('controlWord');
    // this.getItemFromLocalStorage('dateFrom');
    // this.getItemFromLocalStorage('dateTo');
    this.getItemFromLocalStorage('countrySelect');
    this.getItemFromLocalStorage('categorySelect');
    this.getItemFromLocalStorage('languageSelect');
    this.getItemFromLocalStorage('sortBy');
  }
}
  ngDoCheck() {
    this.stormNewsService.newsSource.typeOfNews = this.profileNewsFormGroup.controls.typeOfNews.value;
    if (this.profileNewsFormGroup.controls.typeOfNews.value === 'top-headlines?') {
      this.stormNewsService.typeOfNewsChecker = true;
    } else {
      this.stormNewsService.typeOfNewsChecker = false;
    }
    // tslint:disable-next-line: max-line-length
    let dateFrom = this.profileNewsFormGroup.controls.dateFrom.value;
    let dateTo = this.profileNewsFormGroup.controls.dateTo.value;
    // this.stormNewsService.newsSource.dateFrom =
    if (dateFrom !== '') {
      // tslint:disable-next-line: max-line-length
      this.stormNewsService.newsSource.dateFrom = (dateFrom.getYear() - 100 + 2000) + '-' + (dateFrom.getMonth() + 1) + '-' + (dateFrom.getDate());
    } else {
      dateFrom = new Date();
      // tslint:disable-next-line: max-line-length
      this.stormNewsService.newsSource.dateFrom = (dateFrom.getYear() - 100 + 2000) + '-' + (dateFrom.getMonth() + 1) + '-' + (dateFrom.getDate());
    }
    if (dateTo > dateFrom) {
      dateTo = dateFrom;
    }
    if (dateTo !== '') {
      // tslint:disable-next-line: max-line-length
      this.stormNewsService.newsSource.dateTo = (dateTo.getYear() - 100 + 2000) + '-' + (dateTo.getMonth() + 1) + '-' + (dateTo.getDate());
    } else {
      dateTo = new Date();
      // tslint:disable-next-line: max-line-length
      this.stormNewsService.newsSource.dateTo = (dateTo.getYear() - 100 + 2000) + '-' + (dateTo.getMonth() + 1) + '-' + (dateTo.getDate());
    }
    if (!this.profileNewsFormGroup.controls.countrySelect.value) {
      this.stormNewsService.newsSource.countrySelect = 'us';
    } else {this.stormNewsService.newsSource.countrySelect = this.profileNewsFormGroup.controls.countrySelect.value;  }
    if (!this.profileNewsFormGroup.controls.categorySelect.value) {
      this.stormNewsService.newsSource.categorySelect = ' ';
    } else {this.stormNewsService.newsSource.categorySelect = this.profileNewsFormGroup.controls.categorySelect.value;  }
    if (!this.profileNewsFormGroup.controls.controlWord.value) {
      this.stormNewsService.newsSource.controlWord = ' ';
    } else {this.stormNewsService.newsSource.controlWord = this.profileNewsFormGroup.controls.controlWord.value; }
    if (!this.profileNewsFormGroup.controls.languageSelect.value) {
      this.stormNewsService.newsSource.languageSelect = 'en';
    } else {
      this.stormNewsService.newsSource.languageSelect = this.profileNewsFormGroup.controls.languageSelect.value;
    }
    if (!this.profileNewsFormGroup.controls.sortBy.value) {
      this.stormNewsService.newsSource.sortBy = 'publishedAt';
    } else {
      this.stormNewsService.newsSource.sortBy = this.profileNewsFormGroup.controls.sortBy.value;
    }
  }

  ngOnDestroy() {
    this.setItemToLocalStorage('typeOfNews');
    this.setItemToLocalStorage('controlWord');
    // this.setItemToLocalStorage('dateFrom');
    // this.setItemToLocalStorage('dateTo');
    this.setItemToLocalStorage('countrySelect');
    this.setItemToLocalStorage('categorySelect');
    this.setItemToLocalStorage('languageSelect');
    this.setItemToLocalStorage('sortBy');
  }

  public changeProfile(): void {
this.stormNewsService.changeProfileChecker = true;
this.openDialog2();
  }

 private openDialog2(): void {
    const dialogRef2 = this.dialog2.open(ModalRegistrationComponent);
    dialogRef2.afterClosed().subscribe(result => { });
  }

  public addPhoto(event): void {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    this.uploadFile = <File> event.target.files[0];
    this.url = URL.createObjectURL(event.target.files[0]);
    this.renderer.setStyle(this.changePhoto.nativeElement, 'backgroundImage', `url(${this.url})`);
    this.renderer.setStyle(this.changePhoto.nativeElement, 'backgroundSize', '100% 100%');
    // const fd = new FormData();
    // fd.append('image', this.uploadFile, this.uploadFile.name);
    // this.stormNewsService.currentUser[0].urlPhoto = fd;
    // this.stormNewsService.putChangesUserArr();
}
deleteProfile() {
  this.stormNewsService.deleteUser();
  this.router.navigate(['/']);
  this.stormNewsService.hello = '';
  this.stormNewsService.logIn = 'Login';
}
getItemFromLocalStorage(control) {
  if ((this.myLocalStorage.getItem(control)) && !(this.stormNewsService.currentUser[0].firstLogin)) {
    this.profileNewsFormGroup.controls[control].patchValue(this.myLocalStorage.getItem(control));
    this.stormNewsService.newsSource[control] = this.myLocalStorage.getItem(control);
  }
}
setItemToLocalStorage(control) {
  this.myLocalStorage.setItem(control, `${this.profileNewsFormGroup.controls[control].value}`);
}
}
