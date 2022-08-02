function init() {
    hideMenu();
    renderGameTokens();
}
function startGame() {
    hideGameTokens();
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
    DEALER.handSum = DEALER.hand.reduce((sum, card) => {
        if (GAME.cardFlipped)
            return checkCardWorth(DEALER.hand[0][0], DEALER);
        sum += checkCardWorth(card[0], DEALER);
        return sum;
    }, 0);
    reSumAces(DEALER);
    console.log('file: main.ts -> line 37 -> DEALER.handSum=DEALER.hand.reduce -> DEALER.handSum', DEALER.handSum);
    PLAYER.handSum = PLAYER.hand.reduce((sum, card) => {
        sum += checkCardWorth(card[0], PLAYER);
        return sum;
    }, 0);
    reSumAces(PLAYER);
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
        if (member.handSum > 21)
            member.handSum -= 10;
        i++;
    }
}
function onHit() {
    GAME.firstDeal = false;
    PLAYER.hand.push(drawCard());
    new Audio('assets/audio/card-draw.mp3').play();
    calculateHands();
    renderTable();
    const winner = checkWinner();
    if (winner) {
        endGame(winner);
    }
}
function onStand() {
    if (GAME.splitMode) {
        PLAYER.split.currentHand++;
        renderTable();
    }
    else {
        GAME.cardFlipped = false;
        calculateHands();
        renderTable();
        while (DEALER.handSum < 17) {
            DEALER.hand.push(drawCard());
            calculateHands();
            renderTable();
        }
        if (DEALER.handSum >= 17 || GAME.cardFlipped) {
            const winner = checkWinner();
            console.log("file: main.ts -> line 95 -> onStand -> winner", winner);
            if (winner) {
                console.log("file: main.ts -> line 95 -> onStand -> winner", winner);
                endGame(winner);
            }
        }
    }
    if (GAME.cardFlipped || DEALER.handSum >= 17) {
        console.log('file: main.ts -> line 46 -> calculateHands -> DEALER.handSum', DEALER.handSum);
        console.log('file: main.ts -> line 46 -> calculateHands -> GAME.cardFlipped', GAME.cardFlipped);
    }
}
function checkWinner() {
    if (GAME.cardFlipped) {
        if (PLAYER.handSum > 21)
            return 'dealer';
    }
    else {
        console.log('hi');
        if (DEALER.handSum <= 21 && DEALER.handSum >= 17 && DEALER.handSum > PLAYER.handSum)
            return 'dealer';
        // if (PLAYER.handSum === 21 && PLAYER.aceCount === 1) {
        //   GAME.endOfGame.blackJack = true
        //   return 'player'
        // } else if (DEALER.handSum > 21) return 'player'
        // if (PLAYER.handSum > DEALER.handSum && PLAYER.handSum < 21) return 'player'
        // if (DEALER.handSum >= 17 && DEALER.handSum === PLAYER.handSum) return 'push'
    }
    // if (GAME.cardFlipped && PLAYER.handSum > 21) return 'dealer'
    // if (!GAME.cardFlipped && DEALER.sum <= 21 && DEALER.sum > PLAYER.handSum) return 'dealer'
    // if (PLAYER.handSum === 21 && PLAYER.aceCount === 1) {
    //   GAME.endOfGame.blackJack = true
    //   return 'player'
    // } else if (DEALER.sum > 21) return 'player'
    renderTable();
}
function endGame(winner) {
    console.log('file: main.ts -> line 118 -> endGame -> winner', winner);
    GAME.endOfGame.winner = winner;
    // if(GAME.endOfGame.winner === "player" && GAME.endOfGame.blackJack) PLAYER.totalBalance += PLAYER.currentBet * 2.5
    // else if(GAME.endOfGame.winner === "player") PLAYER.totalBalance += PLAYER.currentBet * 2
    // else if(GAME.endOfGame.winner === "push") PLAYER.totalBalance += PLAYER.currentBet
    renderBalance(PLAYER);
    renderEndGame();
}
