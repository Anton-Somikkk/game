
function renderStartScreen() {

    window.application.renderBlock('start-block', game);
}

function renderGameScreen() {

    const gameBox = document.createElement('div');
    gameBox.classList.add('game-box');
    game.appendChild(gameBox);


    for (let i = 0; i < window.application.level; i++) {

        const invertedCard = document.createElement('div');
        invertedCard.classList.add('inverted-card');
        invertedCard.setAttribute('id', i);
        gameBox.appendChild(invertedCard);
    }

    window.application.timers.push(setTimeout(() => {
        window.application.renderBlock('card', gameBox);
    }, 1000));
   
}

window.application.screens['start-screen'] = renderStartScreen;
window.application.screens['game-screen'] = renderGameScreen;
window.application.renderScreen('start-screen');