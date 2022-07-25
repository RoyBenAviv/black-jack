
const CARD_DECK: string[] = ["2C", "2D", "2H", "2S",
                            "3C", "3D", "3H", "3S",
                            "4C", "4D", "4H", "4S",
                            "5C", "5D", "5H", "5S",
                            "6C", "6D", "6H", "6S",
                            "7C", "7D", "7H", "7S",
                            "8C", "8D", "8H", "8S",
                            "9C", "9D", "9H", "9S",
                            "10C", "10D", "10H", "10S",
                            "JC", "JD", "JH", "JS",
                            "QC", "QD", "QH", "QS",
                            "KC", "KD", "KH", "KS",
                            "AC", "AD", "AH", "AS",  ]

const PLAYER: Player = {
    hand: [],
    sum: 0
}

const DEALER: Dealer = {
    hand: [],
    sum: 0,
}

const GAME = {
    cardFlipped: true,
    gameOver: false
}

init()
function init(): void {
    shuffleDeck()
    firstDeal()
    renderTable()
}

function dealOneCard(): string {
    const chosenCard = CARD_DECK.pop()
    
    return chosenCard!
}

function shuffleDeck(): void {
    CARD_DECK.sort(() => Math.random() - 0.5)
}

function firstDeal(): void {
    for(let i = 0; i < 2; i++) {
        DEALER.hand.push(dealOneCard())
        PLAYER.hand.push(dealOneCard())
    }
    calculateHands()
}

function calculateHands(): void {

    DEALER.sum = DEALER.hand.reduce((sum: number, card: string) => {
        if(GAME.cardFlipped) return checkCardWorth(DEALER.hand[0][0])
        sum += checkCardWorth(card[0])
        return sum
    }, 0)
        console.log("file: main.ts -> line 58 -> DEALER.sum=DEALER.hand.reduce -> DEALER", DEALER)

    PLAYER.sum = PLAYER.hand.reduce((sum: number, card: string) => {
         sum += checkCardWorth(card[0])
        return sum
    }, 0)
        console.log("file: main.ts -> line 63 -> PLAYER.sum=PLAYER.hand.reduce -> PLAYER", PLAYER)

    
    checkWinner()
}

function checkCardWorth(value: string) {
    let cardWorth = 0
    if(value === 'K' || value === 'Q' || value === 'J' || value === '1') cardWorth = 10
    else if(value === 'A') {
        cardWorth = GAME.cardFlipped ? 1 : 11 
    }
    else cardWorth = Number(value)

    return cardWorth
}

function onHit(): void {
    PLAYER.hand.push(dealOneCard())
    renderTable()
    calculateHands()
}

function onStand(): void {

    GAME.cardFlipped = false
    calculateHands()
    renderTable()
    while(DEALER.sum < 17) {
        DEALER.hand.push(dealOneCard())
        calculateHands()
        renderTable()
    }
    
}

function checkWinner(): void {
}