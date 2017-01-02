import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  templateUrl: './chess.component.html',
  styles: [`
    .chessboard {
        width: 690px;
        height: 690px;
        margin: 20px;
        border: 25px solid #333;
    }
    .black {
        float: left;
        width: 80px;
        height: 80px;
        background-color: #999;
        font-size:50px;
        text-align:center;
        display: table-cell;
        vertical-align:middle;
    }
    .white {
        float: left;
        width: 80px;
        height: 80px;
        background-color: #fff;
        font-size:50px;
        text-align:center;
        display: table-cell;
        vertical-align:middle;
    }
    .cell:hover {
      cursor: pointer;
    }
  `]
})
export class ChessBoardComponent implements OnInit, OnDestroy {

  private timer: Observable<Number>;
  private seconds;
  private currentMove = { from: '', piece: '' };
  private lastRankClicked = 0;
  private lastFileClicked = '';

  constructor() {  }

  ngOnInit() {
    this.timer = Observable.timer(2000, 1000);
    this.timer.subscribe((t) => {
      this.seconds = t
    });
  }

  chessboardClicked(evt) {
    let target: any = event.target || event.srcElement || event.currentTarget;
    let [rank, file] = [target.classList[2], target.classList[3]];
    if(this.isValidClick(rank, file)) {
      console.log(`Click on ${this.lastFileClicked}${this.lastRankClicked}`);
    } else {
      console.log('Invalid click');
    }
  }

  isValidClick(rank:string, file:string): boolean {
    let validFile = false, validRank = false;
    let fileLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    let tempFile = file.charAt(file.length-1);
    if(fileLetters.indexOf(tempFile) !== -1) {
      validFile = true;
      this.lastFileClicked = tempFile;
    } else {
      this.lastFileClicked = '';
      return false;
    }

    let tempRank = Number(rank.charAt(rank.length-1));
    if(!Number.isNaN(tempRank) && tempRank >= 1 && tempRank <= 8) {
      validRank = true;
      this.lastRankClicked = tempRank;
    } else {
      this.lastRankClicked = 0;
      return false;
    }

    return validRank && validRank;
  }

  ngOnDestroy() {
    // Unsubscribe
    this.timer = null;
  }

}
