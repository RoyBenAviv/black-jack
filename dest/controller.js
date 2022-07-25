"use strict";
function renderTable() {
    let playerHTML = '<div class="cards">';
    for (let i = 0; i < PLAYER.hand.length; i++) {
        playerHTML += `<img class='card' src='images/cards/${PLAYER.hand[i]}.svg'>`;
    }
    playerHTML += `</div>`;
    playerHTML += `<div class="actions">
    <button onclick="onHit()">HIT</button> <button onclick="onStand()">STAND</button> 
    </div>`;
    let dealerHTML = '';
    for (let i = 0; i < DEALER.hand.length; i++) {
        if (i === 1 && GAME.cardFlipped)
            dealerHTML += `<div class="back-container"><img class='card' src='images/cards/${DEALER.hand[i]}.svg'>
                                                 <img class='back' src='images/cards/RED_BACK.svg'>
                                     </div>`;
        else
            dealerHTML += `<img class='card' src='images/cards/${DEALER.hand[i]}.svg'>`;
    }
    let elPlayer = document.querySelector('.player');
    let elDealer = document.querySelector('.dealer');
    elPlayer.innerHTML = playerHTML;
    elDealer.innerHTML = dealerHTML;
}
