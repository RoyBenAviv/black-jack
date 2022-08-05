function init(): void {
  hideMenu()
  renderGameTokens()
}

function startGame(): void {
  hideGameTokens()
  shuffleDeck()
  firstDeal()
  renderTable()
  renderCards()
}

function firstDeal(): void {
  for (let i = 0; i < 2; i++) {
    DEALER.hand.push(drawCard())
    PLAYER.hand.push(drawCard())
  }
  calculateHands()
}

function onSetSplitMode() {
  GAME.splitMode = true
  PLAYER.split.splitedHands = [
    [PLAYER.hand.shift(), drawCard()],
    [PLAYER.hand.shift(), drawCard()],
  ]
  calculateHands()
  renderTable()
}

function calculateHands(): void {
  DEALER.handSum = DEALER.hand.reduce((sum: number, card: string) => {
    if (GAME.cardFlipped) return checkCardWorth(DEALER.hand[0][0])
    sum += checkCardWorth(card[0])
    return sum
  }, 0)
  reSumAces(DEALER)
  if (GAME.splitMode) {
    console.log('hi')
    for (let i = 0; i < 2; i++) {
      PLAYER.split.splitSum[i] = PLAYER.split.splitedHands[i].reduce((sum: number, card: string) => {
        sum += checkCardWorth(card[0])
        return sum
      }, 0)
      console.log('file: index.ts -> line 48 -> PLAYER.split.splitSum[i]=PLAYER.hand.reduce -> PLAYER.split.splitSum[i]', PLAYER.split.splitSum[i])
      reSumAces(PLAYER)
    }
  } else {
    console.log('file: main.ts -> line 37 -> DEALER.handSum=DEALER.hand.reduce -> DEALER.handSum', DEALER.handSum)
    PLAYER.handSum = PLAYER.hand.reduce((sum: number, card: string) => {
      sum += checkCardWorth(card[0])
      return sum
    }, 0)
    reSumAces(PLAYER)
  }
}

function checkCardWorth(value: string) {
  let cardWorth = 0
  if (value === 'K' || value === 'Q' || value === 'J' || value === '1') cardWorth = 10
  else if (value === 'A') {
    cardWorth = 11
  } else cardWorth = Number(value)
  return cardWorth
}

function reSumAces(member: any) {
  if (GAME.splitMode) {
    for (let i = 0; i < 2; i++) {
      var j = 0
      console.log('i', i)
      // console.log('member',member.split.aceCount[0]);
      PLAYER.split.aceCount[i] = PLAYER.split.splitedHands[i].filter((card) => {
        console.log('card', card)
        console.log('PLAYER.split.splitedHands[]', PLAYER.split.splitedHands[i])
        return card[0] === 'A'
      }).length
      console.log('PLAYER.split.aceCount', PLAYER.split.aceCount)
      console.log('file: index.ts -> line 75 -> reSumAces -> PLAYER.split.splitedHands', PLAYER.split.splitedHands)
      console.log('PLAYER.split.aceCount[i]', PLAYER.split.aceCount[i])
      console.log('file: index.ts -> line 75 -> reSumAces -> PLAYER.split.aceCount[i]', PLAYER.split.aceCount[i])
      if (!PLAYER.split.aceCount[i]) return
      while (j <= PLAYER.split.aceCount[i]) {
        if (PLAYER.split.splitSum[i] > 21) PLAYER.split.splitSum[i] -= 10
        j++
      }
    }
  } else {
    var i = 0
    member.aceCount = member.hand.filter((card: string) => card[0] === 'A').length
    if (!member.aceCount) return
    while (i <= member.aceCount) {
      if (member.handSum > 21) member.handSum -= 10
      i++
    }
  }
}

function onHit(): void {
  GAME.firstDeal = false
  if (GAME.splitMode) {
    PLAYER.split.splitedHands[PLAYER.split.currentHand].push(drawCard())
    new Audio('assets/audio/card-draw.mp3').play()
    calculateHands()
    renderTable()
  } else {
    PLAYER.hand.push(drawCard())
    new Audio('assets/audio/card-draw.mp3').play()
    calculateHands()
    renderTable()

    const winner = checkWinner()
    if (winner) {
      endGame(winner)
    }
  }
}

function onStand(): void {
  if (GAME.splitMode) {
    console.log('PLAYER.split.currentHand', PLAYER.split.currentHand)
    PLAYER.split.currentHand++
    renderTable()
    if (PLAYER.split.currentHand === 2) {
      fullStandAction()
    }
  } else {
    fullStandAction()
    if (DEALER.handSum >= 17 || GAME.cardFlipped) {
      const winner = checkWinner()
      if (winner) {
        endGame(winner)
      }
    }
  }
}

function fullStandAction() {
  GAME.cardFlipped = false
  calculateHands()
  renderTable()
  while (DEALER.handSum < 17) {
    DEALER.hand.push(drawCard())
    calculateHands()
    renderTable()
  }
}

function checkWinner(): 'player' | 'dealer' | 'push' {
  if (GAME.cardFlipped) {
    if (PLAYER.handSum > 21) return 'dealer'
    if (PLAYER.handSum === 21 && PLAYER.aceCount === 1 && !DEALER.aceCount) {
      GAME.endOfGame.blackJack = true
      return 'player'
    } else if (DEALER.handSum > 21) return 'player'
  } else {
    console.log('hi')

    if (DEALER.handSum <= 21 && DEALER.handSum > PLAYER.handSum) return 'dealer'
    if (DEALER.handSum > 21) return 'player'
    if (PLAYER.handSum > DEALER.handSum && PLAYER.handSum < 21) return 'player'
    if (DEALER.handSum >= 17 && DEALER.handSum === PLAYER.handSum) return 'push'
  }

  // if (GAME.cardFlipped && PLAYER.handSum > 21) return 'dealer'
  // if (!GAME.cardFlipped && DEALER.sum <= 21 && DEALER.sum > PLAYER.handSum) return 'dealer'

  // if (PLAYER.handSum === 21 && PLAYER.aceCount === 1) {
  //   GAME.endOfGame.blackJack = true
  //   return 'player'
  // } else if (DEALER.sum > 21) return 'player'

  renderTable()
}

function endGame(winner: 'player' | 'push' | 'dealer') {
  console.log('file: main.ts -> line 118 -> endGame -> winner', winner)
  GAME.endOfGame.winner = winner
  // if(GAME.endOfGame.winner === "player" && GAME.endOfGame.blackJack) PLAYER.totalBalance += PLAYER.currentBet * 2.5
  // else if(GAME.endOfGame.winner === "player") PLAYER.totalBalance += PLAYER.currentBet * 2
  // else if(GAME.endOfGame.winner === "push") PLAYER.totalBalance += PLAYER.currentBet
  renderBalance(PLAYER)
  renderEndGame()
}
