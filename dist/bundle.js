/* eslint-disable camelcase */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/blocks.js":
/*!**********************!*\
  !*** ./js/blocks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _template_engine_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template-engine.js */ "./js/template-engine.js");
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

    game.appendChild((0,_template_engine_js__WEBPACK_IMPORTED_MODULE_0__["default"])(createBlock()));

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
                    cls: ['card__image_rotate', window.application.cards.cardSuitLittle[
                        window.application.randomSuit
                    ]],
                  
                },
            ],
        };
    }
    container.appendChild((0,_template_engine_js__WEBPACK_IMPORTED_MODULE_0__["default"])(createBlock()));
}

window.application.blocks['start-block'] = renderDifficultySelectionBlock;
window.application.blocks['card'] = renderCards;


/***/ }),

/***/ "./js/screens.js":
/*!***********************!*\
  !*** ./js/screens.js ***!
  \***********************/
/***/ (() => {

/* eslint-disable prettier/prettier */
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
        window.application.resultOfMove = [];
        window.application.stepNumber = 0;

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

            if (
                window.application.resultOfMove.length !== 0 &&
                window.application.resultOfMove !==
                    window.application.cardsCollection[target.id]
            ) {
                setTimeout(() => {
                    alert('Вы проиграли(');
                }, 200);
            } else if (
                window.application.resultOfMove.length !== 0 &&
                window.application.resultOfMove ===
                    window.application.cardsCollection[target.id]
            ) {
                window.application.resultOfMove = [];
                window.application.stepNumber++;
            } else if (window.application.resultOfMove.length === 0) {
                window.application.stepNumber++;

                window.application.resultOfMove =
                    window.application.cardsCollection[target.id];
            }

            if (
                String(window.application.stepNumber) ===
                window.application.cardsNumber
            ) {
                setTimeout(() => {
                    alert('Вы выиграли)');
                }, 200);
            }
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


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ (() => {

/* eslint-disable prettier/prettier */
window.application = {
    blocks: {},
    screens: {},
    cardsNumber: 0,
    cards: {
        cardTitle: ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
        cardSuitLittle: [
            'card__image_diamonds-little',
            'card__image_clubs-little',
            'card__image_hearts-little',
            'card__image_peaks-little',
        ],
        cardSuitBig: [
            'card__image_diamonds-big',
            'card__image_clubs-big',
            'card__image_hearts-big',
            'card__image_peaks-big',
        ],
    },
    randomTitle: undefined,
    randomSuit: undefined,
    cardsCollection: [],
    resultOfMove: [],
    stepNumber: 0,
    renderScreen: function (screenName) {
        window.application.screens[screenName]();
    },

    renderBlock: function (blockName, container) {
        window.application.blocks[blockName](container);
    },
};


/***/ }),

/***/ "./js/template-engine.js":
/*!*******************************!*\
  !*** ./js/template-engine.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function templateEngine(block) {
    if (block === undefined || block === null || block === false) {
        return document.createTextNode('');
    }
    if (
        typeof block === 'string' ||
        typeof block === 'number' ||
        block === true
    ) {
        return document.createTextNode(block);
    }
    if (Array.isArray(block)) {
        const fragment = document.createDocumentFragment();

        block.forEach((element) => {
            fragment.appendChild(templateEngine(element));
        });

        return fragment;
    }

    const result = document.createElement(block.tag);

    if (block.cls) {
        const classes = [].concat(block.cls);
        classes.forEach((cls) => {
            result.classList.add(cls);
        });
    }

    if (block.attrs) {
        const keys = Object.keys(block.attrs);

        keys.forEach((key) => {
            result.setAttribute(key, block.attrs[key]);
        });
    }

    result.appendChild(templateEngine(block.content));

    return result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (templateEngine);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./css/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./css/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../img/shirt.svg */ "./img/shirt.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../img/diamonds-little.svg */ "./img/diamonds-little.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../img/diamonds.svg */ "./img/diamonds.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../img/clubs-little.svg */ "./img/clubs-little.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../img/clubs.svg */ "./img/clubs.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ../img/hearts-little.svg */ "./img/hearts-little.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ../img/hearts.svg */ "./img/hearts.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ../img/peaks-little.svg */ "./img/peaks-little.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ../img/peaks.svg */ "./img/peaks.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* stylelint-disable prettier/prettier */\r\n/* stylelint-disable selector-class-pattern */\r\n/* stylelint-disable font-family-no-missing-generic-family-keyword */\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nbody {\r\n    font-family: Stratos;\r\n}\r\n\r\n.center {\r\n    padding-left: calc(50% - 1024px / 2);\r\n    padding-right: calc(50% - 1024px / 2);\r\n}\r\n\r\n.game {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: #004980;\r\n    height: 100vh;\r\n    padding-top: 20px;\r\n}\r\n\r\n.difficulty-selection {\r\n    position: fixed;\r\n    z-index: 100;\r\n    top: calc(50% - 230px);\r\n    left: calc(50% - 240px);\r\n    padding-top: 52px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    width: 480px;\r\n    height: 459px;\r\n    background: #c2f5ff;\r\n    border-radius: 12px;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.difficulty-selection__title {\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    font-size: 40px;\r\n    line-height: 48px;\r\n    max-width: 208px;\r\n    text-align: center;\r\n    color: #004980;\r\n    margin-bottom: 48px;\r\n}\r\n\r\n.difficulty-selection__box {\r\n    display: flex;\r\n    gap: 24px;\r\n    margin-bottom: 67px;\r\n}\r\n\r\n.difficulty-selection__level {\r\n    width: 98px;\r\n    height: 98px;\r\n    background: #fff;\r\n    border-radius: 12px;\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    font-size: 64px;\r\n    line-height: 72px;\r\n    color: #0080c1;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    cursor: pointer;\r\n}\r\n\r\n.difficulty-selection__level_focus {\r\n    background: #0080c1;\r\n    color: #fff;\r\n}\r\n\r\n.difficulty-selection__button {\r\n    font-family: Stratos;\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    font-size: 24px;\r\n    line-height: 32px;\r\n    background: #7ac100;\r\n    border: none;\r\n    border-radius: 12px;\r\n    color: #fff;\r\n    box-sizing: border-box;\r\n    width: 246px;\r\n    height: 50px;\r\n    cursor: pointer;\r\n}\r\n\r\n.difficulty-selection__button:hover {\r\n    background: #8ddf00;\r\n}\r\n\r\n.difficulty-selection__button:active {\r\n    background: #5e9400;\r\n}\r\n\r\n.header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    margin-bottom: 40px;\r\n    width: 647px;\r\n}\r\n\r\n.header__start-again-button {\r\n    width: 246px;\r\n    height: 50px;\r\n    background: #7ac100;\r\n    border-radius: 12px;\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    font-size: 24px;\r\n    line-height: 32px;\r\n    color: #fff;\r\n    box-sizing: border-box;\r\n    cursor: pointer;\r\n}\r\n\r\n.header__start-again-button:hover {\r\n    background: #8ddf00;\r\n}\r\n\r\n.header__start-again-button:active {\r\n    background: #5e9400;\r\n}\r\n\r\n.game-box {\r\n    display: flex;\r\n    align-items: center;\r\n    align-content: flex-start;\r\n    flex-wrap: wrap;\r\n    gap: 15px 15px;\r\n    box-sizing: border-box;\r\n    width: 647px;\r\n    height: 579px;\r\n}\r\n\r\n.inverted-card {\r\n    width: 95px;\r\n    height: 133px;\r\n    background: #fff;\r\n    border-radius: 4px;\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n    cursor: pointer;\r\n}\r\n\r\n.inverted-card:hover {\r\n    transform: scale(1.05);\r\n    box-shadow: 0 0 7px #888;\r\n}\r\n\r\n.card {\r\n    display: flex;\r\n    width: 95px;\r\n    height: 133px;\r\n    background: #fff;\r\n    border-radius: 4px;\r\n    box-sizing: border-box;\r\n    position: relative;\r\n    z-index: 50;\r\n}\r\n\r\n.card__image_big {\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n    margin: auto;\r\n    height: 25px;\r\n    background-repeat: no-repeat;\r\n    background-position: center;\r\n}\r\n\r\n.card__image {\r\n    position: absolute;\r\n    left: 10px;\r\n    top: 28px;\r\n    right: 0;\r\n    bottom: 0;\r\n    height: 6px;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.card__image_diamonds-little {\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\r\n}\r\n\r\n.card__image_diamonds-big {\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\r\n}\r\n\r\n.card__image_clubs-little {\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\r\n}\r\n\r\n.card__image_clubs-big {\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\r\n}\r\n\r\n.card__image_hearts-little {\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\r\n}\r\n\r\n.card__image_hearts-big {\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");\r\n}\r\n\r\n.card__image_peaks-little {\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ");\r\n}\r\n\r\n.card__image_peaks-big {\r\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ");\r\n}\r\n\r\n.card__image_rotate {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 97px;\r\n    right: 7px;\r\n    bottom: 0;\r\n    height: 6px;\r\n    transform: rotate(-180deg);\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.card__title {\r\n    position: absolute;\r\n    left: 6px;\r\n    top: 0;\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    font-size: 24px;\r\n    line-height: 32px;\r\n    color: #000;\r\n}\r\n\r\n.card__box-title_rotate {\r\n    position: absolute;\r\n    left: 61px;\r\n    top: 100px;\r\n    width: 30px;\r\n}\r\n\r\n.card__title_rotate {\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    font-size: 24px;\r\n    line-height: 32px;\r\n    color: #000;\r\n    transform: rotate(-180deg);\r\n}\r\n", "",{"version":3,"sources":["webpack://./css/style.css"],"names":[],"mappings":"AAAA,wCAAwC;AACxC,6CAA6C;AAC7C,oEAAoE;;AAEpE;IACI,SAAS;IACT,UAAU;AACd;;AAEA;IACI,oBAAoB;AACxB;;AAEA;IACI,oCAAoC;IACpC,qCAAqC;AACzC;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,yBAAyB;IACzB,aAAa;IACb,iBAAiB;AACrB;;AAEA;IACI,eAAe;IACf,YAAY;IACZ,sBAAsB;IACtB,uBAAuB;IACvB,iBAAiB;IACjB,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,mBAAmB;IACnB,sBAAsB;AAC1B;;AAEA;IACI,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;IACf,iBAAiB;IACjB,gBAAgB;IAChB,kBAAkB;IAClB,cAAc;IACd,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,SAAS;IACT,mBAAmB;AACvB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,gBAAgB;IAChB,mBAAmB;IACnB,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;IACf,iBAAiB;IACjB,cAAc;IACd,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,eAAe;AACnB;;AAEA;IACI,mBAAmB;IACnB,WAAW;AACf;;AAEA;IACI,oBAAoB;IACpB,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;IACf,iBAAiB;IACjB,mBAAmB;IACnB,YAAY;IACZ,mBAAmB;IACnB,WAAW;IACX,sBAAsB;IACtB,YAAY;IACZ,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;IACnB,YAAY;AAChB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,mBAAmB;IACnB,mBAAmB;IACnB,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;IACf,iBAAiB;IACjB,WAAW;IACX,sBAAsB;IACtB,eAAe;AACnB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,yBAAyB;IACzB,eAAe;IACf,cAAc;IACd,sBAAsB;IACtB,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI,WAAW;IACX,aAAa;IACb,gBAAgB;IAChB,kBAAkB;IAClB,yDAAyC;IACzC,eAAe;AACnB;;AAEA;IACI,sBAAsB;IACtB,wBAAwB;AAC5B;;AAEA;IACI,aAAa;IACb,WAAW;IACX,aAAa;IACb,gBAAgB;IAChB,kBAAkB;IAClB,sBAAsB;IACtB,kBAAkB;IAClB,WAAW;AACf;;AAEA;IACI,kBAAkB;IAClB,MAAM;IACN,SAAS;IACT,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,YAAY;IACZ,4BAA4B;IAC5B,2BAA2B;AAC/B;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,SAAS;IACT,QAAQ;IACR,SAAS;IACT,WAAW;IACX,4BAA4B;AAChC;;AAEA;IACI,yDAAmD;AACvD;;AAEA;IACI,yDAA4C;AAChD;;AAEA;IACI,yDAAgD;AACpD;;AAEA;IACI,yDAAyC;AAC7C;;AAEA;IACI,yDAAiD;AACrD;;AAEA;IACI,yDAA0C;AAC9C;;AAEA;IACI,yDAAgD;AACpD;;AAEA;IACI,yDAAyC;AAC7C;;AAEA;IACI,kBAAkB;IAClB,OAAO;IACP,SAAS;IACT,UAAU;IACV,SAAS;IACT,WAAW;IACX,0BAA0B;IAC1B,4BAA4B;AAChC;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,MAAM;IACN,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;IACf,iBAAiB;IACjB,WAAW;AACf;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,UAAU;IACV,WAAW;AACf;;AAEA;IACI,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;IACf,iBAAiB;IACjB,WAAW;IACX,0BAA0B;AAC9B","sourcesContent":["/* stylelint-disable prettier/prettier */\r\n/* stylelint-disable selector-class-pattern */\r\n/* stylelint-disable font-family-no-missing-generic-family-keyword */\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nbody {\r\n    font-family: Stratos;\r\n}\r\n\r\n.center {\r\n    padding-left: calc(50% - 1024px / 2);\r\n    padding-right: calc(50% - 1024px / 2);\r\n}\r\n\r\n.game {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    background-color: #004980;\r\n    height: 100vh;\r\n    padding-top: 20px;\r\n}\r\n\r\n.difficulty-selection {\r\n    position: fixed;\r\n    z-index: 100;\r\n    top: calc(50% - 230px);\r\n    left: calc(50% - 240px);\r\n    padding-top: 52px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    width: 480px;\r\n    height: 459px;\r\n    background: #c2f5ff;\r\n    border-radius: 12px;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.difficulty-selection__title {\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    font-size: 40px;\r\n    line-height: 48px;\r\n    max-width: 208px;\r\n    text-align: center;\r\n    color: #004980;\r\n    margin-bottom: 48px;\r\n}\r\n\r\n.difficulty-selection__box {\r\n    display: flex;\r\n    gap: 24px;\r\n    margin-bottom: 67px;\r\n}\r\n\r\n.difficulty-selection__level {\r\n    width: 98px;\r\n    height: 98px;\r\n    background: #fff;\r\n    border-radius: 12px;\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    font-size: 64px;\r\n    line-height: 72px;\r\n    color: #0080c1;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    cursor: pointer;\r\n}\r\n\r\n.difficulty-selection__level_focus {\r\n    background: #0080c1;\r\n    color: #fff;\r\n}\r\n\r\n.difficulty-selection__button {\r\n    font-family: Stratos;\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    font-size: 24px;\r\n    line-height: 32px;\r\n    background: #7ac100;\r\n    border: none;\r\n    border-radius: 12px;\r\n    color: #fff;\r\n    box-sizing: border-box;\r\n    width: 246px;\r\n    height: 50px;\r\n    cursor: pointer;\r\n}\r\n\r\n.difficulty-selection__button:hover {\r\n    background: #8ddf00;\r\n}\r\n\r\n.difficulty-selection__button:active {\r\n    background: #5e9400;\r\n}\r\n\r\n.header {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    margin-bottom: 40px;\r\n    width: 647px;\r\n}\r\n\r\n.header__start-again-button {\r\n    width: 246px;\r\n    height: 50px;\r\n    background: #7ac100;\r\n    border-radius: 12px;\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    font-size: 24px;\r\n    line-height: 32px;\r\n    color: #fff;\r\n    box-sizing: border-box;\r\n    cursor: pointer;\r\n}\r\n\r\n.header__start-again-button:hover {\r\n    background: #8ddf00;\r\n}\r\n\r\n.header__start-again-button:active {\r\n    background: #5e9400;\r\n}\r\n\r\n.game-box {\r\n    display: flex;\r\n    align-items: center;\r\n    align-content: flex-start;\r\n    flex-wrap: wrap;\r\n    gap: 15px 15px;\r\n    box-sizing: border-box;\r\n    width: 647px;\r\n    height: 579px;\r\n}\r\n\r\n.inverted-card {\r\n    width: 95px;\r\n    height: 133px;\r\n    background: #fff;\r\n    border-radius: 4px;\r\n    background-image: url('../img/shirt.svg');\r\n    cursor: pointer;\r\n}\r\n\r\n.inverted-card:hover {\r\n    transform: scale(1.05);\r\n    box-shadow: 0 0 7px #888;\r\n}\r\n\r\n.card {\r\n    display: flex;\r\n    width: 95px;\r\n    height: 133px;\r\n    background: #fff;\r\n    border-radius: 4px;\r\n    box-sizing: border-box;\r\n    position: relative;\r\n    z-index: 50;\r\n}\r\n\r\n.card__image_big {\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n    margin: auto;\r\n    height: 25px;\r\n    background-repeat: no-repeat;\r\n    background-position: center;\r\n}\r\n\r\n.card__image {\r\n    position: absolute;\r\n    left: 10px;\r\n    top: 28px;\r\n    right: 0;\r\n    bottom: 0;\r\n    height: 6px;\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.card__image_diamonds-little {\r\n    background-image: url('../img/diamonds-little.svg');\r\n}\r\n\r\n.card__image_diamonds-big {\r\n    background-image: url('../img/diamonds.svg');\r\n}\r\n\r\n.card__image_clubs-little {\r\n    background-image: url('../img/clubs-little.svg');\r\n}\r\n\r\n.card__image_clubs-big {\r\n    background-image: url('../img/clubs.svg');\r\n}\r\n\r\n.card__image_hearts-little {\r\n    background-image: url('../img/hearts-little.svg');\r\n}\r\n\r\n.card__image_hearts-big {\r\n    background-image: url('../img/hearts.svg');\r\n}\r\n\r\n.card__image_peaks-little {\r\n    background-image: url('../img/peaks-little.svg');\r\n}\r\n\r\n.card__image_peaks-big {\r\n    background-image: url('../img/peaks.svg');\r\n}\r\n\r\n.card__image_rotate {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 97px;\r\n    right: 7px;\r\n    bottom: 0;\r\n    height: 6px;\r\n    transform: rotate(-180deg);\r\n    background-repeat: no-repeat;\r\n}\r\n\r\n.card__title {\r\n    position: absolute;\r\n    left: 6px;\r\n    top: 0;\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    font-size: 24px;\r\n    line-height: 32px;\r\n    color: #000;\r\n}\r\n\r\n.card__box-title_rotate {\r\n    position: absolute;\r\n    left: 61px;\r\n    top: 100px;\r\n    width: 30px;\r\n}\r\n\r\n.card__title_rotate {\r\n    font-style: normal;\r\n    font-weight: 400;\r\n    font-size: 24px;\r\n    line-height: 32px;\r\n    color: #000;\r\n    transform: rotate(-180deg);\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./css/stylesheet.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./css/stylesheet.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Black.woff2 */ "./fonts/Stratos-Black.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Black.woff */ "./fonts/Stratos-Black.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Bold.woff2 */ "./fonts/Stratos-Bold.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Bold.woff */ "./fonts/Stratos-Bold.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-BlackItalic.woff2 */ "./fonts/Stratos-BlackItalic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-BlackItalic.woff */ "./fonts/Stratos-BlackItalic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-BoldItalic.woff2 */ "./fonts/Stratos-BoldItalic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-BoldItalic.woff */ "./fonts/Stratos-BoldItalic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-ExtraBold.woff2 */ "./fonts/Stratos-ExtraBold.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-ExtraBold.woff */ "./fonts/Stratos-ExtraBold.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-ExtraBoldItalic.woff2 */ "./fonts/Stratos-ExtraBoldItalic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-ExtraBoldItalic.woff */ "./fonts/Stratos-ExtraBoldItalic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_12___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-ExtraLight.woff2 */ "./fonts/Stratos-ExtraLight.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_13___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-ExtraLight.woff */ "./fonts/Stratos-ExtraLight.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_14___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-ExtraLightItalic.woff2 */ "./fonts/Stratos-ExtraLightItalic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_15___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-ExtraLightItalic.woff */ "./fonts/Stratos-ExtraLightItalic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_16___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Light.woff2 */ "./fonts/Stratos-Light.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_17___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Light.woff */ "./fonts/Stratos-Light.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_18___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Italic.woff2 */ "./fonts/Stratos-Italic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_19___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Italic.woff */ "./fonts/Stratos-Italic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_20___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-LightItalic.woff2 */ "./fonts/Stratos-LightItalic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_21___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-LightItalic.woff */ "./fonts/Stratos-LightItalic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_22___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Medium.woff2 */ "./fonts/Stratos-Medium.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_23___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Medium.woff */ "./fonts/Stratos-Medium.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_24___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-MediumItalic.woff2 */ "./fonts/Stratos-MediumItalic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_25___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-MediumItalic.woff */ "./fonts/Stratos-MediumItalic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_26___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Regular.woff2 */ "./fonts/Stratos-Regular.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_27___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Regular.woff */ "./fonts/Stratos-Regular.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_28___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-SemiBold.woff2 */ "./fonts/Stratos-SemiBold.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_29___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-SemiBold.woff */ "./fonts/Stratos-SemiBold.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_30___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-SemiBoldItalic.woff2 */ "./fonts/Stratos-SemiBoldItalic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_31___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-SemiBoldItalic.woff */ "./fonts/Stratos-SemiBoldItalic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_32___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-SemiLight.woff2 */ "./fonts/Stratos-SemiLight.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_33___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-SemiLight.woff */ "./fonts/Stratos-SemiLight.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_34___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Thin.woff2 */ "./fonts/Stratos-Thin.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_35___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-Thin.woff */ "./fonts/Stratos-Thin.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_36___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-ThinItalic.woff2 */ "./fonts/Stratos-ThinItalic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_37___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-ThinItalic.woff */ "./fonts/Stratos-ThinItalic.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_38___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-SemiLightItalic.woff2 */ "./fonts/Stratos-SemiLightItalic.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_39___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Stratos-SemiLightItalic.woff */ "./fonts/Stratos-SemiLightItalic.woff"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
var ___CSS_LOADER_URL_REPLACEMENT_10___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_10___);
var ___CSS_LOADER_URL_REPLACEMENT_11___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_11___);
var ___CSS_LOADER_URL_REPLACEMENT_12___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_12___);
var ___CSS_LOADER_URL_REPLACEMENT_13___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_13___);
var ___CSS_LOADER_URL_REPLACEMENT_14___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_14___);
var ___CSS_LOADER_URL_REPLACEMENT_15___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_15___);
var ___CSS_LOADER_URL_REPLACEMENT_16___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_16___);
var ___CSS_LOADER_URL_REPLACEMENT_17___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_17___);
var ___CSS_LOADER_URL_REPLACEMENT_18___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_18___);
var ___CSS_LOADER_URL_REPLACEMENT_19___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_19___);
var ___CSS_LOADER_URL_REPLACEMENT_20___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_20___);
var ___CSS_LOADER_URL_REPLACEMENT_21___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_21___);
var ___CSS_LOADER_URL_REPLACEMENT_22___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_22___);
var ___CSS_LOADER_URL_REPLACEMENT_23___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_23___);
var ___CSS_LOADER_URL_REPLACEMENT_24___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_24___);
var ___CSS_LOADER_URL_REPLACEMENT_25___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_25___);
var ___CSS_LOADER_URL_REPLACEMENT_26___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_26___);
var ___CSS_LOADER_URL_REPLACEMENT_27___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_27___);
var ___CSS_LOADER_URL_REPLACEMENT_28___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_28___);
var ___CSS_LOADER_URL_REPLACEMENT_29___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_29___);
var ___CSS_LOADER_URL_REPLACEMENT_30___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_30___);
var ___CSS_LOADER_URL_REPLACEMENT_31___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_31___);
var ___CSS_LOADER_URL_REPLACEMENT_32___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_32___);
var ___CSS_LOADER_URL_REPLACEMENT_33___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_33___);
var ___CSS_LOADER_URL_REPLACEMENT_34___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_34___);
var ___CSS_LOADER_URL_REPLACEMENT_35___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_35___);
var ___CSS_LOADER_URL_REPLACEMENT_36___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_36___);
var ___CSS_LOADER_URL_REPLACEMENT_37___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_37___);
var ___CSS_LOADER_URL_REPLACEMENT_38___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_38___);
var ___CSS_LOADER_URL_REPLACEMENT_39___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_39___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* stylelint-disable prettier/prettier */\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff');\r\n    font-weight: 900;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('woff');\r\n    font-weight: 900;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('woff');\r\n    font-weight: bold;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") format('woff');\r\n    font-weight: 900;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ") format('woff');\r\n    font-weight: bold;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ") format('woff');\r\n    font-weight: bold;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ") format('woff');\r\n    font-weight: bold;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_12___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + ") format('woff');\r\n    font-weight: 200;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_15___ + ") format('woff');\r\n    font-weight: 200;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_16___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_17___ + ") format('woff');\r\n    font-weight: 300;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_18___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_19___ + ") format('woff');\r\n    font-weight: normal;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_20___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_21___ + ") format('woff');\r\n    font-weight: 300;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_22___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_23___ + ") format('woff');\r\n    font-weight: 500;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_24___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_25___ + ") format('woff');\r\n    font-weight: 500;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_26___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_27___ + ") format('woff');\r\n    font-weight: normal;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_28___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_29___ + ") format('woff');\r\n    font-weight: 600;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_30___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_31___ + ") format('woff');\r\n    font-weight: 600;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos-SemiLight;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_32___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_33___ + ") format('woff');\r\n    font-weight: 300;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_34___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_35___ + ") format('woff');\r\n    font-weight: 100;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_36___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_37___ + ") format('woff');\r\n    font-weight: 100;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos-SemiLight;\r\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_38___ + ") format('woff2'),\r\n        url(" + ___CSS_LOADER_URL_REPLACEMENT_39___ + ") format('woff');\r\n    font-weight: 300;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n", "",{"version":3,"sources":["webpack://./css/stylesheet.css"],"names":[],"mappings":"AAAA,wCAAwC;AACxC;IACI,oBAAoB;IACpB;8DACqD;IACrD,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;8DACqD;IACrD,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;8DACoD;IACpD,iBAAiB;IACjB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;8DAC2D;IAC3D,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;8DAC0D;IAC1D,iBAAiB;IACjB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;8DACyD;IACzD,iBAAiB;IACjB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;+DAC+D;IAC/D,iBAAiB;IACjB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;+DAC0D;IAC1D,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;+DACgE;IAChE,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;+DACqD;IACrD,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;+DACsD;IACtD,mBAAmB;IACnB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;+DAC2D;IAC3D,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;+DACsD;IACtD,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;+DAC4D;IAC5D,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;+DACuD;IACvD,mBAAmB;IACnB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;+DACwD;IACxD,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;+DAC8D;IAC9D,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,8BAA8B;IAC9B;+DACyD;IACzD,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;+DACoD;IACpD,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,oBAAoB;IACpB;+DAC0D;IAC1D,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,8BAA8B;IAC9B;+DAC+D;IAC/D,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;AACtB","sourcesContent":["/* stylelint-disable prettier/prettier */\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-Black.woff2') format('woff2'),\r\n        url('../fonts/Stratos-Black.woff') format('woff');\r\n    font-weight: 900;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-Black.woff2') format('woff2'),\r\n        url('../fonts/Stratos-Black.woff') format('woff');\r\n    font-weight: 900;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-Bold.woff2') format('woff2'),\r\n        url('../fonts/Stratos-Bold.woff') format('woff');\r\n    font-weight: bold;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-BlackItalic.woff2') format('woff2'),\r\n        url('../fonts/Stratos-BlackItalic.woff') format('woff');\r\n    font-weight: 900;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-BoldItalic.woff2') format('woff2'),\r\n        url('../fonts/Stratos-BoldItalic.woff') format('woff');\r\n    font-weight: bold;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-ExtraBold.woff2') format('woff2'),\r\n        url('../fonts/Stratos-ExtraBold.woff') format('woff');\r\n    font-weight: bold;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-ExtraBoldItalic.woff2') format('woff2'),\r\n        url('../fonts/Stratos-ExtraBoldItalic.woff') format('woff');\r\n    font-weight: bold;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-ExtraLight.woff2') format('woff2'),\r\n        url('../fonts/Stratos-ExtraLight.woff') format('woff');\r\n    font-weight: 200;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-ExtraLightItalic.woff2') format('woff2'),\r\n        url('../fonts/Stratos-ExtraLightItalic.woff') format('woff');\r\n    font-weight: 200;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-Light.woff2') format('woff2'),\r\n        url('../fonts/Stratos-Light.woff') format('woff');\r\n    font-weight: 300;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-Italic.woff2') format('woff2'),\r\n        url('../fonts/Stratos-Italic.woff') format('woff');\r\n    font-weight: normal;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-LightItalic.woff2') format('woff2'),\r\n        url('../fonts/Stratos-LightItalic.woff') format('woff');\r\n    font-weight: 300;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-Medium.woff2') format('woff2'),\r\n        url('../fonts/Stratos-Medium.woff') format('woff');\r\n    font-weight: 500;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-MediumItalic.woff2') format('woff2'),\r\n        url('../fonts/Stratos-MediumItalic.woff') format('woff');\r\n    font-weight: 500;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-Regular.woff2') format('woff2'),\r\n        url('../fonts/Stratos-Regular.woff') format('woff');\r\n    font-weight: normal;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-SemiBold.woff2') format('woff2'),\r\n        url('../fonts/Stratos-SemiBold.woff') format('woff');\r\n    font-weight: 600;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-SemiBoldItalic.woff2') format('woff2'),\r\n        url('../fonts/Stratos-SemiBoldItalic.woff') format('woff');\r\n    font-weight: 600;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos-SemiLight;\r\n    src: url('../fonts/Stratos-SemiLight.woff2') format('woff2'),\r\n        url('../fonts/Stratos-SemiLight.woff') format('woff');\r\n    font-weight: 300;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-Thin.woff2') format('woff2'),\r\n        url('../fonts/Stratos-Thin.woff') format('woff');\r\n    font-weight: 100;\r\n    font-style: normal;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos;\r\n    src: url('../fonts/Stratos-ThinItalic.woff2') format('woff2'),\r\n        url('../fonts/Stratos-ThinItalic.woff') format('woff');\r\n    font-weight: 100;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n\r\n@font-face {\r\n    font-family: Stratos-SemiLight;\r\n    src: url('../fonts/Stratos-SemiLightItalic.woff2') format('woff2'),\r\n        url('../fonts/Stratos-SemiLightItalic.woff') format('woff');\r\n    font-weight: 300;\r\n    font-style: italic;\r\n    font-display: swap;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id !== null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./css/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./css/stylesheet.css":
/*!****************************!*\
  !*** ./css/stylesheet.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_stylesheet_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./stylesheet.css */ "./node_modules/css-loader/dist/cjs.js!./css/stylesheet.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_stylesheet_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_stylesheet_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_stylesheet_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_stylesheet_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./fonts/Stratos-Black.woff":
