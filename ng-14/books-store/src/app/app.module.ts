import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksComponent } from './books/books.component';
import { BooksListComponent } from './books-list/books-list.component';
import { NewListComponent } from './new-list/new-list.component';
import { AddListComponent } from './add-list/add-list.component';
import { DataService } from './services/data.service';
import { SharedService } from './services/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BooksListComponent,
    NewListComponent,
    AddListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
