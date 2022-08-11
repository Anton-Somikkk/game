const game = document.querySelector('.game');

window.application = {

    blocks: {},
    screens: {},
    level: 0,
    easyLevelCollection: [],
    mediumLevelCollection: [],
    hardLevelCollection: [],

    renderScreen: function (screenName) {

        window.application.screens[screenName]();

    },


    renderBlock: function (blockName, container) {

        window.application.blocks[blockName](container);
    },
}

function name() {
    
}
