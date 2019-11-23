const Board = require('./board');
const validateInput = require('./input');
const shotField = require('./output');
const clearBoard = require('./clearBoard');
const createNewBoard = require("./createBoard");
const boardEvent = new CustomEvent('tralalalala');
const createDraggableShips = require('./createDraggableShips');

const {
    domBoard,
    colorPotential,
    clearPotential
} = require('./dragCheck');

const gameBoardHTML = document.getElementById("board");
const aoBoardHTML = document.getElementById("board2");
const rotate = document.querySelector('.rotate');
const shipsContainer = document.querySelector('.ships');

class SetOwnBoard {
    constructor() {
        this.allMasts = 23;
        this.manualBoard = new Board();
        this.dragged;
    }

    clear() {
        this.allMasts = 23;
        this.manualBoard.clear();
        this.dragged;
        document.removeEventListener("dragstart", this.dragstartBind, false);
        document.removeEventListener("dragend", this.dragendBind, false);
        document.removeEventListener("dragover", this.dragoverBind, false);
        document.removeEventListener("dragenter", this.dragenterBind, false);
        document.removeEventListener("drop", this.dropBind, false);
    }

    setBoard() {
        shipsContainer.style.display = "flex";
        gameBoardHTML.style.display = "grid";
        aoBoardHTML.style.display ="none";
        createDraggableShips();
        this.dragendBind = this.dragend.bind(this);
        this.dragstartBind = this.dragstart.bind(this);
        this.dragoverBind = this.dragover.bind(this);
        this.dragenterBind = this.dragenter.bind(this);
        this.dropBind = this.drop.bind(this);

        rotate.addEventListener('click', this.rotateShips);

        document.addEventListener("dragstart", this.dragstartBind, false);

        document.addEventListener("dragend", this.dragendBind, false);

        document.addEventListener("dragover", this.dragoverBind, false);

        document.addEventListener("dragenter", this.dragenterBind, false);

        document.addEventListener("drop", this.dropBind, false);
    }

    dragover(event) {
        // prevent default to allow drop
        let masts = Number(this.dragged.dataset.masts);
        let init = validateInput(event.target.id);
        let direction = Number(this.dragged.dataset.direction);
        if (direction == 1) {
            if (this.manualBoard.checkIfSuitsCols(init, masts) === false) {
            //    event.target.style.backgroundColor = 'red';
            } else {
                event.preventDefault();
            }
        }
        if (direction == 0) {
            if (this.manualBoard.checkIfSuitsRows(init, masts) === false) {
            //    event.target.style.backgroundColor = 'red';
            } else {
                event.preventDefault();
            }
        }
    }

    dragstart(event) {
        // store a ref. on the this.dragged elem
        this.dragged = event.target;
        event.dataTransfer.setData('text', ''); //firefox fix
        // make it half transparent
        event.target.style.opacity = .5;
    }
    
    dragend(event) {
        // reset the transparency
        event.target.style.opacity = "";
        //clearPotential();
    }

    dragenter(event) {
        // highlight potential drop target when the draggable element enters it
        let masts = Number(this.dragged.dataset.masts);
        let init = validateInput(event.target.id);
        let direction = Number(this.dragged.dataset.direction);

        if (event.target.className == "board-field") {
            //clearPotential();
            //colorPotential(init, masts, direction);
        }
    }

    drop(event) {
        // prevent default action (open as link for some elements)
        event.preventDefault();

        // move this.dragged elem to the selected drop target
        let masts = Number(this.dragged.dataset.masts);
        let init = validateInput(event.target.id);
        let direction = Number(this.dragged.dataset.direction);

        if (event.target.className == "board-field") {
            event.target.style.background = "";
            this.dragged.parentNode.removeChild(this.dragged);
            event.target.appendChild(this.dragged);
            this.manualBoard.setShip(masts, init, direction);
            this.dragged.setAttribute('draggable', 'false');
            this.allMasts = this.allMasts - masts;
            this.manualBoard.showAllBoard("board");
            if (this.allMasts === 0) {
                this.manualBoard.fillEmptyFields();
                shipsContainer.style.display = "none";
                aoBoardHTML.style.display = "grid";
                gameBoardHTML.style.margin = 'auto';
                clearBoard("board");
                createNewBoard("board");
                //console.log("end", this.manualBoard);
                return gameBoardHTML.dispatchEvent(boardEvent);
            }
        }

    }

    rotateShips() {
        const ships = document.querySelectorAll('.ship');
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

    getManualBoard() {
        return this.manualBoard;
    }

}

module.exports = SetOwnBoard;