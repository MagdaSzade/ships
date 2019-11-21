  
const allFields = document.querySelectorAll("#board .board-field img");
const domBoard = [];

let startSlice = 0;
let endSlice = 10;
for (let i = 0; i < 10; i++) {
  domBoard[i] = Array.from(allFields).slice(startSlice, endSlice);
  startSlice += 10;
  endSlice += 10;
}
let counter = 0;

const colorPotential = function(init, masts, direction) {
  if(direction === 1) {

    for (let i = 0; i < masts; i++) {
      domBoard[init.row][init.col + i].parentElement.style.backgroundColor = 'green';
    }
  }
  if(direction === 0) {

    for (let i = 0; i < masts; i++) {
      domBoard[init.row + i][init.col].parentElement.style.backgroundColor = 'green';
    }
  }

};

const clearPotential = function()  {

    allFields.forEach((el) => {
      el.parentElement.style.backgroundColor = 'transparent';
    });

}

module.exports = {
  domBoard,
  colorPotential,
  clearPotential
};