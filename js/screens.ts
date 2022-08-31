const game = document.querySelector('.game') as Element;

function renderStartScreen() {
    window['application'].renderBlock('start-block', game);
}

function renderGameScreen() {
    const headerGame = document.createElement('div');
    headerGame.classList.add('header');
    game.appendChild(headerGame);

    const timerGame = document.createElement('div');
    timerGame.classList.add('header__timer');
    headerGame.appendChild(timerGame);

    const minBlock = document.createElement('div');
    minBlock.classList.add('header__timer-min');
    timerGame.appendChild(minBlock);

    const secondBlock = document.createElement('div');
    secondBlock.classList.add('header__timer-sec');
    timerGame.appendChild(secondBlock);

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
    watch();
}

function watch() {
    const fieldMin = document.querySelector('.header__timer-min') as Element;
    const fieldSec = document.querySelector('.header__timer-sec') as Element;

    let sec = 0;
    let min = 0;

    window['application'].timers.push(
        setInterval(() => {
            if (min < 10) {
                fieldMin.innerHTML = window['application'].min =
                    '0' + min + ':';
            } else {
                fieldMin.innerHTML = window['application'].min = min + ':';
            }

            if (sec < 10) {
                fieldSec.innerHTML = window['application'].sec = '0' + sec;
            } else {
                fieldSec.innerHTML = window['application'].sec = String(sec);
            }

            sec++;

            if (sec > 59) {
                min++;

                sec = 0;
            }
        }, 1000)
    );
}

function stopWatch() {
    const fieldMin = document.querySelector('.header__timer-min');
    const fieldSec = document.querySelector('.header__timer-sec');

    if (fieldMin !== null && fieldSec !== null) {
        window['application'].timers.forEach((timer: number) => {
            clearInterval(timer);
        });

        fieldSec.innerHTML = window['application'].sec;
        fieldMin.innerHTML = window['application'].min;
    }
}

game.addEventListener('click', (event) => {
    const target = event.target as HTMLTextAreaElement;
    const gameBox = document.querySelector('.game-box') as Element;
    const resultOfMove = window['application'].resultOfMove as Number[];
    const resultOfMoveLength = window['application'].resultOfMove
        .length as Number;

    if (target.dataset.card === 'inverted') {
        const [openedCoupleCards, openedCardTitle, openedCardSuit] =
            resultOfMove;

        const [coupleCards, cardTitle, cardSuit] = window['application']
            .cardsCollection[target.id] as Number[];

        window['application'].randomSuit = cardSuit;
        window['application'].randomTitle = cardTitle;

        target.classList.remove('inverted-card');
        target.classList.add('card');
        target.innerHTML = '';

        window['application'].renderBlock('card', target);

        if (
            (resultOfMoveLength !== 0 && openedCardTitle !== cardTitle) ||
            (openedCardSuit !== cardSuit && resultOfMoveLength !== 0)
        ) {
            stopWatch();

            setTimeout(() => {
                window['application'].renderBlock('lose-block', game);
            }, 200);
            return;
        }

        if (
            String(window['application'].stepNumber + 1) ===
            window['application'].cardsNumber
        ) {
            stopWatch();

            setTimeout(() => {
                window['application'].renderBlock('win-block', game);
            }, 200);
            return;
        }

        if (resultOfMoveLength === 0) {
            window['application'].stepNumber++;

            window['application'].resultOfMove =
                window['application'].cardsCollection[target.id];
            return;
        }

        if (
            resultOfMoveLength !== 0 &&
            openedCardTitle === cardTitle &&
            openedCardSuit === cardSuit
        ) {
            window['application'].resultOfMove = [];
            window['application'].stepNumber++;

            return;
        }
    }

    if (target.dataset.button === 'again') {
        gameBox.innerHTML = '';

        stopWatch();
        generateDataArray();
        setTimeout(() => handOutFrontCard(), 200);
        setTimeout(() => handOutInvertedCard(), 5000);
        watch();
        return;
    }
});

function handOutFrontCard() {
    const gameBox = document.querySelector('.game-box') as Element;
    gameBox.innerHTML = '';

    for (let i = 0; i < window['application'].cardsNumber; i++) {
        window['application'].randomSuit =
            window['application'].cardsCollection[i][2];
        window['application'].randomTitle =
            window['application'].cardsCollection[i][1];

        window['application'].renderBlock('card', gameBox);
    }
}

function handOutInvertedCard() {
    const gameBox = document.querySelector('.game-box') as Element;
    gameBox.innerHTML = '';
    window['application'].resultOfMove = [];
    window['application'].stepNumber = 0;

    for (let i = 0; i < window['application'].cardsNumber; i++) {
        const invertedCard = document.createElement('div');
        invertedCard.classList.add('inverted-card');
        invertedCard.setAttribute('id', String(i));
        invertedCard.setAttribute('data-card', 'inverted');

        gameBox.appendChild(invertedCard);
    }
}

function generateDataArray() {
    window['application'].cardsCollection = [];
    const suitCardNumber = 4;
    const titleCardNumber = 9;

    for (let i = 0; i < window['application'].cardsNumber / 2; i++) {
        window['application'].randomSuit = Math.floor(
            Math.random() * suitCardNumber
        );
        window['application'].randomTitle = Math.floor(
            Math.random() * titleCardNumber
        );
        window['application'].cardsCollection.push([
            i,
            window['application'].randomTitle,
            window['application'].randomSuit,
        ]);
    }

    window['application'].cardsCollection = [
        ...window['application'].cardsCollection,
        ...window['application'].cardsCollection,
    ];
    window['application'].cardsCollection.sort(() => Math.random() - 0.5);
    handOutInvertedCard();
}

window['application'].screens['start-screen'] = renderStartScreen;
window['application'].screens['game-screen'] = renderGameScreen;
window['application'].renderScreen('start-screen');
