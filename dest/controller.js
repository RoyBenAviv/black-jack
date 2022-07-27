"use strict";
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
                console.log('PLAYER.split', PLAYER.split);
                const hands = PLAYER.split.splitedHands[i];
                playerHTML += '<div class="hands">';
                playerHTML += '<div class="cards">';
                for (let j = 0; j < hands.length; j++) {
                    playerHTML += `<img class='card' src='images/cards/${hands[j]}.svg'>`;
                }
                playerHTML += '</div>';
                playerHTML += `
      <div class="${i === PLAYER.split.currentHand ? "actions" : "hide"}">
      <button onclick="onHit()">HIT</button> <button onclick="onStand()">STAND</button> 
      </div>
      <span></span>
      `;
                playerHTML += '</div>';
            }
        }
        else {
            playerHTML += '<div class="hands">';
            playerHTML += '<div class="cards">';
        }
        console.log('hhhhhhhhhhhhhh');
        console.log("file: controller.ts -> line 28 -> renderTable -> PLAYER.hand.length", PLAYER.hand.length);
        if (PLAYER.hand.length > 2) {
            for (let i = 0; i < PLAYER.hand.length; i++) {
                console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
                playerHTML += `<img class='card' src='images/cards/${PLAYER.hand[i]}.svg'>`;
            }
            playerHTML += '</div>';
            playerHTML += `<div class="${GAME.cardFlipped ? "actions" : "hide"}">
            <button onclick="onHit()">HIT</button> <button onclick="onStand()">STAND</button> 
             <button style="display: ${checkSplitBtn(PLAYER) ? 'block' : 'none'}" onclick="onSetSplitMode()">SPLIT</button>
            </div>
            <span>${PLAYER.sum}  ${filterAcesSum(PLAYER) < 10 && PLAYER.aceCount ? ' / ' + (PLAYER.sum - 10) : ''}</span>
            </div>`;
        }
        let dealerHTML = '';
        for (let i = 0; i < DEALER.hand.length; i++) {
            if (i === 1 && GAME.cardFlipped)
                dealerHTML += `<div class="back-container"><img class='card' src='images/cards/${DEALER.hand[i]}.svg'>
                                                 <img class='back' src='images/cards/RED_BACK.svg'>
                                     </div>`;
            else
                dealerHTML += `<img class='card' src='images/cards/${DEALER.hand[i]}.svg'>`;
        }
        dealerHTML += `<span>${DEALER.sum}</span>`;
        let elPlayer = document.querySelector('.player');
        let elDealer = document.querySelector('.dealer');
        elPlayer.innerHTML = playerHTML;
        elDealer.innerHTML = dealerHTML;
    });
}
function renderCards() {
    let elPlayer = document.querySelector('.cards');
    (function () {
        let i = 0;
        const interval = setInterval(function () {
            elPlayer.innerHTML += `<img class='card' src='images/cards/${PLAYER.hand[i]}.svg'>`;
            new Audio("audio/card-draw.mp3").play();
            i += 1;
            if (i >= PLAYER.hand.length) {
                clearInterval(interval);
                elPlayer.innerHTML += `<div class="${GAME.cardFlipped ? "actions" : "hide"}">
              <button onclick="onHit()">HIT</button> <button onclick="onStand()">STAND</button> 
               <button style="display: ${checkSplitBtn(PLAYER) ? 'block' : 'none'}" onclick="onSetSplitMode()">SPLIT</button>
              </div>
              <span>${PLAYER.sum}  ${filterAcesSum(PLAYER) < 10 && PLAYER.aceCount ? ' / ' + (PLAYER.sum - 10) : ''}</span>
              </div>`;
            }
        }, 600);
    })();
}
