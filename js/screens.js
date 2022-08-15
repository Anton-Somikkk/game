function renderStartScreen() {
    window.application.renderBlock('start-block', game);
}

function renderGameScreen() {
    const headerGame = document.createElement('div');
    headerGame.classList.add('header');
    game.appendChild(headerGame);

    const timerGame = document.createElement('div');
    timerGame.classList.add('header__timer');
    headerGame.appendChild(timerGame);

    const startAgainButton = document.createElement('button');
    startAgainButton.classList.add('header__start-again-button');
    startAgainButton.textContent = 'Начать заново';
    startAgainButton.setAttribute('data-button', 'again');
    headerGame.appendChild(startAgainButton);

    const gameBox = document.createElement('div');
    gameBox.classList.add('game-box');
    game.appendChild(gameBox);

    generateDataArray();

    setTimeout(() => handOutFrontCard(), 200);
    setTimeout(() => handOutInvertedCard(), 5000);

    function generateDataArray() {
        window.application.cardsCollection = [];
        const suitCardNumber = 4;
        const titleCardNumber = 9;
        for (let i = 0; i < window.application.cardsNumber / 2; i++) {
            window.application.randomSuit = Math.floor(
                Math.random() * suitCardNumber
            );
            window.application.randomTitle = Math.floor(
                Math.random() * titleCardNumber
            );
            window.application.cardsCollection.push([
                i,
                window.application.randomTitle,
                window.application.randomSuit,
            ]);
        }

        window.application.cardsCollection = [
            ...window.application.cardsCollection,
            ...window.application.cardsCollection,
        ];
        window.application.cardsCollection.sort(() => Math.random() - 0.5);
        handOutInvertedCard();
    }

    function handOutInvertedCard() {
        gameBox.innerHTML = '';

        for (let i = 0; i < window.application.cardsNumber; i++) {
            const invertedCard = document.createElement('div');
            invertedCard.classList.add('inverted-card');
            invertedCard.setAttribute('id', i);
            invertedCard.setAttribute('data-card', 'inverted');

            gameBox.appendChild(invertedCard);
        }
    }

    function handOutFrontCard() {
        gameBox.innerHTML = '';
        for (let i = 0; i < window.application.cardsNumber; i++) {
            window.application.randomSuit =
                window.application.cardsCollection[i][2];
            window.application.randomTitle =
                window.application.cardsCollection[i][1];

            window.application.renderBlock('card', gameBox);
        }
    }

    game.addEventListener('click', (event) => {
        const { target } = event;

        if (target.dataset.card === 'inverted') {
            window.application.randomSuit =
                window.application.cardsCollection[target.id][2];
            window.application.randomTitle =
                window.application.cardsCollection[target.id][1];

            target.classList.remove('inverted-card');
            target.classList.add('card');

            window.application.renderBlock('card', target);
        }

        if (target.dataset.button === 'again') {
            gameBox.innerHTML = '';
            generateDataArray();
            setTimeout(() => handOutFrontCard(), 200);
            setTimeout(() => handOutInvertedCard(), 5000);
        }
    });
}

window.application.screens['start-screen'] = renderStartScreen;
window.application.screens['game-screen'] = renderGameScreen;
window.application.renderScreen('start-screen');