/*!**********************************!*\
  !*** ./fonts/Stratos-Black.woff ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ccf619f56325010739e0.woff";

/***/ }),

/***/ "./fonts/Stratos-Black.woff2":
/*!***********************************!*\
  !*** ./fonts/Stratos-Black.woff2 ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e98538e362f42fd549d1.woff2";

/***/ }),

/***/ "./fonts/Stratos-BlackItalic.woff":
/*!****************************************!*\
  !*** ./fonts/Stratos-BlackItalic.woff ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "148c7f369d8f86afe317.woff";

/***/ }),

/***/ "./fonts/Stratos-BlackItalic.woff2":
/*!*****************************************!*\
  !*** ./fonts/Stratos-BlackItalic.woff2 ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "485e2926a49b6af9284c.woff2";

/***/ }),

/***/ "./fonts/Stratos-Bold.woff":
/*!*********************************!*\
  !*** ./fonts/Stratos-Bold.woff ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0ec050e8b2c45e9fafbc.woff";

/***/ }),

/***/ "./fonts/Stratos-Bold.woff2":
/*!**********************************!*\
  !*** ./fonts/Stratos-Bold.woff2 ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "158be9a7d402ea5d2e02.woff2";

/***/ }),

/***/ "./fonts/Stratos-BoldItalic.woff":
/*!***************************************!*\
  !*** ./fonts/Stratos-BoldItalic.woff ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ad345710770b855ae3ed.woff";

/***/ }),

