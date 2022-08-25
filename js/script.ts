/* eslint-disable prettier/prettier */

window.application = {
    blocks: {},
    screens: {},
    cardsNumber: 0,
    cards: {
        cardTitle: ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
        cardSuitLittle: [
            'card__image_diamonds-little',
            'card__image_clubs-little',
            'card__image_hearts-little',
            'card__image_peaks-little',
        ],
        cardSuitBig: [
            'card__image_diamonds-big',
            'card__image_clubs-big',
            'card__image_hearts-big',
            'card__image_peaks-big',
        ],
    },
    randomTitle: undefined,
    randomSuit: undefined,
    cardsCollection: [],
    resultOfMove: [],
    stepNumber: 0,
    renderScreen: function (screenName: string) {
        window.application.screens[screenName]();
    },

    renderBlock: function (blockName: string, container: HTMLElement) {
        window.application.blocks[blockName](container);
    },
    timers: [],
    min: 0,
    sec: 0,
};

function startingGameAgain() {
    const game = document.querySelector('.game');
    const button = document.querySelector('.result__button');
    button.addEventListener('click', (event) => {
        const target = event.target as HTMLTextAreaElement;
        event.preventDefault();

        if (target.dataset.button === 'play-again') {
            game.innerHTML = '';

            window.application.renderScreen('start-screen');
        }
    });
}

export default startingGameAgain;
