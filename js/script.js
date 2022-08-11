const game = document.querySelector('.game');

window.application = {

    blocks: {},
    screens: {},
    level: 0,
    cards: {
        cardTitle: ['6', '7', '8', '9', '10', 'Q', 'K', 'J', 'A'],
        cardImageLittle: ['../img/diamonds-little.svg'],
        cardImageBig: ['../img/diamonds.svg'],
    },
    randomElem: 0,
    easyLevelCollection: [],
    mediumLevelCollection: [],
    hardLevelCollection: [],

    renderScreen: function (screenName) {

        window.application.screens[screenName]();

    },


    renderBlock: function (blockName, container) {

        window.application.blocks[blockName](container);
    },

    timers: [],
    
}

function name() {
    
}
