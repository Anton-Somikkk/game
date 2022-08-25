/* eslint-disable prettier/prettier */

declare global {
    interface Window {
        application?: any;
    }
}
const game = document.querySelector('.game');

import templateEngine from './template-engine';
import startingGameAgain from './script';

function renderDifficultySelectionBlock() {
    function createBlock() {
        return {
            tag: 'div',
            cls: 'difficulty-selection',
            content: [
                {
                    tag: 'h1',
                    cls: 'difficulty-selection__title',
                    content: 'Выберите сложность',
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
                    content: 'Старт',
                },
            ],
        };
    }

    game.appendChild(templateEngine(createBlock()));

    const difficultySelectionBlock = document.querySelector(
        '.difficulty-selection'
    );

    window.application.cardsNumber = 0;

    difficultySelectionBlock.addEventListener('click', (event) => {
        const target = event.target as HTMLTextAreaElement;
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
            cls: 'card__box',
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
                    tag: 'div',
                    cls: [
                        'card__image',
                        window.application.cards.cardSuitLittle[
                            window.application.randomSuit
                        ],
                    ],
                },

                {
                    tag: 'div',
                    cls: [
                        'card__image_big',
                        window.application.cards.cardSuitBig[
                            window.application.randomSuit
                        ],
                    ],
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
                    tag: 'div',
                    cls: [
                        'card__image_rotate',
                        window.application.cards.cardSuitLittle[
                            window.application.randomSuit
                        ],
                    ],
                },
            ],
        };
    }
    container.appendChild(templateEngine(createBlock()));
}

function renderWinBlock(container: HTMLElement) {
    function createBlock() {
        return {
            tag: 'div',
            cls: ['result__background', 'center'],
            content: [
                {
                    tag: 'div',
                    cls: 'result__window',
                    content: [
                        {
                            tag: 'div',
                            cls: 'result__image_win',
                        },

                        {
                            tag: 'h1',
                            cls: 'result__title',
                            content: 'Вы выиграли!',
                        },

                        {
                            tag: 'div',
                            cls: 'result__time-box',
                            content: [
                                {
                                    tag: 'p',
                                    cls: 'result__time-message',
                                    content: 'Затраченное время',
                                },
                                {
                                    tag: 'div',
                                    cls: 'result__time-min-sec',
                                    content: [
                                        {
                                            tag: 'div',
                                            cls: 'result__time',
                                            content: window.application.min,
                                        },
                                        {
                                            tag: 'div',
                                            cls: 'result__time',
                                            content: window.application.sec,
                                        },
                                    ],
                                },
                            ],
                        },

                        {
                            tag: 'button',
                            cls: 'result__button',
                            attrs: {
                                'data-button': 'play-again',
                            },
                            content: 'Играть снова',
                        },
                    ],
                },
            ],
        };
    }
    container.appendChild(templateEngine(createBlock()));

    startingGameAgain();
}

function renderLoseBlock(container) {
    function createBlock() {
        return {
            tag: 'div',
            cls: ['result__background', 'center'],
            content: [
                {
                    tag: 'div',
                    cls: 'result__window',
                    content: [
                        {
                            tag: 'div',
                            cls: 'result__image_lose',
                        },

                        {
                            tag: 'h1',
                            cls: 'result__title',
                            content: 'Вы проиграли!',
                        },

                        {
                            tag: 'div',
                            cls: 'result__time-box',
                            content: [
                                {
                                    tag: 'p',
                                    cls: 'result__time-message',
                                    content: 'Затраченное время',
                                },
                                {
                                    tag: 'div',
                                    cls: 'result__time-min-sec',
                                    content: [
                                        {
                                            tag: 'div',
                                            cls: 'result__time',
                                            content: window.application.min,
                                        },
                                        {
                                            tag: 'div',
                                            cls: 'result__time',
                                            content: window.application.sec,
                                        },
                                    ],
                                },
                            ],
                        },

                        {
                            tag: 'button',
                            cls: 'result__button',
                            attrs: {
                                'data-button': 'play-again',
                            },
                            content: 'Играть снова',
                        },
                    ],
                },
            ],
        };
    }
    container.appendChild(templateEngine(createBlock()));

    startingGameAgain();
}

window.application.blocks['start-block'] = renderDifficultySelectionBlock;
window.application.blocks['card'] = renderCards;
window.application.blocks['win-block'] = renderWinBlock;
window.application.blocks['lose-block'] = renderLoseBlock;
