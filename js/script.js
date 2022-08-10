const game = document.querySelector('.game');

window.application = {

    blocks: {},
    screens: {},

    renderScreen: function (screenName) {

        window.application.screens[screenName]();

    },


    renderBlock: function (blockName, container) {

        window.application.blocks[blockName](container);
    },
}
