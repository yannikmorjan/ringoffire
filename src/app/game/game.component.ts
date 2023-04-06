import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, setDoc, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params: any) => {
      const document = doc(this.firestore,`games/${params.id}`);
      docData(document).subscribe((data: any) => {
        this.game.currentPlayer = data.game.currentPlayer;
        this.game.playedCards = data.game.playedCards;
        this.game.stack = data.game.stack;
        this.game.players = data.game.players;
      })
    })
    
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if(!this.pickCardAnimation && this.game.players.length > 0) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

}
