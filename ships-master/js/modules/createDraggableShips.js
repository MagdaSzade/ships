function createDraggableShips() {
    const shipsQuantity = [5, 4, 2, 1];
    const shipsContainer = document.querySelectorAll(`#ships .ships-box`);
    for (let i = 0; i < shipsContainer.length; i++) {
      for (let j = 0; j < shipsQuantity[i]; j++) {
        shipsContainer[i].innerHTML += `<div class="ship ship-${i+1}" data-masts="${i+1}" data-direction="1" draggable="true"></div>`
      }
    }
  }
module.exports = createDraggableShips;
