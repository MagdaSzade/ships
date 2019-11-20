const Board = require('./board');
const validateInput = require('./input');
const shotField = require('./output');
const AutomaticOpponent = require('./automaticOpponent');
const {domBoard, colorPotential, clearPotential} = require('./dragCheck');

// const input = document.querySelector('#move');
const gameBoardHTML = document.getElementById("board");
const aoBoardHTML = document.getElementById("board2");

const fieldClicked = document.getElementById("board2").childNodes;



let allMasts = 23;
const manualBoard = new Board();

// Rotate ship
const rotate = document.querySelector('.rotate');
const ships = document.querySelectorAll('.ship');
const shipsContainer = document.querySelector('.ships');


rotate.addEventListener('click', rotateShips);

function rotateShips() {
    ships.forEach(function (el) {
        let direction = el.getAttribute('data-direction');
        let draggable = el.getAttribute('draggable');
        if (direction == 1 && draggable === 'true') {
            el.style.height = el.clientWidth + 'px';
            el.style.width = '50px';
            el.setAttribute('data-direction', 0);

        }
        if (direction == 0 && draggable === 'true') {
            el.setAttribute('data-direction', 1);
            el.style.width = el.clientHeight + 'px';
            el.style.height = '50px';
        }
    });
}



class AIGame {
    constructor() {
        //Board for Player to set ships and AO shoot
        this.playerBoard = manualBoard;

        //Board for Player to shoot
        this.gameBoard = new Board();
        this.gameBoard.createRandomBoard();
        this.playerHitCounter = 0;
        this.aoHitCounter = 0;
        this.ao = new AutomaticOpponent();
    }

    aiPlayerGame() {
    const test = (e) =>{
        let element = e.currentTarget;
        let id = element.getAttribute('id');
            if (id[0] != null) {
                this.aiLoop(id);
            }
        }
    Array.from(fieldClicked).forEach(function (element) {
        element.addEventListener('click',  test, {once: true});
    });
    }

    aiLoop(id) {
        let coordinate = validateInput(id);
        let firedField = shotField(coordinate.row, coordinate.col);
            this.gameBoard.board[coordinate.row][coordinate.col].isHited = true;
            if (this.gameBoard.board[coordinate.row][coordinate.col].type === 'ship') {
                aoBoardHTML.querySelector(firedField).setAttribute("src", "./img/ships/ship.png");
                this.aoHitCounter++;
                this.isEndOfGame();


            } else {
                aoBoardHTML.querySelector(firedField).setAttribute("src", "./img/ships/pudlo.jpg");
                this.aoMove();
            }

    };

    aoMove() {
        let value = this.ao.randomShot();
        if (value) {
            let firedField = shotField(value.row, value.col);
            this.playerBoard.board[value.row][value.col].isHited = true;
            if (this.playerBoard.board[value.row][value.col].type === 'ship') {
                gameBoardHTML.querySelector(firedField).setAttribute("src", "./img/ships/ship.png");
                gameBoardHTML.querySelector(firedField).classList.add('absolute');
                this.playerHitCounter++;
                this.isEndOfGame();
                this.aoMove();
            } else {
                gameBoardHTML.querySelector(firedField).setAttribute("src", "./img/ships/pudlo.jpg");

            }
        };
    }

    isEndOfGame() {
        if (this.playerHitCounter === 23 || this.aoHitCounter === 23) {
            this.gameBoard.showAllBoard();
            this.playerBoard.showAllBoard();
        }
    }

}

// module.exports = AIGame;

// ADD LOCIC TO SET SHIP ON USER BOARD
let dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function (event) {

}, false);

document.addEventListener("dragstart", function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    event.dataTransfer.setData('text', ''); //firefox fix
    // make it half transparent
    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function (event) {
    // reset the transparency
    event.target.style.opacity = "";
    clearPotential();
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function (event) {
    // prevent default to allow drop
    let masts = Number(dragged.dataset.masts);
    let init = validateInput(event.target.id);
    let direction = Number(dragged.dataset.direction);
    if (direction == 1) {
        if (manualBoard.checkIfSuitsCols(init, masts) === false) {
            event.target.style.backgroundColor = 'red';
        } else {
            event.preventDefault();
        }
    }
    if (direction == 0) {
        if (manualBoard.checkIfSuitsRows(init, masts) === false) {
            event.target.style.backgroundColor = 'red';
        } else {
            event.preventDefault();
        }
    }


}, false);

document.addEventListener("dragenter", function (event) {
    // highlight potential drop target when the draggable element enters it
    let masts = Number(dragged.dataset.masts);
    let init = validateInput(event.target.id);
    let direction = Number(dragged.dataset.direction);
    // console.log(init, masts, direction);

    if (event.target.className == "board-field") {
        clearPotential();
        colorPotential(init, masts, direction);
    }
}, false);

document.addEventListener("dragleave", function (event) {
    // reset background of potential drop target when the draggable element leaves it


}, false);

document.addEventListener("drop", function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();

    // move dragged elem to the selected drop target
    let masts = Number(dragged.dataset.masts);
    let init = validateInput(event.target.id);
    let direction = Number(dragged.dataset.direction);

    if (event.target.className == "board-field") {

        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
        manualBoard.setShip(masts, init, direction);
        dragged.setAttribute('draggable', 'false');
        allMasts = allMasts - masts;
        if (allMasts === 0) {
            manualBoard.fillEmptyFields();
            shipsContainer.style.display = "none";
            aoBoardHTML.style.display = "grid";
            gameBoardHTML.style.margin = 'auto';
            game = new AIGame();
            game.aiPlayerGame();
            console.log(manualBoard);
        }
    }

}, false);
