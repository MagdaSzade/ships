/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./aiGame.js":
/*!*******************!*\
  !*** ./aiGame.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./board.js\");\r\nconst validateInput = __webpack_require__(/*! ./input */ \"./input.js\");\r\nconst shotField = __webpack_require__(/*! ./output */ \"./output.js\");\r\nconst AutomaticOpponent = __webpack_require__(/*! ./automaticOpponent */ \"./automaticOpponent.js\");\r\nconst information = __webpack_require__(/*! ./information */ \"./information.js\");\r\nconst SetOwnBoard = __webpack_require__(/*! ./setOwnBoard */ \"./setOwnBoard.js\");\r\nconst boardEvent = __webpack_require__(/*! ./setBoardEvent */ \"./setBoardEvent.js\");\r\n\r\nconst playerOneBoardHTML = document.getElementById(\"board\");\r\nconst aoBoardHTML = document.getElementById(\"board2\");\r\nconst fieldsBoardOne = document.getElementById(\"board\").childNodes;\r\nlet eleme = {};\r\n\r\nclass AIGame {\r\n    constructor() {\r\n        //for Player 1\r\n        this.playerOneBoard = new Board();\r\n        this.playerOneBoard.createRandomBoard();\r\n        //for AO\r\n        \r\n        //this.aoBoard = new Board();\r\n        //this.aoBoard.createRandomBoard();\r\n        this.ao = new AutomaticOpponent();\r\n        this.set = new SetOwnBoard();\r\n        this.permission = false;\r\n        this.playerOneHitCounter = 0;\r\n        this.aoHitCounter = 0;\r\n        this.myTurn = false;\r\n    }\r\n\r\n    aiPlayerGame() {\r\n        playerOneBoardHTML.addEventListener(\"tralalalala\", this.isSetedCallback.bind(this))\r\n        this.set.setBoard();\r\n    }\r\n\r\n    isSetedCallback(e) {\r\n        this.aoBoard = this.set.getManualBoard();\r\n        console.log(this.aoBoard);\r\n        Array.from(fieldsBoardOne).forEach(this.setEventListeners.bind(this));\r\n    }\r\n\r\n    setEventListeners(e) {\r\n        e.addEventListener('click',  this.playerOneMove.bind(this), { once: true });\r\n    }\r\n\r\n    playerOneMove(e) {\r\n        if(!this.myTurn) {\r\n            let element = e.currentTarget;\r\n            let moveOne = element.getAttribute('id');\r\n            let value = validateInput(moveOne);\r\n            if (value) {\r\n                let firedField = shotField(value.row, value.col);\r\n                this.playerOneBoard.board[value.row][value.col].isHited = true;\r\n                if (this.playerOneBoard.board[value.row][value.col].type === 'ship') {\r\n                    playerOneBoardHTML.querySelector(firedField).setAttribute(\"src\", \"./img/ships/ship.jpg\");\r\n                    this.playerOneHitCounter++;\r\n                    this.isEndOfGame();\r\n                    information(\"Możesz strzelać jeszcze raz\");\r\n                } else {\r\n                    playerOneBoardHTML.querySelector(firedField).setAttribute(\"src\", \"./img/ships/pudlo.jpg\");\r\n                    this.myTurn = true;\r\n                    information(\"Ruch automatycznego przeciwnika\");\r\n                    this.aoMove();\r\n                }\r\n            };\r\n        } else {\r\n            e.srcElement.addEventListener('click',  this.playerOneMove.bind(this), { once: true });\r\n        }\r\n    };\r\n\r\n    aoMove() {\r\n        if(this.myTurn) {\r\n            let value = this.ao.fire();\r\n            if (value) {\r\n                let firedField = shotField(value.row, value.col);\r\n                this.aoBoard.board[value.row][value.col].isHited = true;\r\n                if (this.aoBoard.board[value.row][value.col].type === 'ship') {\r\n                    aoBoardHTML.querySelector(firedField).setAttribute(\"src\", \"./img/ships/ship.jpg\");\r\n                    this.aoHitCounter++;\r\n                    this.ao.isHited();\r\n                    this.isEndOfGame();\r\n                    if (this.aoHitCounter < 23) {\r\n                        this.aoMove();\r\n                    }\r\n                } else {\r\n                    aoBoardHTML.querySelector(firedField).setAttribute(\"src\", \"./img/ships/pudlo.jpg\");\r\n                    this.myTurn = false;\r\n                    this.ao.isNotHited();\r\n                    information(\"Ruch Gracza 1\");\r\n                }\r\n            };\r\n        }\r\n    };\r\n\r\n    isEndOfGame() {\r\n        if (this.playerOneHitCounter === 23 || this.aoHitCounter === 23) {\r\n            this.playerOneBoard.showAllBoard('board');\r\n            this.aoBoard.showAllBoard('board2');\r\n        }\r\n        if (this.playerOneHitCounter === 23) {\r\n            information(\"Wygrał Gracz 1\");\r\n        }\r\n        if (this.aoHitCounter === 23) {\r\n            information(\"Przegrałeś\");\r\n        }\r\n    }\r\n}\r\n\r\nmodule.exports = AIGame;\r\n\r\n\n\n//# sourceURL=webpack:///./aiGame.js?");

/***/ }),

/***/ "./aoHelper.js":
/*!*********************!*\
  !*** ./aoHelper.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./aoHelper.js?");

/***/ }),

