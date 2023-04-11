import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Starting with the player who drew the card, every player has to continually drink their drink. You can only stop when the person to their right has stopped drinking.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Women', description: 'All women drink.' },
    { title: 'Thumbmaster', description: 'When you put your thumb on the table everyone must follow and who ever is last must drink. You are the thumb master till someone else picks a five.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Heaven', description: 'The player who drew the card must point to the sky (at any chosen time before the next 7 is drawn). The last person who points to the sky must drink.' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Rhyme', description: 'The player who drew the card says a word, and you go around the circle rhyming with that word until someone messes up, and has to drink.' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
    { title: 'Question master', description: 'You become the question master, and if anybody answers a question asked by you (the player who drew the card), they have to drink. This applies to ANY question.' },
    { title: 'Kings Cup', description: 'the player who drew the card must pour some of their drink into the cup in the middle. The person to draw the last King has to drink whatever is in the cup in the middle.' }
  ];

  title: string = '';
  description: string = '';
  invitLink: string = window.location.href;
  @Input() card: string;

  ngOnChanges(): void {
    if(this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
