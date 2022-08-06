var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function renderTable() {
    return __awaiter(this, void 0, void 0, function* () {
        let playerHTML = '';
        if (GAME.splitMode) {
            for (let i = 0; i < 2; i++) {
                const hands = PLAYER.split.splitedHands[i];
                playerHTML += '<div class="hands">';
                playerHTML += '<div class="cards">';
                for (let j = 0; j < hands.length; j++) {
                    playerHTML += `<img class='card' src='assets/images/cards/${hands[j]}.svg'>`;
                }
                playerHTML += '</div>';
                playerHTML += `
      <div class="${i === PLAYER.split.currentHand ? 'actions' : 'hide'}">
      <button style="display: ${PLAYER.handSum >= 21 ? 'none' : 'flex'}" onclick="onHit()"> <img src="assets/images/hit.png" alt="hit"/> HIT</button> <button onclick="onStand()"> <img src="assets/images/stand.png" alt="stand"/> STAND</button> 
      </div>
      <span class="player sum two-hands">${displaySplitSum(i)}</span>
      `;
                playerHTML += '</div>';
            }
        }
        else {
            playerHTML += '<div class="hands">';
            playerHTML += '<div class="cards">';
            if (PLAYER.hand.length > 2 || !GAME.cardFlipped) {
                for (let i = 0; i < PLAYER.hand.length; i++) {
                    playerHTML += `<img class='card' src='assets/images/cards/${PLAYER.hand[i]}.svg'>`;
                }
                playerHTML += '</div>';
                playerHTML += `<div class="${GAME.cardFlipped ? 'actions' : 'hide'}">
            <button style="display: ${PLAYER.handSum >= 21 ? 'none' : 'flex'}" onclick="onHit()"> <img src="assets/images/hit.png" alt="hit"/> HIT</button> 
            <button onclick="onStand()"> <img src="assets/images/stand.png" alt="stand"/> STAND</button> 
             <button style="display: ${checkSplitBtn(PLAYER) ? 'flex' : 'none'}" onclick="onSetSplitMode()"> <img src="assets/images/split.png" alt="split"/> SPLIT</button>
            </div>
            <span class="player sum one-hand">${displaySum()}</span>
            `;
                playerHTML += '</div>';
            }
        }
        let dealerHTML = '';
        for (let i = 0; i < DEALER.hand.length; i++) {
            if (i === 1 && GAME.cardFlipped)
                dealerHTML += `<div class="back-container">
            
            <img class='card' src='assets/images/cards/${DEALER.hand[i]}.svg'>
                                                 <img class='back' src='assets/images/cards/RED_BACK.svg'>
                                     </div>`;
            else
                dealerHTML += `<img class='card' src='assets/images/cards/${DEALER.hand[i]}.svg'>`;
        }
        dealerHTML += `<span class="dealer sum one-hand">${DEALER.handSum}</span>`;
        let elPlayer = document.querySelector('.player-container');
        let elDealer = document.querySelector('.dealer-container');
        elPlayer.innerHTML = playerHTML;
        elDealer.innerHTML = dealerHTML;
    });
}
function renderCards() {
    let elPlayer = document.querySelector('.cards');
    let elHands = document.querySelector('.hands');
    (function () {
        let i = 0;
        const interval = setInterval(function () {
            elPlayer.innerHTML += `<img class='card' src='assets/images/cards/${PLAYER.hand[i]}.svg'>`;
            new Audio('assets/audio/card-draw.mp3').play();
            i += 1;
            elPlayer.innerHTML += '</div>';
            if (i >= PLAYER.hand.length) {
                clearInterval(interval);
                elHands.innerHTML += `<div class="${GAME.cardFlipped ? 'actions' : 'hide'}">
         <button style="display: ${PLAYER.handSum >= 21 ? 'none' : 'flex'}" onclick="onHit()"> <img src="assets/images/hit.png" alt="hit"/> HIT</button> 
         <button onclick="onStand()"> <img src="assets/images/stand.png" alt="stand"/> STAND</button> 
         <button style="display: ${checkSplitBtn(PLAYER) ? 'flex' : 'none'}" onclick="onSetSplitMode()"> <img src="assets/images/split.png" alt="split"/> SPLIT</button>
         </div>
         <span class="player sum one-hand">${displaySum()}</span>`;
                elHands.innerHTML += '</div>';
            }
        }, 600);
    })();
}
function hideMenu() {
    const elMenu = document.querySelector('.menu');
    elMenu.style.display = 'none';
}
function renderGameTokens() {
    const elGameTokens = document.querySelector('.game-tokens');
    const elHandTokens = document.querySelector('.hand-tokens');
    elHandTokens.classList.add('dnd');
    elGameTokens.style.display = 'flex';
}
function hideGameTokens() {
    const elGameTokens = document.querySelector('.game-tokens');
    const elHandTokens = document.querySelector('.hand-tokens');
    elHandTokens.classList.remove('dnd');
    elGameTokens.style.display = 'none';
}
function renderBalance(player) {
    console.log("file: controller.ts -> line 104 -> renderBalance -> player.totalBalance", player.totalBalance);
    console.log("file: controller.ts -> line 106 -> renderBalance -> player.currentBet", player.currentBet);
    const totalBalanceEl = document.querySelector('.total span');
    const currentBetEl = document.querySelector('.bet span');
    totalBalanceEl.innerHTML = `${player.totalBalance}$`;
    currentBetEl.innerHTML = `${player.currentBet}$`;
}
function renderEndGame() {
    const endGameEl = document.querySelector('.end-game');
    const winnerEl = document.querySelector('.end-game');
    console.log("file: controller.ts -> line 121 -> renderEndGame -> GAME.endOfGame.blackJack", GAME.endOfGame.blackJack);
    // const actionsEl = document.querySelector('.player-container .hands .actions')
    // console.log("file: controller.ts -> line 105 -> renderEndGame -> actionsEl", actionsEl)
    endGameEl.style.display = 'flex';
    // actionsEl.classList.add('hide')
    // actionsEl.classList.remove('actions')
    if (GAME.endOfGame.winner !== 'push') {
        winnerEl.innerHTML += `<h2>Winner: <span>${GAME.endOfGame.winner}</span></h2>`;
        if (GAME.endOfGame.blackJack) {
            console.log('hello from here');
            winnerEl.innerHTML += `<h3>Black Jack!</h3>`;
        }
    }
    else {
        winnerEl.innerHTML += `<h2>Result: <span>PUSH</span></h2>`;
    }
    renderTable();
}