/***/ "./fonts/Stratos-BoldItalic.woff2":
/*!****************************************!*\
  !*** ./fonts/Stratos-BoldItalic.woff2 ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7adad4afaa7a80ae91e7.woff2";

/***/ }),

/***/ "./fonts/Stratos-ExtraBold.woff":
/*!**************************************!*\
  !*** ./fonts/Stratos-ExtraBold.woff ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "afb4844f86c63484036d.woff";

/***/ }),

/***/ "./fonts/Stratos-ExtraBold.woff2":
/*!***************************************!*\
  !*** ./fonts/Stratos-ExtraBold.woff2 ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "42e833c2a288c0aa892b.woff2";

/***/ }),

/***/ "./fonts/Stratos-ExtraBoldItalic.woff":
/*!********************************************!*\
  !*** ./fonts/Stratos-ExtraBoldItalic.woff ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "da8e7c65e873f11ca460.woff";

/***/ }),

/***/ "./fonts/Stratos-ExtraBoldItalic.woff2":
/*!*********************************************!*\
  !*** ./fonts/Stratos-ExtraBoldItalic.woff2 ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "8692f598bdebb2663557.woff2";

/***/ }),

/***/ "./fonts/Stratos-ExtraLight.woff":
/*!***************************************!*\
  !*** ./fonts/Stratos-ExtraLight.woff ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a3927d30a68fe8c06188.woff";

/***/ }),

