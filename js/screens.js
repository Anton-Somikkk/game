
function renderStartScreen() {

    window.application.renderBlock('start-block', game);
}

function renderGameScreen() {

    const gameBox = document.createElement('div');
    gameBox.classList.add('game-box');
    game.appendChild(gameBox);

    for (let i = 0; i < 36; i++) {
        const invertedCards = document.createElement('div');
        invertedCards.classList.add('inverted-card');
        gameBox.appendChild(invertedCards);
    }

}

window.application.screens['start-screen'] = renderStartScreen;
window.application.screens['game-screen'] = renderGameScreen;
window.application.renderScreen('start-screen');