/***/ "./automaticOpponent.js":
/*!******************************!*\
  !*** ./automaticOpponent.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./board.js\");\r\nconst aoHelper = __webpack_require__(/*! ./aoHelper */ \"./aoHelper.js\");\r\n\r\nclass AutomaticOpponent {\r\n    constructor() {\r\n        this.shotArray = new Board();\r\n        this.shipsToShot = [1, 2, 4, 5]\r\n        this.lastCoordinants = false;\r\n        this.lastHitCoordinants = [];\r\n        this.permission = true;\r\n        this.hitCounter = 0;\r\n    }\r\n\r\n\r\n    aimShotOne() {\r\n        if (this.permissionToFirstAimShot()) {\r\n            let row;\r\n            let col;\r\n            if (this.aimCheckUp(this.lastHitCoordinants[0].row, this.lastHitCoordinants[0].col)) {\r\n                row = this.lastHitCoordinants[0].row - 1;\r\n                col = this.lastHitCoordinants[0].col;\r\n            } else if (this.aimCheckDown(this.lastHitCoordinants[0].row, this.lastHitCoordinants[0].col)) {\r\n                row = this.lastHitCoordinants[0].row + 1;\r\n                col = this.lastHitCoordinants[0].col;\r\n            } else if (this.aimCheckRight(this.lastHitCoordinants[0].row, this.lastHitCoordinants[0].col)) {\r\n                row = this.lastHitCoordinants[0].row;\r\n                col = this.lastHitCoordinants[0].col + 1;\r\n            } else if (this.aimCheckLeft(this.lastHitCoordinants[0].row, this.lastHitCoordinants[0].col)) {\r\n                row = this.lastHitCoordinants[0].row;\r\n                col = this.lastHitCoordinants[0].col - 1;\r\n            } else {\r\n                return this.startFromRandomShot();\r\n            }\r\n            this.lastCoordinants = {\r\n                row,\r\n                col\r\n            };\r\n            return this.lastCoordinants;\r\n        } else {\r\n            return this.startFromRandomShot();\r\n        }\r\n    }\r\n\r\n    aimShotTwo() {\r\n        let row;\r\n        let col;\r\n        let dirRow = this.lastHitCoordinants[0].row - this.lastHitCoordinants[1].row;\r\n        let dirCol = this.lastHitCoordinants[0].col - this.lastHitCoordinants[1].col;\r\n        if (this.permissionToNextShot()) {\r\n            if (dirRow === 0) {\r\n                row = this.lastHitCoordinants[0].row;\r\n                for (let i = 0; i < this.lastHitCoordinants.length; i++) {\r\n                    if (this.aimCheckLeft(this.lastHitCoordinants[i].row, this.lastHitCoordinants[i].col)) {\r\n                        col = this.lastHitCoordinants[i].col - 1;\r\n                        this.lastCoordinants = {\r\n                            row,\r\n                            col\r\n                        };\r\n                        return this.lastCoordinants;\r\n                    }\r\n                }\r\n                for (let i = 0; i < this.lastHitCoordinants.length; i++) {\r\n                    if (this.aimCheckRight(this.lastHitCoordinants[i].row, this.lastHitCoordinants[i].col)) {\r\n                        col = this.lastHitCoordinants[i].col + 1;\r\n                        this.lastCoordinants = {\r\n                            row,\r\n                            col\r\n                        };\r\n                        return this.lastCoordinants;\r\n                    }\r\n                }\r\n                return this.startFromRandomShot();\r\n            } else if (dirCol === 0) {\r\n                col = this.lastHitCoordinants[0].col;\r\n                for (let i = 0; i < this.lastHitCoordinants.length; i++) {\r\n                    if (this.aimCheckUp(this.lastHitCoordinants[i].row, this.lastHitCoordinants[i].col)) {\r\n                        row = this.lastHitCoordinants[i].row - 1;\r\n                        this.lastCoordinants = {\r\n                            row,\r\n                            col\r\n                        };\r\n                        return this.lastCoordinants;\r\n                    }\r\n                }\r\n                for (let i = 0; i < this.lastHitCoordinants.length; i++) {\r\n                    if (this.aimCheckDown(this.lastHitCoordinants[i].row, this.lastHitCoordinants[i].col)) {\r\n                        row = this.lastHitCoordinants[i].row + 1;\r\n                        this.lastCoordinants = {\r\n                            row,\r\n                            col\r\n                        };\r\n                        return this.lastCoordinants;\r\n                    }\r\n                }\r\n                return this.startFromRandomShot();\r\n            } else {\r\n                return this.startFromRandomShot();\r\n            }\r\n        } else {\r\n            return this.startFromRandomShot();\r\n        }\r\n    }\r\n\r\n    permissionToNextShot() {\r\n        if (this.lastHitCoordinants.length === 4) {\r\n            this.shipsToShot[0]--;\r\n            return false;\r\n        } else if (this.lastHitCoordinants.length === 3 && this.shipsToShot[0] === 0) {\r\n            return false;\r\n        } else if (this.lastHitCoordinants.length === 2 && this.shipsToShot[0] === 0 && this.shipsToShot[1] === 0) {\r\n            return false;\r\n        }\r\n        return true;\r\n    }\r\n\r\n    permissionToFirstAimShot() {\r\n        if (this.lastHitCoordinants.length === 2 && this.shipsToShot[0] === 0 && this.shipsToShot[1] === 0 && this.shipsToShot[2] === 0) {\r\n            return false;\r\n        }\r\n        return true;\r\n    }\r\n\r\n    startFromRandomShot() {\r\n        switch (this.lastHitCoordinants.length) {\r\n            case 1:\r\n                this.shipsToShot[3]--;\r\n                break;\r\n            case 2:\r\n                this.shipsToShot[2]--;\r\n                break;\r\n            case 3:\r\n                this.shipsToShot[1]--;\r\n                break;\r\n        }\r\n        this.lastHitCoordinants = [];\r\n        this.hitCounter = 0;\r\n        this.permission = true;\r\n        return this.randomShot();\r\n    }\r\n\r\n    fire() {\r\n        if (this.permission) {\r\n            return this.randomShot();\r\n        } else if (this.lastHitCoordinants.length === 1) {\r\n            let value = this.aimShotOne();\r\n            return value;\r\n        } else {\r\n            return this.aimShotTwo();\r\n        }\r\n    }\r\n\r\n    isHited() {\r\n        this.markShot(this.lastCoordinants.row, this.lastCoordinants.col, 'ship');\r\n        this.addToLastHitCoordinants();\r\n        this.hitCounter++;\r\n        if (this.permission) {\r\n            this.permission = false;\r\n        }\r\n    }\r\n\r\n    isNotHited() {\r\n        this.markShot(this.lastCoordinants.row, this.lastCoordinants.col, 'mishit');\r\n        this.hitCounter++;\r\n    }\r\n\r\n    addToLastHitCoordinants() {\r\n        this.lastHitCoordinants.push(this.lastCoordinants);\r\n    }\r\n\r\n    randomShot() {\r\n        while (true) {\r\n            let row = Math.floor(Math.random() * 10);\r\n            let col = Math.floor(Math.random() * 10);\r\n            if (this.randomShotCondition(row, col)) {\r\n                this.lastCoordinants = {\r\n                    row,\r\n                    col\r\n                };\r\n                return this.lastCoordinants;\r\n            }\r\n        }\r\n    }\r\n\r\n    randomShotCondition(row, col) {\r\n        if (this.checkUp(row, col) && this.checkDown(row, col) && this.checkLeft(row, col) && this.checkRight(row, col) && this.checkThis(row, col)) {\r\n            return true;\r\n        }\r\n        return false;\r\n    }\r\n\r\n    checkThis(row, col) {\r\n        if (this.shotArray.board[row][col] === undefined) {\r\n            return true;\r\n        }\r\n        return false;\r\n    }\r\n\r\n    checkUp(row, col) {\r\n        if (row > 0 && (this.shotArray.board[row - 1][col] === undefined || this.shotArray.board[row - 1][col] === 'mishit')) {\r\n            return true;\r\n        } else if (row === 0) {\r\n            return true;\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    checkDown(row, col) {\r\n        if (row < 9 && (this.shotArray.board[row + 1][col] === undefined || this.shotArray.board[row + 1][col] === 'mishit')) {\r\n            return true;\r\n        } else if (row === 9) {\r\n            return true;\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    checkLeft(row, col) {\r\n        if (col > 0 && (this.shotArray.board[row][col - 1] === undefined || this.shotArray.board[row][col - 1] === 'mishit')) {\r\n            return true;\r\n        } else if (col === 0) {\r\n            return true;\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    checkRight(row, col) {\r\n        if (col < 9 && (this.shotArray.board[row][col + 1] === undefined || this.shotArray.board[row][col + 1] === 'mishit')) {\r\n            return true;\r\n        } else if (col === 9) {\r\n            return true;\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    aimCheckUp(row, col) {\r\n        if (row > 0 && (this.shotArray.board[row - 1][col] === undefined)) {\r\n            if (col + 1 <= 9 && (this.shotArray.board[row - 1][col + 1] === \"ship\")) {\r\n                return false;\r\n            }\r\n            if (col - 1 >= 0 && (this.shotArray.board[row - 1][col - 1] === \"ship\")) {\r\n                return false;\r\n            }\r\n            if (row - 2 >= 0 && (this.shotArray.board[row - 2][col] === \"ship\")) {\r\n                return false;\r\n            }\r\n            return true;\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    aimCheckDown(row, col) {\r\n        if (row < 9 && (this.shotArray.board[row + 1][col] === undefined)) {\r\n            if (col + 1 <= 9 && (this.shotArray.board[row + 1][col + 1] === \"ship\")) {\r\n                return false;\r\n            }\r\n            if (col - 1 >= 0 && (this.shotArray.board[row + 1][col - 1] === \"ship\")) {\r\n                return false;\r\n            }\r\n            if (row + 2 <= 9 && (this.shotArray.board[row + 2][col] === \"ship\")) {\r\n                return false;\r\n            }\r\n            return true;\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    aimCheckLeft(row, col) {\r\n        if (col > 0 && (this.shotArray.board[row][col - 1] === undefined)) {\r\n            if (row + 1 <= 9 && (this.shotArray.board[row + 1][col - 1] === \"ship\")) {\r\n                return false;\r\n            }\r\n            if (row - 1 >= 0 && (this.shotArray.board[row - 1][col - 1] === \"ship\")) {\r\n                return false;\r\n            }\r\n            if (col - 2 >= 0 && (this.shotArray.board[row][col - 2] === \"ship\")) {\r\n                return false;\r\n            }\r\n            return true;\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    aimCheckRight(row, col) {\r\n        if (col < 9 && (this.shotArray.board[row][col + 1] === undefined)) {\r\n            if (row + 1 <= 9 && (this.shotArray.board[row + 1][col + 1] === \"ship\")) {\r\n                return false;\r\n            }\r\n            if (row - 1 >= 0 && (this.shotArray.board[row - 1][col + 1] === \"ship\")) {\r\n                return false;\r\n            }\r\n            if (col + 2 <= 9 && (this.shotArray.board[row][col + 2] === \"ship\")) {\r\n                return false;\r\n            }\r\n            return true;\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    markShot(row, col, type) {\r\n        this.shotArray.board[row][col] = type;\r\n    }\r\n\r\n}\r\n\r\nmodule.exports = AutomaticOpponent;\n\n//# sourceURL=webpack:///./automaticOpponent.js?");

