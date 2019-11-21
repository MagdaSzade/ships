const Board = require('./board');
const aoHelper = require('./aoHelper');

class AutomaticOpponent {
    constructor() {
        this.shotArray = new Board();
        this.shipsToShot = [1, 2, 4, 5]
        this.lastCoordinants = false;
        this.lastHitCoordinants = [];
        this.permission = true;
        this.hitCounter = 0;
    }


    aimShotOne() {
        if (this.permissionToFirstAimShot()) {
            let row;
            let col;
            if (this.aimCheckUp(this.lastHitCoordinants[0].row, this.lastHitCoordinants[0].col)) {
                row = this.lastHitCoordinants[0].row - 1;
                col = this.lastHitCoordinants[0].col;
            } else if (this.aimCheckDown(this.lastHitCoordinants[0].row, this.lastHitCoordinants[0].col)) {
                row = this.lastHitCoordinants[0].row + 1;
                col = this.lastHitCoordinants[0].col;
            } else if (this.aimCheckRight(this.lastHitCoordinants[0].row, this.lastHitCoordinants[0].col)) {
                row = this.lastHitCoordinants[0].row;
                col = this.lastHitCoordinants[0].col + 1;
            } else if (this.aimCheckLeft(this.lastHitCoordinants[0].row, this.lastHitCoordinants[0].col)) {
                row = this.lastHitCoordinants[0].row;
                col = this.lastHitCoordinants[0].col - 1;
            } else {
                return this.startFromRandomShot();
            }
            this.lastCoordinants = {
                row,
                col
            };
            return this.lastCoordinants;
        } else {
            return this.startFromRandomShot();
        }
    }

    aimShotTwo() {
        let row;
        let col;
        let dirRow = this.lastHitCoordinants[0].row - this.lastHitCoordinants[1].row;
        let dirCol = this.lastHitCoordinants[0].col - this.lastHitCoordinants[1].col;
        if (this.permissionToNextShot()) {
            if (dirRow === 0) {
                row = this.lastHitCoordinants[0].row;
                for (let i = 0; i < this.lastHitCoordinants.length; i++) {
                    if (this.aimCheckLeft(this.lastHitCoordinants[i].row, this.lastHitCoordinants[i].col)) {
                        col = this.lastHitCoordinants[i].col - 1;
                        this.lastCoordinants = {
                            row,
                            col
                        };
                        return this.lastCoordinants;
                    }
                }
                for (let i = 0; i < this.lastHitCoordinants.length; i++) {
                    if (this.aimCheckRight(this.lastHitCoordinants[i].row, this.lastHitCoordinants[i].col)) {
                        col = this.lastHitCoordinants[i].col + 1;
                        this.lastCoordinants = {
                            row,
                            col
                        };
                        return this.lastCoordinants;
                    }
                }
                return this.startFromRandomShot();
            } else if (dirCol === 0) {
                col = this.lastHitCoordinants[0].col;
                for (let i = 0; i < this.lastHitCoordinants.length; i++) {
                    if (this.aimCheckUp(this.lastHitCoordinants[i].row, this.lastHitCoordinants[i].col)) {
                        row = this.lastHitCoordinants[i].row - 1;
                        this.lastCoordinants = {
                            row,
                            col
                        };
                        return this.lastCoordinants;
                    }
                }
                for (let i = 0; i < this.lastHitCoordinants.length; i++) {
                    if (this.aimCheckDown(this.lastHitCoordinants[i].row, this.lastHitCoordinants[i].col)) {
                        row = this.lastHitCoordinants[i].row + 1;
                        this.lastCoordinants = {
                            row,
                            col
                        };
                        return this.lastCoordinants;
                    }
                }
                return this.startFromRandomShot();
            } else {
                return this.startFromRandomShot();
            }
        } else {
            return this.startFromRandomShot();
        }
    }

    permissionToNextShot() {
        if (this.lastHitCoordinants.length === 4) {
            this.shipsToShot[0]--;
            return false;
        } else if (this.lastHitCoordinants.length === 3 && this.shipsToShot[0] === 0) {
            return false;
        } else if (this.lastHitCoordinants.length === 2 && this.shipsToShot[0] === 0 && this.shipsToShot[1] === 0) {
            return false;
        }
        return true;
    }

    permissionToFirstAimShot() {
        if (this.lastHitCoordinants.length === 2 && this.shipsToShot[0] === 0 && this.shipsToShot[1] === 0 && this.shipsToShot[2] === 0) {
            return false;
        }
        return true;
    }

