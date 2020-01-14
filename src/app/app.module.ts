import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';

import { AppComponent } from './app.component';
import { EnterComponent } from './components/enter/enter.component';
import { HeaderComponent } from './components/header/header.component';
import { MainTextComponent } from './components/main-text/main-text.component';
import { MaterialAppModule } from './ngmaterial.module';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalSigninComponent } from './components/modal-signin/modal-signin.component';
import { ModalRegistrationComponent } from './components/modal-registration/modal-registration.component';
// tslint:disable-next-line: max-line-length
import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatListModule, MatDialogRef, MAT_DIALOG_DATA, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { ModalLoginCheckComponent } from './components/modal-login-check/modal-login-check.component';
import { NewsComponent } from './components/news/news.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { NewsItemComponent } from './components/news/news-item/news-item.component';
import { ItemDetailsComponent } from './components/news/news-item/item-details/item-details.component';
import { NewsRouterComponent } from './components/news/news-router/news-router.component';
import { SafePipe } from './components/news/news-item/item-details/item-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    SafePipe,
    AppComponent,
    EnterComponent,
    HeaderComponent,
    MainTextComponent,
    ModalSigninComponent,
    ModalRegistrationComponent,
    ModalLoginCheckComponent,
    NewsComponent,
    PageNotFoundComponent,
    AboutComponent,
    NewsItemComponent,
    ItemDetailsComponent,
    NewsRouterComponent,
    ProfileComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    MaterialAppModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatListModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
{ provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalSigninComponent, ModalRegistrationComponent, ModalLoginCheckComponent]
})
export class AppModule { }
