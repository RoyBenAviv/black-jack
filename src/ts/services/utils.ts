function drawCard(): string {
  const chosenCard: string | undefined = CARD_DECK.pop()

  return chosenCard!
}

function shuffleDeck(): void {
  CARD_DECK.sort(() => Math.random() - 0.5)
}

function filterAcesSum(hand) {
  return hand
    .filter((card: string) => card[0] !== 'A')
    .reduce((sum: number, card: string) => {
      sum += checkCardWorth(card[0])
      return sum
    }, 0)
}

function checkSplitBtn(player: Player) {
  return player.hand[0][0] === player.hand[1][0] && GAME.cardFlipped && GAME.firstDeal ? true : false
}

function displaySum() {
  if (!GAME.endOfGame.blackJack) return `${PLAYER.handSum}  ${(filterAcesSum(PLAYER.hand) < 10 && PLAYER.aceCount && GAME.cardFlipped) ? ' / ' + (PLAYER.handSum - 10) : ''}`
  else return '<img src="assets/images/21.webp" alt="21"/>'
}

function displaySplitSum(currHand: number) {
  if (!GAME.endOfGame.blackJack) {
    console.log(' filterAcesSum(PLAYER.split.splitedHands[currHand]', filterAcesSum(PLAYER.split.splitedHands[currHand]))
    return `${PLAYER.split.splitSum[currHand]} ${(filterAcesSum(PLAYER.split.splitedHands[currHand]) < 10 && PLAYER.split.aceCount[currHand] && GAME.cardFlipped) ? ' / ' + (PLAYER.split.splitSum[currHand] - 10) : ''}`
  } else return '<img src="assets/images/21.webp" alt="21"/>'
}