/***/ }),

/***/ "./board.js":
/*!******************!*\
  !*** ./board.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Field = __webpack_require__(/*! ./field */ \"./field.js\");\r\nconst shotField = __webpack_require__(/*! ./output */ \"./output.js\");\r\n\r\nclass Board {\r\n\r\n    constructor() {\r\n        this.board = new Array(10);\r\n        for (let i = 0; i < this.board.length; i++) {\r\n            this.board[i] = new Array(10);\r\n        }\r\n    };\r\n\r\n    createRandomBoard() {\r\n        this.setShip(4);\r\n        this.setShip(3);\r\n        this.setShip(3);\r\n        this.setShip(2);\r\n        this.setShip(2);\r\n        this.setShip(2);\r\n        this.setShip(2);\r\n        this.setShip(1);\r\n        this.setShip(1);\r\n        this.setShip(1);\r\n        this.setShip(1);\r\n        this.setShip(1);\r\n        for (let i = 0; i < 10; i++) {\r\n            for (let j = 0; j < 10; j++) {\r\n                if (this.board[i][j] == undefined) {\r\n                    this.board[i][j] = new Field('mishit');\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    randomStart(rowStart, rowEnd, colStart, colEnd) {\r\n        const row = Math.floor(Math.random() * rowEnd - rowStart);\r\n        const col = Math.floor(Math.random() * colEnd - colStart);\r\n        return {\r\n            row,\r\n            col,\r\n        }\r\n    }\r\n\r\n    checkIfSuitsRows(init, masts) {\r\n        if (init.row >= 1) {\r\n            if (typeof this.board[init.row - 1][init.col] !== 'undefined' && typeof this.board[init.row - 1][init.col] === 'ship') {\r\n                return false;\r\n            };\r\n        }\r\n        if (init.row + masts <= 9) {\r\n            if (typeof this.board[init.row + masts][init.col] !== 'undefined' && typeof this.board[init.row + masts][init.col] === 'ship') {\r\n                return false;\r\n            };\r\n        }\r\n        if (init.row + masts > 10) {\r\n            /* Only for draggable ships */\r\n            return false;\r\n        }\r\n        for (let i = init.row; i < init.row + masts; i++) {\r\n            if (typeof this.board[i][init.col] !== 'undefined') {\r\n                return false;\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n\r\n    checkIfSuitsCols(init, masts) {\r\n        if (init.col >= 1) {\r\n            if (typeof this.board[init.row][init.col - 1] !== 'undefined' && typeof this.board[init.row][init.col - 1] === 'ship') {\r\n                return false;\r\n            };\r\n        }\r\n        if (init.col + masts <= 9) {\r\n            if (typeof this.board[init.row][init.col + masts] !== 'undefined' && typeof this.board[init.row][init.col + masts] === 'ship') {\r\n                return false;\r\n            };\r\n        }\r\n        if (init.col + masts > 10) {\r\n            /* Only for draggable ships */\r\n            return false;\r\n        }\r\n        for (let i = init.col; i < init.col + masts; i++) {\r\n            if (typeof this.board[init.row][i] !== 'undefined') {\r\n                return false;\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n\r\n    setShip(masts, init, direction) {\r\n        direction = direction || Math.floor(Math.random() * 2);\r\n\r\n        const range = {\r\n            rowStart: 0,\r\n            rowEnd: 10,\r\n            colStart: 0,\r\n            colEnd: 10,\r\n        };\r\n        if (direction === 0) {\r\n            range.rowEnd = range.rowEnd - masts + 1;\r\n            if (arguments.length === 1) {\r\n                do {\r\n                    var init = this.randomStart(range.rowStart, range.rowEnd, range.colStart, range.colEnd);\r\n                } while (!this.checkIfSuitsRows(init, masts));\r\n            }\r\n\r\n            if (init.row >= 1) {\r\n                this.board[init.row - 1][init.col] = new Field('mishit');\r\n            }\r\n            if (init.row + masts <= 9) {\r\n                this.board[init.row + masts][init.col] = new Field('mishit');\r\n            }\r\n            for (let i = init.row; i < init.row + masts; i++) {\r\n                this.board[i][init.col] = new Field('ship');\r\n                if (init.col - 1 >= 0) {\r\n                    this.board[i][init.col - 1] = new Field('mishit')\r\n                };\r\n                if (init.col + 1 <= 9) {\r\n                    this.board[i][init.col + 1] = new Field('mishit')\r\n                };\r\n            }\r\n        } else if (direction === 1) {\r\n            range.colEnd = range.colEnd - masts + 1;\r\n\r\n            if (arguments.length === 1) {\r\n                do {\r\n                    var init = this.randomStart(range.rowStart, range.rowEnd, range.colStart, range.colEnd);\r\n                } while (!this.checkIfSuitsCols(init, masts));\r\n            }\r\n\r\n            if (init.col >= 1) {\r\n                this.board[init.row][init.col - 1] = new Field('mishit');\r\n            }\r\n            if (init.col + masts <= 9) {\r\n                this.board[init.row][init.col + masts] = new Field('mishit');\r\n            }\r\n            for (let i = init.col; i < init.col + masts; i++) {\r\n                this.board[init.row][i] = new Field('ship');\r\n                if (init.row - 1 >= 0) {\r\n                    this.board[init.row - 1][i] = new Field('mishit')\r\n                };\r\n                if (init.row + 1 <= 9) {\r\n                    this.board[init.row + 1][i] = new Field('mishit')\r\n                };\r\n            }\r\n        }\r\n    }\r\n\r\n    showAllBoard(boardNbr ) {\r\n        for (let i = 0; i < this.board.length; i++) {\r\n            for (let j = 0; j < this.board[i].length; j++) {\r\n                let firedField = shotField(i, j);\r\n                if (this.board[i][j] != undefined) {\r\n                    if (this.board[i][j].type === 'ship') {\r\n                        this.board[i][j].isHited = true;\r\n                        document.querySelector(`#${boardNbr}`).querySelector(firedField).setAttribute(\"src\", \"./img/ships/ship.jpg\");\r\n                    } else if (this.board[i][j].type === 'mishit') {\r\n                        document.querySelector(`#${boardNbr}`).querySelector(firedField).setAttribute(\"src\", \"./img/ships/pudlo.jpg\");\r\n                        this.board[i][j].isHited = true;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    fillEmptyFields() {\r\n        for (let i = 0; i < 10; i++) {\r\n            for (let j = 0; j < 10; j++) {\r\n                if (this.board[i][j] == undefined) {\r\n                    this.board[i][j] = new Field('mishit');\r\n                } else {\r\n                    this.board[i][j].isHited = false;\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n}\r\n\r\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./board.js?");

