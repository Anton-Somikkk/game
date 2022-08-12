const game = document.querySelector('.game');

window.application = {

    blocks: {},
    screens: {},
    cardsNumber: 0,
    cards: {
        cardTitle: ['6', '7', '8', '9', '10', 'Q', 'K', 'J', 'A'],
        cardSuitLittle: ['../img/diamonds-little.svg', '../img/clubs-little.svg', '../img/hearts-little.svg', '../img/peaks-little.svg'],
        cardSuitBig: ['../img/diamonds.svg', '../img/clubs.svg', '../img/hearts.svg', '../img/peaks.svg'],
    },
    randomTitle: undefined,
    randomSuit: undefined,
    CardsTittleCollection: [],
    CardsImageCollection: [],
    
    renderScreen: function (screenName) {

        window.application.screens[screenName]();

    },


    renderBlock: function (blockName, container) {

        window.application.blocks[blockName](container);
    },

    timers: [],

}


