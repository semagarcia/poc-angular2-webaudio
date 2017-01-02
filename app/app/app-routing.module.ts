import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent }  from './../home/home.component';
import { CompAComponent }  from './../comp-a/comp-a.component';
import { CompBComponent }  from './../comp-b/comp-b.component';
import { ChessBoardComponent }  from './../chess/chess.component';
import { QuestionComponent }  from './../questions/question.component';
import { ThankComponent }  from './../thanks/thank.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'comp-left', component: CompAComponent },
      { path: 'comp-right', component: CompBComponent },
      { path: 'chessboard', component: ChessBoardComponent },
      { path: 'questions', component: QuestionComponent },
      { path: 'thanks', component: ThankComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
