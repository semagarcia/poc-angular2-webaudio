import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppComponent }   from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent }  from './../home/home.component';
import { CompAComponent }  from './../comp-a/comp-a.component';
import { CompBComponent }  from './../comp-b/comp-b.component';
import { ChessBoardComponent }  from './../chess/chess.component';
import { QuestionComponent }  from './../questions/question.component';
import { ThankComponent }  from './../thanks/thank.component';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    CompAComponent,
    CompBComponent,
    ChessBoardComponent,
    QuestionComponent,
    ThankComponent
  ],
  providers: [ ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
