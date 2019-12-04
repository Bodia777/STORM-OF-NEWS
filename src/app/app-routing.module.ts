import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterComponent } from './components/enter/enter.component';
import { NewsComponent } from './components/news/news.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { ItemDetailsComponent } from './components/news/news-item/item-details/item-details.component';
import { NewsRouterComponent } from './components/news/news-router/news-router.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'registration', pathMatch: 'full' },
  { path: 'registration', component: EnterComponent },
  { path: 'news', component: NewsRouterComponent,
   canActivate: [AuthGuard],
  children: [
    { path: '', component: NewsComponent },
    { path: 'details/:id', component: ItemDetailsComponent}
  ]
},
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