/***/ "./fonts/Stratos-ExtraLight.woff2":
/*!****************************************!*\
  !*** ./fonts/Stratos-ExtraLight.woff2 ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "66e289e08397d77b800b.woff2";

/***/ }),

/***/ "./fonts/Stratos-ExtraLightItalic.woff":
/*!*********************************************!*\
  !*** ./fonts/Stratos-ExtraLightItalic.woff ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "675259a534cc79a3cd91.woff";

/***/ }),

/***/ "./fonts/Stratos-ExtraLightItalic.woff2":
/*!**********************************************!*\
  !*** ./fonts/Stratos-ExtraLightItalic.woff2 ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "98cab11dcd7387b138d6.woff2";

/***/ }),

/***/ "./fonts/Stratos-Italic.woff":
/*!***********************************!*\
  !*** ./fonts/Stratos-Italic.woff ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "075afc486ae416c78e33.woff";

/***/ }),

/***/ "./fonts/Stratos-Italic.woff2":
/*!************************************!*\
  !*** ./fonts/Stratos-Italic.woff2 ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "c39d7191092886548a55.woff2";

/***/ }),

/***/ "./fonts/Stratos-Light.woff":
/*!**********************************!*\
  !*** ./fonts/Stratos-Light.woff ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "40e27f31370fc42d77fa.woff";

/***/ }),

