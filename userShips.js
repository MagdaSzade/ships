// Rotate ship
const rotate = document.querySelector('.rotate');
const ships = document.querySelectorAll('.ship');
const shipsContainer = document.querySelector('.ships');
let allMasts = 23;
rotate.addEventListener('click', rotateShips);

// Add new function
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


// Without changes (need this class)
class Field {
    constructor(type) {
        this.type = type;
        this.isHited = false;
    }
}

// Without changes (need this function)
const createEmptyBoard = () => {
    const board = new Array(10);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(10);
    }
    return board;
}

// Some changes added to this function see comment bellow
function checkIfSuitsRows(init, board, masts) {
    if (init.row >= 1) {
        if (typeof board[init.row - 1][init.col] !== 'undefined' && typeof board[init.row - 1][init.col] === 'ship') {
            return false;
        };
    }
    if (init.row + masts <= 9) {
        if (typeof board[init.row + masts][init.col] !== 'undefined' && typeof board[init.row + masts][init.col] === 'ship') {
            return false;
        };
    }
    if (init.row + masts > 10) {
        /* Only for draggable ships */
        return false;
    }
    for (let i = init.row; i < init.row + masts; i++) {
        if (typeof board[i][init.col] !== 'undefined') {
            return false;
        }
    }
    return true;
}
// Some changes added to this function see comment bellow
function checkIfSuitsCols(init, board, masts) {
    if (init.col >= 1) {
        if (typeof board[init.row][init.col - 1] !== 'undefined' && typeof board[init.row][init.col - 1] === 'ship') {
            return false;
        };
    }
    if (init.col + masts <= 9) {
        if (typeof board[init.row][init.col + masts] !== 'undefined' && typeof board[init.row][init.col + masts] === 'ship') {
            return false;
        };
    }

    if (init.col + masts > 10) { /* Only for draggable ships */
        return false;
    }

    for (let i = init.col; i < init.col + masts; i++) {
        if (typeof board[init.row][i] !== 'undefined') {
            return false;
        }
    }
    return true;
}

// Without changes (need this function)
function validateInput(inputData) {
    let col;
    let row;
    if (inputData.length > 2) {
        return false;
    }
    if (parseInt(inputData[1]) <= 9) {
        switch (inputData[0].toUpperCase()) {
            case 'A':
                col = parseInt(inputData[1]);
                row = 0;
                break;
            case 'B':
                col = parseInt(inputData[1]);
                row = 1;
                break;
            case 'C':
                col = parseInt(inputData[1]);
                row = 2;
                break;
            case 'D':
                col = parseInt(inputData[1]);
                row = 3;
                break;
            case 'E':
                col = parseInt(inputData[1]);
                row = 4;
                break;
            case 'F':
                col = parseInt(inputData[1]);
                row = 5;
                break;
            case 'G':
                col = parseInt(inputData[1]);
                row = 6;
                break;
            case 'H':
                col = parseInt(inputData[1]);
                row = 7;
                break;
            case 'I':
                col = parseInt(inputData[1]);
                row = 8;
                break;
            case 'J':
                col = parseInt(inputData[1]);
                row = 9
                break;
            default:
                return false;
        }
    } else {
        return false;
    }
    return {
        col,
        row
    }
}


// ADD LOCIC TO SET SHIP ON USER BOARD
let dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function (event) {

}, false);

document.addEventListener("dragstart", function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;

    // make it half transparent
    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function (event) {
    // reset the transparency
    event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function (event) {
    // prevent default to allow drop
    let masts = Number(dragged.dataset.masts); /* Test */
    let init = validateInput(event.target.id);
    let direction = Number(dragged.dataset.direction);
    if (direction == 1) {
        if (checkIfSuitsCols(init, userBoard, masts) === false) {
            event.target.style.backgroundColor = 'red';
        } else {
            event.preventDefault();
        }
    }
    if (direction == 0) {
        if (checkIfSuitsRows(init, userBoard, masts) === false) {
            event.target.style.backgroundColor = 'red';
        } else {
            event.preventDefault();
        }
    }


}, false);

document.addEventListener("dragenter", function (event) {
    // highlight potential drop target when the draggable element enters it

    if (event.target.className == "board-field") {
        event.target.style.background = "green";
    }
}, false);

document.addEventListener("dragleave", function (event) {
    // reset background of potential drop target when the draggable element leaves it
    event.target.style.background = "";

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
        userSetShip(masts, userBoard, init, direction);
        dragged.setAttribute('draggable', 'false');
        allMasts = allMasts - masts;
        if (allMasts === 0) {
            fillEmptyFields(userBoard);
            shipsContainer.style.display = 'none';
        }

        console.log(allMasts);
        console.log(validateInput(event.target.id));
        console.log(userBoard);
    }

}, false);

// Added new userBoard
let userBoard = createEmptyBoard();

// Similar to setShip but without random start (diffrent named function)
function userSetShip(masts, board, init, direction) {
    const range = {
        rowStart: 0,
        rowEnd: 10,
        colStart: 0,
        colEnd: 10,
    };
    if (direction === 0) {
        range.rowEnd = range.rowEnd - masts + 1;

        if (init.row >= 1) {
            board[init.row - 1][init.col] = new Field('mishit');
        }
        if (init.row + masts <= 9) {
            board[init.row + masts][init.col] = new Field('mishit');
        }
        for (let i = init.row; i < init.row + masts; i++) {
            board[i][init.col] = new Field('ship');
            if (init.col - 1 >= 0) {
                board[i][init.col - 1] = new Field('mishit')
            };
            if (init.col + 1 <= 9) {
                board[i][init.col + 1] = new Field('mishit')
            };
        }
    } else if (direction === 1) {
        range.colEnd = range.colEnd - masts + 1;
        if (init.col >= 1) {
            board[init.row][init.col - 1] = new Field('mishit');
        }
        if (init.col + masts <= 9) {
            board[init.row][init.col + masts] = new Field('mishit');
        }
        for (let i = init.col; i < init.col + masts; i++) {
            board[init.row][i] = new Field('ship');
            if (init.row - 1 >= 0) {
                board[init.row - 1][i] = new Field('mishit')
            };
            if (init.row + 1 <= 9) {
                board[init.row + 1][i] = new Field('mishit')
            };
        }
    }
}
// Part of your code inside createBoard function.
function fillEmptyFields(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == undefined) {
                board[i][j] = new Field('mishit');
            }
        }
    }
}
