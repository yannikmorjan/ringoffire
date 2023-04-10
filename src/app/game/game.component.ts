import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, setDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  game: Game;
  gameId: String;

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params: any) => {
      this.gameId = params.id
      const document = doc(this.firestore,`games/${this.gameId}`);
      docData(document).subscribe((data: any) => {
        this.game.currentPlayer = data.game.currentPlayer;
        this.game.playedCards = data.game.playedCards;
        this.game.stack = data.game.stack;
        this.game.players = data.game.players;
        this.game.player_images = data.game.player_images;
        this.game.pickCardAnimation = data.game.pickCardAnimation;
        this.game.currentCard = data.game.currentCard;
      })
    }) 
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if(this.game.stack.length == 0) {
      this.game.gameOver = true;
      this.saveGame();
    } else if(!this.game.pickCardAnimation && this.game.players.length > 0) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('default-m.png')
        this.saveGame();
      }
    });
  }

  saveGame() {
    const document = doc(this.firestore,`games/${this.gameId}`);
    return updateDoc(document, { game: this.game.toJson() });
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(DialogEditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if(change) {
        if(change == 'Delete') {
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        } else {
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  restartGame() {
    const prevPlayers = this.game.players;
    const prevPlayerImgs = this.game.player_images;
    this.game = new Game();
    this.game.players = prevPlayers;
    this.game.player_images = prevPlayerImgs;
    this.saveGame();
  }

}