/***/ "./fonts/Stratos-Light.woff2":
/*!***********************************!*\
  !*** ./fonts/Stratos-Light.woff2 ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "4af7e3028af5bc066a56.woff2";

/***/ }),

/***/ "./fonts/Stratos-LightItalic.woff":
/*!****************************************!*\
  !*** ./fonts/Stratos-LightItalic.woff ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "955c2e152a3c21c91266.woff";

/***/ }),

/***/ "./fonts/Stratos-LightItalic.woff2":
/*!*****************************************!*\
  !*** ./fonts/Stratos-LightItalic.woff2 ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f2b73620c9dc4460c3f1.woff2";

/***/ }),

/***/ "./fonts/Stratos-Medium.woff":
/*!***********************************!*\
  !*** ./fonts/Stratos-Medium.woff ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "af41dd82e216fc6fefb1.woff";

/***/ }),

/***/ "./fonts/Stratos-Medium.woff2":
/*!************************************!*\
  !*** ./fonts/Stratos-Medium.woff2 ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6b3b00048286b1d21402.woff2";

/***/ }),

/***/ "./fonts/Stratos-MediumItalic.woff":
/*!*****************************************!*\
  !*** ./fonts/Stratos-MediumItalic.woff ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a89405e0399c9a5078a6.woff";

/***/ }),

