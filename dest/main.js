"use strict";
function init() {
    console.log('this', this);
    shuffleDeck();
    firstDeal();
    renderTable();
    renderCards();
}
function firstDeal() {
    for (let i = 0; i < 2; i++) {
        DEALER.hand.push(drawCard());
        PLAYER.hand.push(drawCard());
    }
    calculateHands();
}
function onSetSplitMode() {
    GAME.splitMode = true;
    PLAYER.split.splitedHands = [
        [PLAYER.hand.shift(), drawCard()],
        [PLAYER.hand.shift(), drawCard()],
    ];
    renderTable();
}
function calculateHands() {
    DEALER.sum = DEALER.hand.reduce((sum, card) => {
        if (GAME.cardFlipped)
            return checkCardWorth(DEALER.hand[0][0], DEALER);
        sum += checkCardWorth(card[0], DEALER);
        return sum;
    }, 0);
    reSumAces(DEALER);
    console.log('file: main.ts -> line 58 -> DEALER.sum=DEALER.hand.reduce -> DEALER', DEALER);
    PLAYER.sum = PLAYER.hand.reduce((sum, card) => {
        sum += checkCardWorth(card[0], PLAYER);
        return sum;
    }, 0);
    reSumAces(PLAYER);
    console.log('file: main.ts -> line 63 -> PLAYER.sum=PLAYER.hand.reduce -> PLAYER', PLAYER);
    checkWinner();
}
function checkCardWorth(value, member) {
    let cardWorth = 0;
    if (value === 'K' || value === 'Q' || value === 'J' || value === '1')
        cardWorth = 10;
    else if (value === 'A') {
        cardWorth = 11;
    }
    else
        cardWorth = Number(value);
    return cardWorth;
}
function reSumAces(member) {
    var i = 0;
    member.aceCount = member.hand.filter((card) => card[0] === 'A').length;
    if (!member.aceCount)
        return;
    while (i <= member.aceCount) {
        if (member.sum > 21)
            member.sum -= 10;
        i++;
    }
}
function onHit() {
    PLAYER.hand.push(drawCard());
    calculateHands();
    renderTable();
}
function onStand() {
    if (GAME.splitMode) {
        PLAYER.split.currentHand++;
        renderTable();
    }
    else {
        console.log('hhh');
        GAME.cardFlipped = false;
        calculateHands();
        renderTable();
        while (DEALER.sum < 17) {
            DEALER.hand.push(drawCard());
            calculateHands();
            renderTable();
        }
    }
}
function checkWinner() {
    if (GAME.cardFlipped && PLAYER.sum > 21)
        GAME.endOfGame.winner = "dealer";
    if (!GAME.cardFlipped && DEALER.sum <= 21 && DEALER.sum > PLAYER.sum)
        GAME.endOfGame.winner = "dealer";
    if (PLAYER.sum === 21 && PLAYER.aceCount === 1) {
        GAME.endOfGame.winner = "player";
        GAME.endOfGame.blackJack = true;
    }
    else if (DEALER.sum > 21)
        GAME.endOfGame.winner = "player";
    if (!GAME.cardFlipped && PLAYER.sum > DEALER.sum && PLAYER.sum < 21)
        GAME.endOfGame.winner = "player";
    // else if (DEALER.sum > 16 && PLAYER.sum > 16 && PLAYER.sum < 21) GAME.endOfGame.winner = "player"    
}
