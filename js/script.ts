window.application = {
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
    randomTitle: 0,
    randomSuit: 0,
    cardsCollection: [],
    resultOfMove: [],
    stepNumber: 0,
    renderScreen: function (screenName) {
        window.application.screens[screenName]();
    },

    renderBlock: function (blockName, container) {
        window.application.blocks[blockName](container);
    },
    timers: [],
    min: 0,
    sec: 0,
};

function restartGame() {
    const game: Element | null = document.querySelector('.game');
    const button: Element | null = document.querySelector('.result__button');
    button!.addEventListener('click', (event) => {
        const target = event.target as HTMLTextAreaElement;
        event.preventDefault();

        if (target.dataset.button === 'play-again') {
            game!.innerHTML = '';

            window.application.renderScreen('start-screen');
        }
    });
}

export default restartGame;