/***/ }),

/***/ "./clearBoard.js":
/*!***********************!*\
  !*** ./clearBoard.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function clearBoard(parentId){\r\n    let elements = document.getElementById(`${parentId}`);\r\n    while(elements.children.length > 1){\r\n        elements.removeChild(elements.children[1]);\r\n    }\r\n}\r\n\r\nmodule.exports = clearBoard;\n\n//# sourceURL=webpack:///./clearBoard.js?");

/***/ }),

/***/ "./createBoard.js":
/*!************************!*\
  !*** ./createBoard.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const letters = ['A','B','C','D','E','F','G','H','I','J'];\r\n\r\nfunction createNewBoard(parentElementId) {\r\nfor (let i = 0; i < 10; i++) {\r\n        for (let j = 0; j < 10; j++) {\r\n          const field = document.createElement('div');\r\n          field.id = `${letters[i]}${j}`;\r\n          field.className = 'board-field';\r\n          const imgInside = document.createElement('img');\r\n          imgInside.id = `${letters[i]}${j}-img`;\r\n          field.appendChild(imgInside);\r\n          document.querySelector(`#${parentElementId}`).appendChild(field);\r\n        }\r\n    }\r\n};\r\n\r\nmodule.exports = createNewBoard;\n\n//# sourceURL=webpack:///./createBoard.js?");

/***/ }),

