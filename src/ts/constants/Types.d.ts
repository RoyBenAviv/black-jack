interface Player {
    hand: string[],
    sum: number,
    aceCount: number,
    split: any
}

interface Dealer {
    hand: string[],
    sum: number,
    aceCount: number
}

interface Game {
    cardFlipped: boolean,
    endOfGame: {
      winner: undefined | "player" | "dealer",
      blackJack: boolean
    },
    splitMode: boolean,
}