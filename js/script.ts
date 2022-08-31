window['application'] = {
    blocks: {},
    screens: {},
    cardsNumber: 0,
    cards: {
        cardTitle: ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],

        cardSuits: [
            {
                small: 'card__image_diamonds-little',
                large: 'card__image_diamonds-big',
            },
            {
                small: 'card__image_clubs-little',
                large: 'card__image_clubs-big',
            },
            {
                small: 'card__image_hearts-little',
                large: 'card__image_hearts-big',
            },
            {
                small: 'card__image_peaks-little',
                large: 'card__image_peaks-big',
            },
        ],
    },
    randomTitle: undefined,
    randomSuit: undefined,
    cardsCollection: [],
    resultOfMove: [],
    stepNumber: 0,
    renderScreen: function (screenName: string) {
        window['application'].screens[screenName]();
    },

    renderBlock: function (blockName: string, container: HTMLElement) {
        window['application'].blocks[blockName](container);
    },
    timers: [],
    min: 0,
    sec: 0,
};

function restartGame() {
    const game = document.querySelector('.game') as Element;
    const button = document.querySelector('.result__button') as Element;
    button.addEventListener('click', (event) => {
        const target = event.target as HTMLTextAreaElement;
        event.preventDefault();

        if (target.dataset.button === 'play-again') {
            game.innerHTML = '';

            window['application'].renderScreen('start-screen');
        }
    });
}

export default restartGame;