/***/ "./dragCheck.js":
/*!**********************!*\
  !*** ./dragCheck.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("  \r\nconst allFields = document.querySelectorAll(\"#board .board-field img\");\r\nconst domBoard = [];\r\n\r\nlet startSlice = 0;\r\nlet endSlice = 10;\r\nfor (let i = 0; i < 10; i++) {\r\n  domBoard[i] = Array.from(allFields).slice(startSlice, endSlice);\r\n  startSlice += 10;\r\n  endSlice += 10;\r\n}\r\nlet counter = 0;\r\n\r\nconst colorPotential = function(init, masts, direction) {\r\n  if(direction === 1) {\r\n\r\n    for (let i = 0; i < masts; i++) {\r\n      domBoard[init.row][init.col + i].parentElement.style.backgroundColor = 'green';\r\n    }\r\n  }\r\n  if(direction === 0) {\r\n\r\n    for (let i = 0; i < masts; i++) {\r\n      domBoard[init.row + i][init.col].parentElement.style.backgroundColor = 'green';\r\n    }\r\n  }\r\n\r\n};\r\n\r\nconst clearPotential = function()  {\r\n\r\n    allFields.forEach((el) => {\r\n      el.parentElement.style.backgroundColor = 'transparent';\r\n    });\r\n\r\n}\r\n\r\nmodule.exports = {\r\n  domBoard,\r\n  colorPotential,\r\n  clearPotential\r\n};\n\n//# sourceURL=webpack:///./dragCheck.js?");

/***/ }),

/***/ "./field.js":
/*!******************!*\
  !*** ./field.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Field {\r\n    constructor(type) {\r\n        this.type = type;\r\n        this.isHited = false;\r\n    }\r\n}\r\n\r\nmodule.exports = Field;\n\n//# sourceURL=webpack:///./field.js?");

/***/ }),

/***/ "./information.js":
/*!************************!*\
  !*** ./information.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function information(txtInfo) {\r\n    const informationField = document.getElementById(\"info\");\r\n    informationField.innerHTML = `<h2>${txtInfo}</h2>`;\r\n}\r\n\r\nmodule.exports = information;\n\n//# sourceURL=webpack:///./information.js?");

/***/ }),

/***/ "./input.js":
/*!******************!*\
  !*** ./input.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function validateInput(inputData) {\r\n    let col;\r\n    let row;\r\n    if (inputData.length > 2) {\r\n        return false;\r\n    }\r\n    if (parseInt(inputData[1]) <= 9) {\r\n        switch (inputData[0].toUpperCase()) {\r\n            case 'A':   col = parseInt(inputData[1]);\r\n                        row = 0;\r\n                        break;\r\n            case 'B':   col = parseInt(inputData[1]);\r\n                        row = 1;\r\n                        break;\r\n            case 'C':   col = parseInt(inputData[1]);\r\n                        row = 2;\r\n                        break;\r\n            case 'D':   col = parseInt(inputData[1]);\r\n                        row = 3;\r\n                        break;\r\n            case 'E':   col = parseInt(inputData[1]);\r\n                        row = 4;\r\n                        break;\r\n            case 'F':   col = parseInt(inputData[1]);\r\n                        row = 5;\r\n                        break;\r\n            case 'G':   col = parseInt(inputData[1]);\r\n                        row = 6;\r\n                        break;\r\n            case 'H':   col = parseInt(inputData[1]);\r\n                        row = 7;\r\n                        break;\r\n            case 'I':   col = parseInt(inputData[1]);\r\n                        row = 8;\r\n                        break;\r\n            case 'J':   col = parseInt(inputData[1]);\r\n                        row = 9\r\n                        break; \r\n            default: return false;     \r\n            } \r\n    } else {\r\n        return false;\r\n    }\r\n    return {col, row}\r\n}  \r\n\r\nmodule.exports = validateInput;\n\n//# sourceURL=webpack:///./input.js?");

/***/ }),

