const Board = require('./board');
const validateInput = require('./input');
const shotField = require('./output');
const AutomaticOpponent = require('./automaticOpponent');
const information = require('./information');
const SetOwnBoard = require('./setOwnBoard');

const playerOneBoardHTML = document.getElementById("board");
const aoBoardHTML = document.getElementById("board2");
const fieldsBoardOne = document.getElementById("board").childNodes;

class AIGame {
    constructor() {
        //for Player 1
        this.playerOneBoard = new Board();
        this.playerOneBoard.createRandomBoard();
        //for AO 
        this.ao = new AutomaticOpponent();
        this.set = new SetOwnBoard();
        this.permission = false;
        this.playerOneHitCounter = 0;
        this.aoHitCounter = 0;
        this.myTurn = false;
    }

    clear() {
        //for Player 1
        this.playerOneBoard.clear();
        this.playerOneBoard.createRandomBoard();
        //forAO
        this.ao.clear();
        this.set.clear();
        this.permission = false;
        this.playerOneHitCounter = 0;
        this.aoHitCounter = 0;
        this.myTurn = false; 
    }

    aiPlayerGame() {
        playerOneBoardHTML.addEventListener("tralalalala", this.isSetedCallback.bind(this))
        this.set.setBoard();
    }

    isSetedCallback(e) {
        this.aoBoard = this.set.getManualBoard();
        Array.from(fieldsBoardOne).forEach(this.setEventListeners.bind(this));
    }

    setEventListeners(e) {
        e.addEventListener('click',  this.playerOneMove.bind(this), { once: true });
    }

    playerOneMove(e) {
        if(!this.myTurn) {
            let element = e.currentTarget;
            let moveOne = element.getAttribute('id');
            let value = validateInput(moveOne);
            if (value) {
                let firedField = shotField(value.row, value.col);
                this.playerOneBoard.board[value.row][value.col].isHited = true;
                if (this.playerOneBoard.board[value.row][value.col].type === 'ship') {
                    playerOneBoardHTML.querySelector(firedField).setAttribute("src", "./img/ships/ship.jpg");
                    this.playerOneHitCounter++;
                    this.isEndOfGame();
                    information("Możesz strzelać jeszcze raz");
                } else {
                    playerOneBoardHTML.querySelector(firedField).setAttribute("src", "./img/ships/pudlo.jpg");
                    this.myTurn = true;
                    information("Ruch automatycznego przeciwnika");
                    this.aoMove();
                }
            };
        } else {
            e.srcElement.addEventListener('click',  this.playerOneMove.bind(this), { once: true });
        }
    };

    aoMove() {
        if(this.myTurn) {
            let value = this.ao.fire();
            if (value) {
                let firedField = shotField(value.row, value.col);
                this.aoBoard.board[value.row][value.col].isHited = true;
                if (this.aoBoard.board[value.row][value.col].type === 'ship') {
                    aoBoardHTML.querySelector(firedField).setAttribute("src", "./img/ships/ship.jpg");
                    this.aoHitCounter++;
                    this.ao.isHited();
                    this.isEndOfGame();
                    if (this.aoHitCounter < 23) {
                        this.aoMove();
                    }
                } else {
                    aoBoardHTML.querySelector(firedField).setAttribute("src", "./img/ships/pudlo.jpg");
                    this.myTurn = false;
                    this.ao.isNotHited();
                    information("Ruch Gracza 1");
                }
            };
        }
    };

    isEndOfGame() {
        if (this.playerOneHitCounter === 23 || this.aoHitCounter === 23) {
            this.playerOneBoard.showAllBoard('board');
            this.aoBoard.showAllBoard('board2');
        }
        if (this.playerOneHitCounter === 23) {
            information("Wygrał Gracz 1");
        }
        if (this.aoHitCounter === 23) {
            information("Przegrałeś");
        }
    }

}

module.exports = AIGame;

