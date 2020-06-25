import { Component, OnInit } from '@angular/core'
import { TweenMax, gsap} from 'gsap'

export interface Card {
	id: number
	index: number
}

@Component({
  selector: 'memory-game-component',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})

export class MemoryGameComponent implements OnInit{

	constructor() { }
	
	cardHeight = 200
	cards = null
	cardWidth = 200
	dupplicateCards = null
	firstSelection = null
	flipTime = .5
	isShufflingCards = true
	matchedID = null
	numberOfCards = 12
	numColumns = 6
	secondSelection = null
	spacingRight = 10
	spacingTop = 10
	tl = gsap.timeline()
	totalCards = null

	ngOnInit() {
		this.startGame()
	}

	addAnimation(): void {

		const gameWrapper = document.querySelectorAll('.gameWrapper')
		gsap.set(gameWrapper[0], {perspective:800})

		gsap.delayedCall(.01, () => {

			for(let i = 0; i < gameWrapper[0].children.length; i++) {
				const card = gameWrapper[0].querySelectorAll('.card')
				const front = gameWrapper[0].children[i].querySelectorAll('.front')
				const back = gameWrapper[0].children[i].querySelectorAll('.back')
				gsap.set(gameWrapper[0].children[i], {transformStyle:'preserve-3d'})
				gsap.set(back, {rotationY:-180, force3D: true, perspective: 500})
				gsap.set([front, back], {backfaceVisibility:'hidden', transformStyle:'preserve-3d', transformPerspective: 300, force3D: true})
			}
			this.tl.from('.card', {duration: this.flipTime, rotationY: '-180', stagger: 0.1, force3D: true})
			this.tl.to('.card', {duration: this.flipTime, rotationY: -180, stagger: 0.1, force3D: true, delay: .75})
		})
	}

	checkSelectedCards(): void {

		if (this.totalCards[this.secondSelection].id !== this.totalCards[this.firstSelection].id){
			TweenMax.to([`#card${this.firstSelection}`, `#card${this.secondSelection}`], 1, {rotationY: -180, delay: 1, stagger: 0.25})
		}
		this.firstSelection = null
		this.secondSelection = null
	}

	flipCard(card: Card): void {
		if (this.firstSelection != null && this.secondSelection == null){
			this.secondSelection = card.index
			this.checkSelectedCards()
		} else if (this.firstSelection == null){
			this.firstSelection = card.index
		}

		const gameWrapper = document.querySelectorAll('.gameWrapper')
		const currentCard = gameWrapper[0].children[card.index]
		TweenMax.to(currentCard , 1.2, {rotationY: 0, ease: 'Back.easeOut'})
	}

	getCardStyle(index: number): Partial<CSSStyleDeclaration> {

		return {
			width: `${this.cardWidth}px`,
			height: `${this.cardHeight}px`,
			position: 'absolute',
			top: `${ Math.floor(index / this.numColumns) * (Math.floor(this.cardHeight) + this.spacingTop) }px`,
			left: `${ (index % this.numColumns) * (Math.floor(this.cardWidth) + this.spacingRight) }px`
		}
	}

	getWrapperStyle(): Partial<CSSStyleDeclaration> {

		return {
			width: `${ ((Math.floor(this.cardWidth) + this.spacingRight) * this.numColumns) - this.spacingRight }px`,
			height: `${ ((this.totalCards.length / this.numColumns) * (Math.floor(this.cardHeight) + this.spacingTop)) - this.spacingTop }px`,
		}
	}
	
	startGame(): void {

		this.cards = this.populateCards(this.numberOfCards)

		if (this.cards) {
			this.dupplicateCards = this.cards
			this.totalCards = this.shuffleCards(this.cards.concat(this.dupplicateCards))
			this.addAnimation()
		}
	}

	private populateCards(totalCards: number): Card[] | undefined {

		if(totalCards % 2 !== 0) {
			console.error('Total number of cards is not an even number')
			return
		}

		let arr = []
		for(let i = 0; i < totalCards; i++) {
			arr.push({
				id: i,
				style: this.getCardStyle(i)
			})
		}

		return arr
	}

	private shuffleCards(array: Card[]): Card[] {

		if(!this.isShufflingCards) {
			return array
		}

		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			const temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}
		
		return array
	}
}