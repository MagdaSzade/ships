const letters = ['A','B','C','D','E','F','G','H','I','J'];

for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const field = document.createElement('div');
          field.id = `${letters[i]}${j}`;
          field.className = 'board-field';
          document.querySelector("#board").appendChild(field);
        }
    }


    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const field = document.createElement('div');
          field.id = `${letters[i]}${j}`;
          field.className = 'board-field';
          document.querySelector("#board2").appendChild(field);
        }
    }