/***/ "./onePlayerGame.js":
/*!**************************!*\
  !*** ./onePlayerGame.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./board.js\");\r\nconst validateInput = __webpack_require__(/*! ./input */ \"./input.js\");\r\nconst shotField = __webpack_require__(/*! ./output */ \"./output.js\");\r\nconst information = __webpack_require__(/*! ./information */ \"./information.js\");\r\n\r\nconst fieldClicked = document.getElementsByClassName(\"board-field\");\r\n\r\nclass OnePlayerGame {\r\n    constructor() {\r\n        this.gameBoard = new Board();\r\n        this.gameBoard.createRandomBoard();\r\n        this.hitCounter = 0;\r\n        this.moveCounter = 0;\r\n    };\r\n\r\n    onePlayerGame() {\r\n        const getId = (e) =>{\r\n            let element = e.currentTarget;\r\n            let id = element.getAttribute('id');\r\n            if (id[0] != null) {\r\n                this.onePlayerLoop(id);\r\n            }\r\n        }\r\n        Array.from(fieldClicked).forEach(function (element) {\r\n            element.addEventListener('click',  getId, {once: true});\r\n        });   \r\n    };\r\n\r\n    onePlayerLoop(id) {\r\n        let coordinate = validateInput(id);\r\n        this.moveCounter++;\r\n        let firedField = shotField(coordinate.row, coordinate.col);\r\n        if (this.gameBoard.board[coordinate.row][coordinate.col].type === 'ship') {\r\n            document.querySelector(firedField).setAttribute(\"src\", \"./img/ships/ship.jpg\");\r\n            this.hitCounter++;\r\n            this.isEndOfGame();\r\n        } else {\r\n            document.querySelector(firedField).setAttribute(\"src\", \"./img/ships/pudlo.jpg\");\r\n        }\r\n        this.gameBoard.board[coordinate.row][coordinate.col].isHited = true;\r\n    };\r\n\r\n    isEndOfGame() {\r\n        if (this.hitCounter === 23) {\r\n            this.gameBoard.showAllBoard(\"board\");\r\n            information(`Udało Ci się wygrać w ${this.moveCounter} ruchach.`)\r\n        }\r\n    }\r\n};\r\n\r\n\r\n\r\n\r\nmodule.exports = OnePlayerGame;\n\n//# sourceURL=webpack:///./onePlayerGame.js?");

/***/ }),

/***/ "./output.js":
/*!*******************!*\
  !*** ./output.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function shotField(row, column) {\r\n    switch (row) {\r\n        case 0:  return `#A${column}-img`;\r\n        case 1:  return `#B${column}-img`;\r\n        case 2:  return `#C${column}-img`;\r\n        case 3:  return `#D${column}-img`;\r\n        case 4:  return `#E${column}-img`;\r\n        case 5:  return `#F${column}-img`;\r\n        case 6:  return `#G${column}-img`;\r\n        case 7:  return `#H${column}-img`;\r\n        case 8:  return `#I${column}-img`;\r\n        case 9:  return `#J${column}-img`;\r\n        default: return false;\r\n    }     \r\n}\r\n\r\nmodule.exports = shotField;\n\n//# sourceURL=webpack:///./output.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const OnePlayerGame = __webpack_require__(/*! ./onePlayerGame */ \"./onePlayerGame.js\");\r\nconst TwoPlayersGame = __webpack_require__(/*! ./twoPlayersGame */ \"./twoPlayersGame.js\");\r\nconst AIPlayer = __webpack_require__(/*! ./aiGame */ \"./aiGame.js\");\r\nconst createNewBoard = __webpack_require__(/*! ./createBoard */ \"./createBoard.js\");\r\nconst clearBoard = __webpack_require__(/*! ./clearBoard */ \"./clearBoard.js\");\r\nconst information = __webpack_require__(/*! ./information */ \"./information.js\");\r\n\r\nconst start = document.getElementById(\"startpage\");\r\nconst gameBoard = document.getElementById(\"board\");\r\nconst gameBoard2 = document.getElementById(\"board2\");\r\nconst onePlayer = document.getElementById(\"onePlayer\");\r\nconst twoPlayers = document.getElementById(\"twoPlayers\");\r\nconst aiPlayer = document.getElementById(\"aiPlayer\");\r\nconst goBackBtn = document.getElementById(\"goBack\");\r\nconst shipsBox = document.getElementById(\"ships\");\r\n\r\n\r\n\r\nwindow.addEventListener('load', (event) => {\r\n    goBackBtn.style.display = \"none\";\r\n    gameBoard.style.display = \"none\";\r\n    gameBoard2.style.display = \"none\";\r\n    shipsBox.style.display = \"none\";\r\n});\r\n\r\ngoBackBtn.addEventListener('click', () => {\r\n    goBackBtn.style.display = \"none\";\r\n    gameBoard.style.display = \"none\";\r\n    gameBoard2.style.display = \"none\";\r\n    shipsBox.style.display = \"none\";\r\n    start.style.display = \"grid\";\r\n    clearBoard('board');\r\n    clearBoard('board2');\r\n    information(\"\");\r\n});\r\n\r\nonePlayer.addEventListener('click', () => {\r\n    start.style.display = \"none\";\r\n    gameBoard.style.display = \"grid\";\r\n    goBackBtn.style.display = \"block\";\r\n    createNewBoard(\"board\");\r\n    information(\"Postrzelaj sobie!\")\r\n    const game = new OnePlayerGame();\r\n    game.onePlayerGame();\r\n});\r\n\r\ntwoPlayers.addEventListener('click', () => {\r\n    start.style.display = \"none\";\r\n    gameBoard.style.display = \"grid\";\r\n    gameBoard2.style.display = \"grid\";\r\n    goBackBtn.style.display = \"block\";\r\n    createNewBoard(\"board\");\r\n    createNewBoard(\"board2\");\r\n    information(\"Zaczyna Gracz 1\")\r\n    const game = new TwoPlayersGame();\r\n    game.twoPlayersGame();\r\n});\r\n\r\naiPlayer.addEventListener('click', () => {\r\n    start.style.display = \"none\";\r\n    gameBoard.style.display = \"grid\";\r\n    gameBoard2.style.display = \"grid\";\r\n    goBackBtn.style.display = \"block\";\r\n    createNewBoard(\"board\");\r\n    createNewBoard(\"board2\");\r\n    information(\"Ustaw statki!\");\r\n    const game = new AIPlayer();\r\n    game.aiPlayerGame();\r\n});\r\n\n\n//# sourceURL=webpack:///./script.js?");

