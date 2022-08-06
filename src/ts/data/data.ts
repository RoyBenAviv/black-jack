const CARD_DECK: string[] = [
  'AC',
  'AD',
  'AH',
  'AS',
  'AC',
  'AD',
  'AH',
  'AS',
  'AC',
  'AD',
  'AH',
  'AS',
  'AC',
  'AD',
  'AH',
  'AS',
  'AC',
  'AD',
  'AH',
  'AS',
  'AC',
  'AD',
  'AH',
  'AS',
  'AC',
  'AD',
  'AH',
  'AS',
  '9C',
  '9D',
  '9H',
  '9S',
  '10C',
  '10D',
  '10H',
  '10S',
  'JC',
  'JD',
  'JH',
  'JS',
  'QC',
  'QD',
  'QH',
  'QS',
  'KC',
  'KD',
  'KH',
  'KS',
  'AC',
  'AD',
  'AH',
  'AS',
]

const PLAYER: Player = {
  hand: [],
  handSum: 0,
  aceCount: 0,
  totalBalance: 500,
  currentBet: 0,
  split: {
    splitedHands: [[], []],
    splitSum: [0, 0],
    currentHand: 0,
    aceCount: [0, 0]
  },
}

const DEALER: Dealer = {
  hand: [],
  handSum: 0,
  aceCount: 0,
}

const GAME: Game = {
  cardFlipped: true,
  endOfGame: {
    winner: undefined,
    blackJack: false,
    splitMode: {
      winner: [undefined, undefined],
      blackJack: [false, false]
    },
  },
  splitMode: false,
  firstDeal: true
}