    startFromRandomShot() {
        switch (this.lastHitCoordinants.length) {
            case 1:
                this.shipsToShot[3]--;
                break;
            case 2:
                this.shipsToShot[2]--;
                break;
            case 3:
                this.shipsToShot[1]--;
                break;
        }
        this.lastHitCoordinants = [];
        this.hitCounter = 0;
        this.permission = true;
        return this.randomShot();
    }

    fire() {
        if (this.permission) {
            return this.randomShot();
        } else if (this.lastHitCoordinants.length === 1) {
            let value = this.aimShotOne();
            return value;
        } else {
            return this.aimShotTwo();
        }
    }

    isHited() {
        this.markShot(this.lastCoordinants.row, this.lastCoordinants.col, 'ship');
        this.addToLastHitCoordinants();
        this.hitCounter++;
        if (this.permission) {
            this.permission = false;
        }
    }

    isNotHited() {
        this.markShot(this.lastCoordinants.row, this.lastCoordinants.col, 'mishit');
        this.hitCounter++;
    }

    addToLastHitCoordinants() {
        this.lastHitCoordinants.push(this.lastCoordinants);
    }

    randomShot() {
        while (true) {
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            if (this.randomShotCondition(row, col)) {
                this.lastCoordinants = {
                    row,
                    col
                };
                return this.lastCoordinants;
            }
        }
    }

    randomShotCondition(row, col) {
        if (this.checkUp(row, col) && this.checkDown(row, col) && this.checkLeft(row, col) && this.checkRight(row, col) && this.checkThis(row, col)) {
            return true;
        }
        return false;
    }

    checkThis(row, col) {
        if (this.shotArray.board[row][col] === undefined) {
            return true;
        }
        return false;
    }

    checkUp(row, col) {
        if (row > 0 && (this.shotArray.board[row - 1][col] === undefined || this.shotArray.board[row - 1][col] === 'mishit')) {
            return true;
        } else if (row === 0) {
            return true;
        } else {
            return false;
        }
    }

    checkDown(row, col) {
        if (row < 9 && (this.shotArray.board[row + 1][col] === undefined || this.shotArray.board[row + 1][col] === 'mishit')) {
            return true;
        } else if (row === 9) {
            return true;
        } else {
            return false;
        }
    }

    checkLeft(row, col) {
        if (col > 0 && (this.shotArray.board[row][col - 1] === undefined || this.shotArray.board[row][col - 1] === 'mishit')) {
            return true;
        } else if (col === 0) {
            return true;
        } else {
            return false;
        }
    }

    checkRight(row, col) {
        if (col < 9 && (this.shotArray.board[row][col + 1] === undefined || this.shotArray.board[row][col + 1] === 'mishit')) {
            return true;
        } else if (col === 9) {
            return true;
        } else {
            return false;
        }
    }

    aimCheckUp(row, col) {
        if (row > 0 && (this.shotArray.board[row - 1][col] === undefined)) {
            if (col + 1 <= 9 && (this.shotArray.board[row - 1][col + 1] === "ship")) {
                return false;
            }
            if (col - 1 >= 0 && (this.shotArray.board[row - 1][col - 1] === "ship")) {
                return false;
            }
            if (row - 2 >= 0 && (this.shotArray.board[row - 2][col] === "ship")) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    aimCheckDown(row, col) {
        if (row < 9 && (this.shotArray.board[row + 1][col] === undefined)) {
            if (col + 1 <= 9 && (this.shotArray.board[row + 1][col + 1] === "ship")) {
                return false;
            }
            if (col - 1 >= 0 && (this.shotArray.board[row + 1][col - 1] === "ship")) {
                return false;
            }
            if (row + 2 <= 9 && (this.shotArray.board[row + 2][col] === "ship")) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    aimCheckLeft(row, col) {
        if (col > 0 && (this.shotArray.board[row][col - 1] === undefined)) {
            if (row + 1 <= 9 && (this.shotArray.board[row + 1][col - 1] === "ship")) {
                return false;
            }
            if (row - 1 >= 0 && (this.shotArray.board[row - 1][col - 1] === "ship")) {
                return false;
            }
            if (col - 2 >= 0 && (this.shotArray.board[row][col - 2] === "ship")) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    aimCheckRight(row, col) {
        if (col < 9 && (this.shotArray.board[row][col + 1] === undefined)) {
            if (row + 1 <= 9 && (this.shotArray.board[row + 1][col + 1] === "ship")) {
                return false;
            }
            if (row - 1 >= 0 && (this.shotArray.board[row - 1][col + 1] === "ship")) {
                return false;
            }
            if (col + 2 <= 9 && (this.shotArray.board[row][col + 2] === "ship")) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    markShot(row, col, type) {
        this.shotArray.board[row][col] = type;
    }

}

module.exports = AutomaticOpponent;