function dealOneCard(): string {
    const chosenCard: string | undefined = CARD_DECK.pop()
    
    return chosenCard!
}

function shuffleDeck(): void {
    CARD_DECK.sort(() => Math.random() - 0.5)
}

function filterAcesSum(player: Player) {
    return player.hand.filter((card: string) => card[0] !== 'A').reduce((sum: number, card: string) => {
        sum += checkCardWorth(card[0], DEALER)
        return sum
    }, 0)
}

function checkSplitBtn(player: Player) {
    return player.hand[0][0] === player.hand[1][0] ? true : false
}