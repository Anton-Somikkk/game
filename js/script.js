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

    renderScreen: function (screenName) {
        window.application.screens[screenName]();
    },

    renderBlock: function (blockName, container) {
        window.application.blocks[blockName](container);
    },
};
