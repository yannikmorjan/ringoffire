import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrls: ['./dialog-edit-player.component.scss']
})
export class DialogEditPlayerComponent {

  allProfilePictures = ['default-m.png','female-1.png','man-suit.png','female-2.png','penguin.png','cat.jpg'];

  constructor(public dialogRef: MatDialogRef<DialogEditPlayerComponent>) { }


}
