

async function renderTable() {
  let playerHTML: string = ''
  if (GAME.splitMode) {
    for (let i = 0; i < 2; i++) {
      const hands = PLAYER.split.splitedHands[i]
      playerHTML += '<div class="hands">'
      playerHTML += '<div class="cards">'
      for (let j = 0; j < hands.length; j++) {
        playerHTML += `<img class='card' src='assets/images/cards/${hands[j]}.svg'>`
      }
      playerHTML += '</div>'
      playerHTML += `
      <div class="${i === PLAYER.split.currentHand ? 'actions' : 'hide'}">
      <button style="display: ${PLAYER.handSum >= 21 ? 'none' : 'block'}" onclick="onHit()">HIT</button> <button onclick="onStand()">STAND</button> 
      </div>
      <span class="">${displaySplitSum(i)}</span>
      `
      playerHTML += '</div>'
    }
  } else {
    playerHTML += '<div class="hands">'
    playerHTML += '<div class="cards">'

    if (PLAYER.hand.length > 2 || !GAME.cardFlipped) {
      for (let i = 0; i < PLAYER.hand.length; i++) {
        playerHTML += `<img class='card' src='assets/images/cards/${PLAYER.hand[i]}.svg'>`
      }
      playerHTML += '</div>'
      playerHTML += `<div class="${GAME.cardFlipped ? 'actions' : 'hide'}">
            <button style="display: ${PLAYER.handSum >= 21 ? 'none' : 'block'}" onclick="onHit()">HIT</button> 
            <button onclick="onStand()">STAND</button> 
             <button style="display: ${checkSplitBtn(PLAYER) ? 'block' : 'none'}" onclick="onSetSplitMode()">SPLIT</button>
            </div>
            <span class="player sum">${displaySum()}</span>
            </div>`
    }
  }
  let dealerHTML = ''
  for (let i = 0; i < DEALER.hand.length; i++) {
    if (i === 1 && GAME.cardFlipped)
      dealerHTML += `<div class="back-container">
            
            <img class='card' src='assets/images/cards/${DEALER.hand[i]}.svg'>
                                                 <img class='back' src='assets/images/cards/RED_BACK.svg'>
                                     </div>`
    else dealerHTML += `<img class='card' src='assets/images/cards/${DEALER.hand[i]}.svg'>`
  }
  dealerHTML += `<span class="dealer sum">${DEALER.handSum}</span>`
  let elPlayer: Element | null = document.querySelector('.player-container')
  let elDealer: Element | null = document.querySelector('.dealer-container')
  elPlayer!.innerHTML = playerHTML
  elDealer!.innerHTML = dealerHTML
}

function renderCards() {
  let elPlayer: Element | null = document.querySelector('.cards')
  ;(function () {
    let i = 0
    const interval = setInterval(function () {
      elPlayer!.innerHTML += `<img class='card' src='assets/images/cards/${PLAYER.hand[i]}.svg'>`
      new Audio('assets/audio/card-draw.mp3').play()
      i += 1
      if (i >= PLAYER.hand.length) {
        clearInterval(interval)
        elPlayer!.innerHTML += `<div class="${GAME.cardFlipped ? 'actions' : 'hide'}">
              <button style="display: ${PLAYER.handSum >= 21 ? 'none' : 'block'}" onclick="onHit()">HIT</button> 
              <button onclick="onStand()">STAND</button> 
               <button style="display: ${checkSplitBtn(PLAYER) ? 'block' : 'none'}" onclick="onSetSplitMode()">SPLIT</button>
              </div>
              <span class="player sum">${displaySum()}</span>
              </div>`
      }
    }, 600)
  })()
}

function hideMenu() {
  const elMenu: HTMLElement = document.querySelector('.menu')
  elMenu.style.display = 'none'
}

function renderGameTokens() {
  const elGameTokens: HTMLElement = document.querySelector('.game-tokens')
  elGameTokens.style.display = 'flex'
}

function hideGameTokens() {
  const elGameTokens: HTMLElement = document.querySelector('.game-tokens')
  elGameTokens.style.display = 'none'
}

function renderBalance(player: Player) {
  const totalBalanceEl = document.querySelector('.total span')
  const currentBetEl = document.querySelector('.bet span')
  totalBalanceEl.innerHTML = `${player.totalBalance}$`
  currentBetEl.innerHTML = `${player.currentBet}$`
}


function renderEndGame() {
  console.log('GAME.endOfGame.winner',GAME.endOfGame.winner);
  const endGameEl: HTMLElement = document.querySelector('.end-game')
  const winnerEl = document.querySelector('.end-game h2 span')
  // const actionsEl = document.querySelector('.player-container .hands .actions')
  // console.log("file: controller.ts -> line 105 -> renderEndGame -> actionsEl", actionsEl)
  endGameEl.style.display = 'flex'
  // actionsEl.classList.add('hide')
  // actionsEl.classList.remove('actions')
  winnerEl.innerHTML += GAME.endOfGame.winner
}