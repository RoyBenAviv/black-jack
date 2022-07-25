function dealOneCard(): string {
    const chosenCard: string | undefined = CARD_DECK.pop()
    
    return chosenCard!
}

function shuffleDeck(): void {
    CARD_DECK.sort(() => Math.random() - 0.5)
}

function filterAcesSum() {
    return PLAYER.hand.filter((card: string) => card[0] !== 'A').reduce((sum: number, card: string) => {
        sum += checkCardWorth(card[0], DEALER)
        return sum
    }, 0)
}
