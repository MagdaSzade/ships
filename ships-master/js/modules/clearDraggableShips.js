function clearDraggableShips(){
    for (let i = 2; i <= 5; i++) {
        let elements = document.querySelector(`#ships`).querySelector(`.ships-box:nth-child(${i})`);
        while(elements.children.length > 0){
            elements.removeChild(elements.children[0]);
        }
    }
}

module.exports = clearDraggableShips;