/***/ "./fonts/Stratos-MediumItalic.woff2":
/*!******************************************!*\
  !*** ./fonts/Stratos-MediumItalic.woff2 ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e08dc87e735f0d11e06e.woff2";

/***/ }),

/***/ "./fonts/Stratos-Regular.woff":
/*!************************************!*\
  !*** ./fonts/Stratos-Regular.woff ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d20eb275042a513c8d55.woff";

/***/ }),

/***/ "./fonts/Stratos-Regular.woff2":
/*!*************************************!*\
  !*** ./fonts/Stratos-Regular.woff2 ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ec4882423f79afa46408.woff2";

/***/ }),

/***/ "./fonts/Stratos-SemiBold.woff":
/*!*************************************!*\
  !*** ./fonts/Stratos-SemiBold.woff ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9007117748ed42e6e88c.woff";

/***/ }),

/***/ "./fonts/Stratos-SemiBold.woff2":
/*!**************************************!*\
  !*** ./fonts/Stratos-SemiBold.woff2 ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "797ac15426d4c3c19212.woff2";

/***/ }),

/***/ "./fonts/Stratos-SemiBoldItalic.woff":
/*!*******************************************!*\
  !*** ./fonts/Stratos-SemiBoldItalic.woff ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6a25053cb11c3bd07fae.woff";

/***/ }),

