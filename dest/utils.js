"use strict";
function dealOneCard() {
    const chosenCard = CARD_DECK.pop();
    return chosenCard;
}
function shuffleDeck() {
    CARD_DECK.sort(() => Math.random() - 0.5);
}
function filterAcesSum() {
    return PLAYER.hand.filter((card) => card[0] !== 'A').reduce((sum, card) => {
        sum += checkCardWorth(card[0], DEALER);
        return sum;
    }, 0);
}