/***/ }),

/***/ "./setBoardEvent.js":
/*!**************************!*\
  !*** ./setBoardEvent.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const boardEvent = new CustomEvent('tralalalala');\r\n\r\nmodule.exports = boardEvent;\n\n//# sourceURL=webpack:///./setBoardEvent.js?");

/***/ }),

/***/ "./setOwnBoard.js":
/*!************************!*\
  !*** ./setOwnBoard.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./board.js\");\r\nconst validateInput = __webpack_require__(/*! ./input */ \"./input.js\");\r\nconst shotField = __webpack_require__(/*! ./output */ \"./output.js\");\r\nconst clearBoard = __webpack_require__(/*! ./clearBoard */ \"./clearBoard.js\");\r\nconst createNewBoard = __webpack_require__(/*! ./createBoard */ \"./createBoard.js\");\r\nconst boardEvent = new CustomEvent('tralalalala');\r\n\r\nconst {\r\n    domBoard,\r\n    colorPotential,\r\n    clearPotential\r\n} = __webpack_require__(/*! ./dragCheck */ \"./dragCheck.js\");\r\n\r\nconst gameBoardHTML = document.getElementById(\"board\");\r\nconst aoBoardHTML = document.getElementById(\"board2\");\r\nconst rotate = document.querySelector('.rotate');\r\nconst ships = document.querySelectorAll('.ship');\r\nconst shipsContainer = document.querySelector('.ships');\r\n\r\nclass SetOwnBoard {\r\n    constructor() {\r\n        this.allMasts = 23;\r\n        this.manualBoard = new Board();\r\n        this.dragged;\r\n    }\r\n\r\n    setBoard() {\r\n        shipsContainer.style.display = \"flex\";\r\n        gameBoardHTML.style.display = \"grid\";\r\n        aoBoardHTML.style.display =\"none\";\r\n        rotate.addEventListener('click', this.rotateShips);\r\n\r\n        document.addEventListener(\"dragstart\", this.dragstart.bind(this), false);\r\n\r\n        document.addEventListener(\"dragend\", this.dragend.bind(this) , false);\r\n\r\n        document.addEventListener(\"dragover\", this.dragover.bind(this), false);\r\n\r\n        document.addEventListener(\"dragenter\", this.dragenter.bind(this), false);\r\n\r\n        document.addEventListener(\"drop\", this.drop.bind(this) , false);\r\n    }\r\n\r\n    dragover(event) {\r\n        // prevent default to allow drop\r\n        let masts = Number(this.dragged.dataset.masts);\r\n        let init = validateInput(event.target.id);\r\n        let direction = Number(this.dragged.dataset.direction);\r\n        if (direction == 1) {\r\n            if (this.manualBoard.checkIfSuitsCols(init, masts) === false) {\r\n                event.target.style.backgroundColor = 'red';\r\n            } else {\r\n                event.preventDefault();\r\n            }\r\n        }\r\n        if (direction == 0) {\r\n            if (this.manualBoard.checkIfSuitsRows(init, masts) === false) {\r\n                event.target.style.backgroundColor = 'red';\r\n            } else {\r\n                event.preventDefault();\r\n            }\r\n        }\r\n    }\r\n\r\n    dragstart(event) {\r\n        // store a ref. on the this.dragged elem\r\n        this.dragged = event.target;\r\n        event.dataTransfer.setData('text', ''); //firefox fix\r\n        // make it half transparent\r\n        event.target.style.opacity = .5;\r\n    }\r\n    \r\n    dragend(event) {\r\n        // reset the transparency\r\n        event.target.style.opacity = \"\";\r\n        //clearPotential();\r\n    }\r\n\r\n    dragenter(event) {\r\n        // highlight potential drop target when the draggable element enters it\r\n        let masts = Number(this.dragged.dataset.masts);\r\n        let init = validateInput(event.target.id);\r\n        let direction = Number(this.dragged.dataset.direction);\r\n        // console.log(init, masts, direction);\r\n\r\n        if (event.target.className == \"board-field\") {\r\n            //clearPotential();\r\n            //colorPotential(init, masts, direction);\r\n        }\r\n    }\r\n\r\n    drop(event) {\r\n        // prevent default action (open as link for some elements)\r\n        event.preventDefault();\r\n\r\n        // move this.dragged elem to the selected drop target\r\n        let masts = Number(this.dragged.dataset.masts);\r\n        let init = validateInput(event.target.id);\r\n        let direction = Number(this.dragged.dataset.direction);\r\n\r\n        if (event.target.className == \"board-field\") {\r\n\r\n            event.target.style.background = \"\";\r\n            this.dragged.parentNode.removeChild(this.dragged);\r\n            event.target.appendChild(this.dragged);\r\n            this.manualBoard.setShip(masts, init, direction);\r\n            this.dragged.setAttribute('draggable', 'false');\r\n            this.allMasts = this.allMasts - masts;\r\n            this.manualBoard.showAllBoard(\"board\");\r\n            if (this.allMasts === 0) {\r\n                this.manualBoard.fillEmptyFields();\r\n                shipsContainer.style.display = \"none\";\r\n                aoBoardHTML.style.display = \"grid\";\r\n                gameBoardHTML.style.margin = 'auto';\r\n                clearBoard(\"board\");\r\n                createNewBoard(\"board\");\r\n                console.log(this.manualBoard);\r\n                return gameBoardHTML.dispatchEvent(boardEvent);\r\n            }\r\n        }\r\n\r\n    }\r\n\r\n    rotateShips() {\r\n        ships.forEach(function (el) {\r\n            let direction = el.getAttribute('data-direction');\r\n            let draggable = el.getAttribute('draggable');\r\n            if (direction == 1 && draggable === 'true') {\r\n                el.style.height = el.clientWidth + 'px';\r\n                el.style.width = '50px';\r\n                el.setAttribute('data-direction', 0);\r\n\r\n            }\r\n            if (direction == 0 && draggable === 'true') {\r\n                el.setAttribute('data-direction', 1);\r\n                el.style.width = el.clientHeight + 'px';\r\n                el.style.height = '50px';\r\n            }\r\n        });\r\n    }\r\n\r\n    getManualBoard() {\r\n        return this.manualBoard;\r\n    }\r\n\r\n}\r\n\r\nmodule.exports = SetOwnBoard;\n\n//# sourceURL=webpack:///./setOwnBoard.js?");

