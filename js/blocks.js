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
                                'data-level': '1',
                            },
                            content: '1',
                        },

                        {
                            tag: 'div',
                            cls: 'difficulty-selection__level',
                            attrs: {
                                'data-level': '2',
                            },
                            content: '2',
                        },

                        {
                            tag: 'div',
                            cls: 'difficulty-selection__level',
                            attrs: {
                                'data-level': '3',
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
        }
    }

    game.appendChild(templateEngine(createBlock()));

    const difficultySelectionBlock = document.querySelector('.difficulty-selection');
    const button = document.querySelector('.difficulty-selection__button');

    difficultySelectionBlock.addEventListener('click', (event) => {

        const { target } = event;
        event.preventDefault();

        if (target.dataset.level) {

            target.parentElement.childNodes.forEach(element => {

                element.classList.remove('difficulty-selection__level_focus');
            });

            target.classList.add('difficulty-selection__level_focus');

            target.dataset.level = window.application.level;
            button.dataset.button_start = target.dataset.level;

        }

        if (target.dataset.button_start) {


            game.innerHTML = '';
            window.application.renderScreen('game-screen');

        }
    });
}

window.application.blocks['start-block'] = renderDifficultySelectionBlock;
