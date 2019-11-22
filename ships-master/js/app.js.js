const OnePlayerGame = require('./modules/onePlayerGame');
const TwoPlayersGame = require('./modules/twoPlayersGame');
const AIPlayer = require('./modules/aiGame');
const createNewBoard = require("./modules/createBoard");
const clearBoard = require("./modules/clearBoard");
const information = require("./modules/information");
const clearDraggableShips = require("./modules/clearDraggableShips");

const start = document.getElementById("startpage");
const gameBoard = document.getElementById("board");
const gameBoard2 = document.getElementById("board2");
const onePlayer = document.getElementById("onePlayer");
const twoPlayers = document.getElementById("twoPlayers");
const aiPlayer = document.getElementById("aiPlayer");
const goBackBtn = document.getElementById("goBack");
const shipsBox = document.getElementById("ships");

const AIgame = new AIPlayer();
const OnePlGame = new OnePlayerGame();
const TwoPlGame = new TwoPlayersGame();

window.addEventListener('load', (event) => {
    goBackBtn.style.display = "none";
    gameBoard.style.display = "none";
    gameBoard2.style.display = "none";
    shipsBox.style.display = "none";
});

goBackBtn.addEventListener('click', () => {
    goBackBtn.style.display = "none";
    gameBoard.style.display = "none";
    gameBoard2.style.display = "none";
    shipsBox.style.display = "none";
    start.style.display = "grid";
    clearDraggableShips();
    clearBoard('board');
    clearBoard('board2');
    AIgame.clear();
    OnePlGame.clear();
    TwoPlGame.clear();
    information("");
});

onePlayer.addEventListener('click', () => {
    start.style.display = "none";
    gameBoard.style.display = "grid";
    goBackBtn.style.display = "block";
    createNewBoard("board");
    information("Postrzelaj sobie!")
    OnePlGame.onePlayerGame();
});

twoPlayers.addEventListener('click', () => {
    start.style.display = "none";
    gameBoard.style.display = "grid";
    gameBoard2.style.display = "grid";
    goBackBtn.style.display = "block";
    gameBoard2.style.transform = "scale(0.8)";
    gameBoard.style.transform = "scale(1)";
    createNewBoard("board");
    createNewBoard("board2");
    information("Zaczyna Gracz 1")
    TwoPlGame.twoPlayersGame();
});

aiPlayer.addEventListener('click', () => {
    start.style.display = "none";
    gameBoard.style.display = "grid";
    gameBoard2.style.display = "grid";
    goBackBtn.style.display = "block";
    createNewBoard("board");
    createNewBoard("board2");
    information("Ustaw statki!");
    AIgame.aiPlayerGame();
});
