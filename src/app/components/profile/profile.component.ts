import { Component, OnInit, DoCheck, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { StormNewsService } from 'src/app/services/storm-news.service';
import { ModalRegistrationComponent } from '../modal-registration/modal-registration.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, DoCheck {
  public nameSurname: string;
  profileNewsFormGroup: FormGroup;
  maxDate = new Date();
  public url: any;
  public uploadFile: File = null;
@ViewChild('divForPhoto', {static: false}) changePhoto: ElementRef;

  // tslint:disable-next-line: max-line-length
  constructor(public stormNewsService: StormNewsService, public dialog2: MatDialog, private fb: FormBuilder, http: HttpClient, private renderer: Renderer2) { }

  ngOnInit() {
    this.profileNewsFormGroup = this.fb.group({
      typeOfNews: ['top-headlines?', Validators.required],
      controlWord: [''],
      dateFrom: [''],
      dateTo: [''],
      countrySelect: [''],
      categorySelect: [''],
    });
  }
  ngDoCheck() {
    // console.log(this.profileNewsFormGroup.value);
    this.stormNewsService.newsSource = this.profileNewsFormGroup.value;
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
}
