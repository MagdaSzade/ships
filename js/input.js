function inputValidate(input, gameBoard) {
    input.previousElementSibling.style.display = "none";
    const value = validateInput(input.value);
    if (value === false) {
        input.nextElementSibling.style.display = "block";
        $('#move1').val('');
        $('#move2').val('');    
    } else {
        input.nextElementSibling.style.display = "none";
        if (gameBoard.board[value.row][value.col].isHited) {
            input.previousElementSibling.style.display = "block";
            $('#move1').val('');
            $('#move2').val(''); 
        } else {
            $('#move1').val('');
            $('#move2').val(''); 
            return value;
        }
    }
    return false;    
}

function validateInput(inputData) {
    let col;
    let row;
    if (inputData.length > 2) {
        return false;
    }
    if (parseInt(inputData[1]) <= 9) {
        switch (inputData[0].toUpperCase()) {
            case 'A':   col = parseInt(inputData[1]);
                        row = 0;
                        break;
            case 'B':   col = parseInt(inputData[1]);
                        row = 1;
                        break;
            case 'C':   col = parseInt(inputData[1]);
                        row = 2;
                        break;
            case 'D':   col = parseInt(inputData[1]);
                        row = 3;
                        break;
            case 'E':   col = parseInt(inputData[1]);
                        row = 4;
                        break;
            case 'F':   col = parseInt(inputData[1]);
                        row = 5;
                        break;
            case 'G':   col = parseInt(inputData[1]);
                        row = 6;
                        break;
            case 'H':   col = parseInt(inputData[1]);
                        row = 7;
                        break;
            case 'I':   col = parseInt(inputData[1]);
                        row = 8;
                        break;
            case 'J':   col = parseInt(inputData[1]);
                        row = 9
                        break; 
            default: return false;     
            } 
    } else {
        return false;
    }
    return {col, row}
}  

module.exports = inputValidate;