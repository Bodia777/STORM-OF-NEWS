import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { StormNewsService } from 'src/app/services/storm-news.service';

const material = [
    MatDialogModule
];

@NgModule({
imports: [MatButtonModule, MatDialogModule],
exports: [MatButtonModule],
providers: [
    StormNewsService
]
})
export class MaterialAppModule { }
