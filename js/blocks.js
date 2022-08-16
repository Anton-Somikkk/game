/* eslint-disable prettier/prettier */
function renderDifficultySelectionBlock() {
    function createBlock() {
        return {
            tag: 'div',
            cls: 'difficulty-selection',
            content: [
                {
                    tag: 'h1',
                    cls: 'difficulty-selection__title',
                    content: 'Change level',
                },

                {
                    tag: 'div',
                    cls: 'difficulty-selection__box',
                    content: [
                        {
                            tag: 'div',
                            cls: 'difficulty-selection__level',
                            attrs: {
                                'data-cards': '6',
                            },
                            content: '1',
                        },

                        {
                            tag: 'div',
                            cls: 'difficulty-selection__level',
                            attrs: {
                                'data-cards': '12',
                            },
                            content: '2',
                        },

                        {
                            tag: 'div',
                            cls: 'difficulty-selection__level',
                            attrs: {
                                'data-cards': '18',
                            },
                            content: '3',
                        },
                    ],
                },

                {
                    tag: 'button',
                    cls: 'difficulty-selection__button',
                    attrs: {
                        'data-button_start': '0',
                    },
                    content: 'Start',
                },
            ],
        };
    }

    game.appendChild(templateEngine(createBlock()));

    const difficultySelectionBlock = document.querySelector(
        '.difficulty-selection'
    );

    difficultySelectionBlock.addEventListener('click', (event) => {
        const { target } = event;
        event.preventDefault();

        if (target.dataset.cards) {
            target.parentElement.childNodes.forEach((element) => {
                element.classList.remove('difficulty-selection__level_focus');
            });

            target.classList.add('difficulty-selection__level_focus');

            window.application.cardsNumber = target.dataset.cards;
        }

        if (target.dataset.button_start && window.application.cardsNumber > 0) {
            game.innerHTML = '';
            window.application.renderScreen('game-screen');
        }
    });
}

function renderCards(container) {
    function createBlock() {
        return {
            tag: 'div',
            cls: 'card',
            content: [
                {
                    tag: 'p',
                    cls: 'card__title',
                    content:
                        window.application.cards.cardTitle[
                            window.application.randomTitle
                        ],
                },

                {
                    tag: 'img',
                    cls: 'card__image',
                    attrs: {
                        src: window.application.cards.cardSuitLittle[
                            window.application.randomSuit
                        ],
                    },
                },

                {
                    tag: 'img',
                    cls: 'card__image_big',
                    attrs: {
                        src: window.application.cards.cardSuitBig[
                            window.application.randomSuit
                        ],
                    },
                },

                {
                    tag: 'div',
                    cls: 'card__box-title_rotate',
                    content: [
                        {
                            tag: 'p',
                            cls: 'card__title_rotate',
                            content:
                                window.application.cards.cardTitle[
                                    window.application.randomTitle
                                ],
                        },
                    ],
                },

                {
                    tag: 'img',
                    cls: 'card__image_rotate',
                    attrs: {
                        src: window.application.cards.cardSuitLittle[
                            window.application.randomSuit
                        ],
                    },
                },
            ],
        };
    }
    container.appendChild(templateEngine(createBlock()));
}

window.application.blocks['start-block'] = renderDifficultySelectionBlock;
window.application.blocks['card'] = renderCards;
