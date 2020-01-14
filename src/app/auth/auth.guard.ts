import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StormNewsService } from '../services/storm-news.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalLoginCheckComponent } from '../components/modal-login-check/modal-login-check.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor( private stormNewsService: StormNewsService, public dialog: MatDialog,
             // tslint:disable-next-line: max-line-length
             public dialogRef: MatDialogRef < ModalLoginCheckComponent >,  @Inject(MAT_DIALOG_DATA) public data: any, public route: ActivatedRoute) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.stormNewsService.currentUser.length) {
        return true;
} else {
  this.openDialog();
  return false;
}

}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalLoginCheckComponent, {
      data: {
        choseTextInModalCheckComponent: 'You have to sign in or to registrate yourself'
      }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
