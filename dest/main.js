"use strict";
const CARD_DECK = ["2C", "2D", "2H", "2S",
    "3C", "3D", "3H", "3S",
    "4C", "4D", "4H", "4S",
    "5C", "5D", "5H", "5S",
    "6C", "6D", "6H", "6S",
    "7C", "7D", "7H", "7S",
    "8C", "8D", "8H", "8S",
    "9C", "9D", "9H", "9S",
    "10C", "10D", "10H", "10S",
    "JC", "JD", "JH", "JS",
    "QC", "QD", "QH", "QS",
    "KC", "KD", "KH", "KS",
    "AC", "AD", "AH", "AS",];
const PLAYER = {
    hand: [],
    sum: 0,
    aceCount: 0
};
const DEALER = {
    hand: [],
    sum: 0,
    aceCount: 0
};
const GAME = {
    cardFlipped: true,
    gameOver: false
};
init();
function init() {
    shuffleDeck();
    firstDeal();
    renderTable();
}
function firstDeal() {
    for (let i = 0; i < 2; i++) {
        DEALER.hand.push(dealOneCard());
        PLAYER.hand.push(dealOneCard());
    }
    calculateHands();
}
function calculateHands() {
    DEALER.sum = DEALER.hand.reduce((sum, card) => {
        if (GAME.cardFlipped)
            return checkCardWorth(DEALER.hand[0][0], DEALER);
        sum += checkCardWorth(card[0], DEALER);
        return sum;
    }, 0);
    reSumAces(DEALER);
    console.log("file: main.ts -> line 58 -> DEALER.sum=DEALER.hand.reduce -> DEALER", DEALER);
    PLAYER.sum = PLAYER.hand.reduce((sum, card) => {
        sum += checkCardWorth(card[0], PLAYER);
        return sum;
    }, 0);
    reSumAces(PLAYER);
    console.log("file: main.ts -> line 63 -> PLAYER.sum=PLAYER.hand.reduce -> PLAYER", PLAYER);
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
        console.log("file: main.ts -> line 87 -> reSumAces ->  member.sum", member.sum);
        i++;
    }
}
function onHit() {
    PLAYER.hand.push(dealOneCard());
    calculateHands();
    renderTable();
}
function onStand() {
    GAME.cardFlipped = false;
    calculateHands();
    renderTable();
    while (DEALER.sum < 17) {
        DEALER.hand.push(dealOneCard());
        calculateHands();
        renderTable();
    }
}
function checkWinner() {
    // if(PLAYER.sum > 21)
}
