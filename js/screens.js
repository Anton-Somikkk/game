
function renderStartScreen() {

    window.application.renderBlock('start-block', game);
}

function renderGameScreen() {

    const gameBox = document.createElement('div');
    gameBox.classList.add('game-box');
    game.appendChild(gameBox);


    for (let i = 0; i < window.application.cardsNumber; i++) {

        const invertedCard = document.createElement('div');
        invertedCard.classList.add('inverted-card');
        invertedCard.setAttribute('id', i);
        gameBox.appendChild(invertedCard);
    }


    for (let i = 0; i < window.application.cardsNumber / 2; i++) {

        window.application.CardsTittleCollection.push(Math.floor(Math.random() * 9));
        window.application.CardsImageCollection.push(Math.floor(Math.random() * 4));
    }

    window.application.CardsTittleCollection = [...window.application.CardsTittleCollection, ...window.application.CardsTittleCollection];
    window.application.CardsImageCollection = [...window.application.CardsImageCollection, ...window.application.CardsImageCollection];

    window.application.CardsTittleCollection.sort(() => Math.random() - 0.5);
    window.application.CardsImageCollection.sort(() => Math.random() - 0.5);

    
   

    window.application.timers.push(setTimeout(() => {

        for (let i = 0; i < window.application.cardsNumber; i++) {

            window.application.randomTitle = Math.floor(Math.random() * 9);

            window.application.randomSuit = Math.floor(Math.random() * 4);

            window.application.renderBlock('card', gameBox);

        }

    }, 500));

}

window.application.screens['start-screen'] = renderStartScreen;
window.application.screens['game-screen'] = renderGameScreen;
window.application.renderScreen('start-screen');