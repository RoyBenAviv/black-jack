function drawCard() {
    const chosenCard = CARD_DECK.pop();
    return chosenCard;
}
function shuffleDeck() {
    CARD_DECK.sort(() => Math.random() - 0.5);
}
function filterAcesSum(member) {
    return member.hand.filter((card) => card[0] !== 'A').reduce((sum, card) => {
        sum += checkCardWorth(card[0], DEALER);
        return sum;
    }, 0);
}
function checkSplitBtn(player) {
    return player.hand[0][0] === player.hand[1][0] && GAME.cardFlipped && GAME.firstDeal ? true : false;
}
function displaySum() {
    if (!GAME.endOfGame.blackJack)
        return `${PLAYER.handSum}  ${filterAcesSum(PLAYER) < 10 && PLAYER.aceCount ? ' / ' + (PLAYER.handSum - 10) : ''}`;
    else
        return '<img src="assets/images/21.webp" alt="21"/>';
}