/***/ "./fonts/Stratos-SemiBoldItalic.woff2":
/*!********************************************!*\
  !*** ./fonts/Stratos-SemiBoldItalic.woff2 ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "37f2bc25bdcfcff10f87.woff2";

/***/ }),

/***/ "./fonts/Stratos-SemiLight.woff":
/*!**************************************!*\
  !*** ./fonts/Stratos-SemiLight.woff ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "8647973c6f2901010c85.woff";

/***/ }),

/***/ "./fonts/Stratos-SemiLight.woff2":
/*!***************************************!*\
  !*** ./fonts/Stratos-SemiLight.woff2 ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "be4852869dd8aea9b66e.woff2";

/***/ }),

/***/ "./fonts/Stratos-SemiLightItalic.woff":
/*!********************************************!*\
  !*** ./fonts/Stratos-SemiLightItalic.woff ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f00009f97b21eff30cb8.woff";

/***/ }),

/***/ "./fonts/Stratos-SemiLightItalic.woff2":
/*!*********************************************!*\
  !*** ./fonts/Stratos-SemiLightItalic.woff2 ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "1a7b1b60135943712503.woff2";

/***/ }),

/***/ "./fonts/Stratos-Thin.woff":
/*!*********************************!*\
  !*** ./fonts/Stratos-Thin.woff ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "aa5429e2535e1834e2f9.woff";

/***/ }),

