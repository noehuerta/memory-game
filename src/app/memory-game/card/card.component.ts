import {Component, Input, Output, EventEmitter} from '@angular/core'
import { Card } from '../memory-game.component'

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {

    @Input() id: number
    @Input() index: number
    @Output() flipCard? = new EventEmitter<Card>()

    constructor() {}

    cardSelected() {

        this.flipCard.emit({id: this.id, index: this.index})
    }

}