/***/ }),

/***/ "./twoPlayersGame.js":
/*!***************************!*\
  !*** ./twoPlayersGame.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./board.js\");\r\nconst validateInput = __webpack_require__(/*! ./input */ \"./input.js\");\r\nconst shotField = __webpack_require__(/*! ./output */ \"./output.js\");\r\nconst playerOneBoardHTML = document.getElementById(\"board\");\r\nconst playerTwoBoardHTML = document.getElementById(\"board2\");\r\nconst fieldsBoardOne = document.getElementById(\"board\").childNodes;\r\nconst fieldsBoardTwo = document.getElementById(\"board2\").childNodes;\r\nconst information = __webpack_require__(/*! ./information */ \"./information.js\");\r\n\r\nclass twoPlayersGame {\r\n    constructor() {\r\n        //for Player 1\r\n        this.playerOneBoard = new Board();\r\n        this.playerOneBoard.createRandomBoard();\r\n        //for Player 2\r\n        this.playerTwoBoard = new Board();\r\n        this.playerTwoBoard.createRandomBoard();\r\n        this.playerOneHitCounter = 0;\r\n        this.playerTwoHitCounter = 0;\r\n        this.myTurn = false;\r\n    }\r\n\r\n    twoPlayersGame() {\r\n        Array.from(fieldsBoardOne).forEach(this.setEventListeners1.bind(this));\r\n        Array.from(fieldsBoardTwo).forEach(this.setEventListeners2.bind(this));\r\n    }\r\n\r\n    setEventListeners1(e) {\r\n        e.addEventListener('click',  this.playerOneMove.bind(this), { once: true });\r\n    }\r\n\r\n    setEventListeners2(e) {\r\n        e.addEventListener('click',  this.playerTwoMove.bind(this), { once: true });\r\n    }\r\n\r\n    playerOneMove(e) {\r\n        if(!this.myTurn) {\r\n            let element = e.currentTarget;\r\n            let moveOne = element.getAttribute('id');\r\n            let value = validateInput(moveOne);\r\n            if (value) {\r\n                let firedField = shotField(value.row, value.col);\r\n                this.playerOneBoard.board[value.row][value.col].isHited = true;\r\n                if (this.playerOneBoard.board[value.row][value.col].type === 'ship') {\r\n                    playerOneBoardHTML.querySelector(firedField).setAttribute(\"src\", \"./img/ships/ship.jpg\");\r\n                    this.playerOneHitCounter++;\r\n                    this.isEndOfGame();\r\n                } else {\r\n                    playerOneBoardHTML.querySelector(firedField).setAttribute(\"src\", \"./img/ships/pudlo.jpg\");\r\n                    this.myTurn = true;\r\n                    information(\"Ruch Gracza 2\");\r\n                }\r\n            };\r\n        } else {\r\n            e.srcElement.addEventListener('click',  this.playerOneMove.bind(this), { once: true });\r\n        }\r\n    };\r\n\r\n    playerTwoMove(e) {\r\n        console.log(e.srcElement);\r\n        if(this.myTurn) {\r\n            let element = e.currentTarget;\r\n            let moveTwo = element.getAttribute('id');\r\n            let value = validateInput(moveTwo);\r\n            if (value) {\r\n                let firedField = shotField(value.row, value.col);\r\n                this.playerTwoBoard.board[value.row][value.col].isHited = true;\r\n                if (this.playerTwoBoard.board[value.row][value.col].type === 'ship') {\r\n                    playerTwoBoardHTML.querySelector(firedField).setAttribute(\"src\", \"./img/ships/ship.jpg\");\r\n                    this.playerTwoHitCounter++;\r\n                    this.isEndOfGame();\r\n                } else {\r\n                    playerTwoBoardHTML.querySelector(firedField).setAttribute(\"src\", \"./img/ships/pudlo.jpg\");\r\n                    this.myTurn = false;\r\n                    information(\"Ruch Gracza 1\");\r\n                }\r\n            };\r\n        } else {\r\n            e.srcElement.addEventListener('click',  this.playerTwoMove.bind(this), { once: true });\r\n        }\r\n    };\r\n\r\n    isEndOfGame() {\r\n        if (this.playerOneHitCounter === 23 || this.playerTwoHitCounter === 23) {\r\n            this.playerOneBoard.showAllBoard('board');\r\n            this.playerTwoBoard.showAllBoard('board2');\r\n        }\r\n        if (this.playerOneHitCounter === 23) {\r\n            information(\"Wygrał Gracz 1\");\r\n        } else if (this.playerTwoHitCounter === 23) {\r\n            information(\"Wygrał Gracz 2\");\r\n        }\r\n    }\r\n\r\n}\r\n\r\nmodule.exports = twoPlayersGame;\n\n//# sourceURL=webpack:///./twoPlayersGame.js?");

/***/ })

/******/ });