/***/ "./fonts/Stratos-Thin.woff2":
/*!**********************************!*\
  !*** ./fonts/Stratos-Thin.woff2 ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "71c2d04e0b24243871e0.woff2";

/***/ }),

/***/ "./fonts/Stratos-ThinItalic.woff":
/*!***************************************!*\
  !*** ./fonts/Stratos-ThinItalic.woff ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "c2141898b87e9dfddb8e.woff";

/***/ }),

/***/ "./fonts/Stratos-ThinItalic.woff2":
/*!****************************************!*\
  !*** ./fonts/Stratos-ThinItalic.woff2 ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6f49ce595703e6045ac7.woff2";

/***/ }),

/***/ "./img/clubs-little.svg":
/*!******************************!*\
  !*** ./img/clubs-little.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "798b068792eb6e6e92ea.svg";

/***/ }),

/***/ "./img/clubs.svg":
/*!***********************!*\
  !*** ./img/clubs.svg ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "7f91ce47ecbf6ae38498.svg";

/***/ }),

/***/ "./img/diamonds-little.svg":
/*!*********************************!*\
  !*** ./img/diamonds-little.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "564dd07af9dbf77d4d8e.svg";

/***/ }),

/***/ "./img/diamonds.svg":
/*!**************************!*\
  !*** ./img/diamonds.svg ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6d6202122f9a41366f7d.svg";

/***/ }),

/***/ "./img/hearts-little.svg":
/*!*******************************!*\
  !*** ./img/hearts-little.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "890b6f41cc9cda1a442a.svg";

/***/ }),

/***/ "./img/hearts.svg":
/*!************************!*\
  !*** ./img/hearts.svg ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "be33f4a44d6f0430c5e0.svg";

/***/ }),

/***/ "./img/peaks-little.svg":
/*!******************************!*\
  !*** ./img/peaks-little.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f5eb871611447ed114a0.svg";

/***/ }),

/***/ "./img/peaks.svg":
/*!***********************!*\
  !*** ./img/peaks.svg ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d5657ff5be305701be57.svg";

/***/ }),

/***/ "./img/shirt.svg":
/*!***********************!*\
  !*** ./img/shirt.svg ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "a766573daf1e73dad53a.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _template_engine_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template-engine.js */ "./js/template-engine.js");
/* harmony import */ var _script_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script.js */ "./js/script.js");
/* harmony import */ var _script_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_script_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _blocks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks.js */ "./js/blocks.js");
/* harmony import */ var _screens_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./screens.js */ "./js/screens.js");
/* harmony import */ var _screens_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_screens_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _css_stylesheet_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../css/stylesheet.css */ "./css/stylesheet.css");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../css/style.css */ "./css/style.css");
/* eslint-disable prettier/prettier */








})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map