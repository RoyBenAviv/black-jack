"use strict";
function drawCard() {
    const chosenCard = CARD_DECK.pop();
    return chosenCard;
}
function shuffleDeck() {
    CARD_DECK.sort(() => Math.random() - 0.5);
}
function filterAcesSum(player) {
    return player.hand.filter((card) => card[0] !== 'A').reduce((sum, card) => {
        sum += checkCardWorth(card[0], DEALER);
        return sum;
    }, 0);
}
function checkSplitBtn(player) {
    return player.hand[0][0] === player.hand[1][0] ? true : false;
}
