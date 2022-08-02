function drawCard(): string {

    const chosenCard: string | undefined = CARD_DECK.pop()
    
    return chosenCard!
}

function shuffleDeck(): void {
    CARD_DECK.sort(() => Math.random() - 0.5)
}

function filterAcesSum(member: Player | Dealer) {
    return member.hand.filter((card: string) => card[0] !== 'A').reduce((sum: number, card: string) => {
        sum += checkCardWorth(card[0], DEALER)
        return sum
    }, 0)
}

function checkSplitBtn(player: Player) {
    return player.hand[0][0] === player.hand[1][0] && GAME.cardFlipped && GAME.firstDeal ? true : false
}

function displaySum() {
   if (!GAME.endOfGame.blackJack) return `${PLAYER.handSum}  ${filterAcesSum(PLAYER) < 10 && PLAYER.aceCount ? ' / ' + (PLAYER.handSum - 10) : ''}`
   else return '<img src="assets/images/21.webp" alt="21"/>'
}