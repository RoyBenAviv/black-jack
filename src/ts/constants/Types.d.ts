interface Player {
    hand: string[],
    handSum: number,
    aceCount: number,
    totalBalance: number,
    currentBet: number
    split: any,
}

interface Dealer {
    hand: string[],
    handSum: number,
    aceCount: number
}

interface Game {
    cardFlipped: boolean,
    endOfGame: {
      winner: undefined | "player" | "dealer" | "push",
      blackJack: boolean,
      splitMode: object
    },
    splitMode: boolean,
    firstDeal: boolean
}