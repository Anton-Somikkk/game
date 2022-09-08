interface ChildNode {
    classList: DOMTokenList;
}

interface Window {
    application: Application;
}

interface Application {
    blocks: object;
    cards: Cards;
    cardsCollection: number[][];
    resultOfMove: number[];
    timers: Timers;
    screens: object;
    min: number | string;
    sec: number | string;
    stepNumber: number;
    cardsNumber: number;
    randomTitle: number;
    randomSuit: number;
    renderBlock: (blockName: string, container: HTMLElement) => void;
    renderScreen: (screenName: string) => void;
}

interface Timers {
    forEach(arg0: (timer: any) => void);
    push(arg0: NodeJS.Timer);
}

interface Cards {
    cardSuits: CardSuits[];
    cardTitle: string[];
}

interface CardSuits {
    small: string;
    large: string;
}
