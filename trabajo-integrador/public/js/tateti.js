/*  TODO
	Display X y O
	No ejecutar evento si el square ya se clickeo
	Hacer que el url tenga en la ruta el id, para que puedan jugar dos personas
*/
let currentTurn;

const displayBoard = (board) => {
  document.querySelectorAll('.square').forEach((squere, index) => {
    squere.textContent = board[index];
  });
};

const displayWinner = () => {};

const displayDraw = () => {};

const pollGame = (id, winner, draw, boardTurn, playerTurn) => {
  if (!winner && !draw) {
    if (boardTurn !== playerTurn)
      fetch(`/tateti/start/?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          displayBoard(data.board);
          currentTurn = data.turn;
          setTimeout(() => {
            pollGame(id, data.winner, data.draw, data.turn, playerTurn);
          }, 1000);
        });
  } else {
    if (winner) {
      displayWinner();
    } else {
      displayDraw();
    }
  }
};

window.addEventListener('load', () => {
  let currentId;
  let playerTurn;

  if (window.location.href.split('?')[1] === undefined) {
    currentId = '-1';
    playerTurn = 'X';
  } else {
    currentId = window.location.href.split('=')[1];
    playerTurn = 'O';
  }

  fetch('/tateti/start/?id=' + currentId)
    .then((res) => res.json())
    .then((data) => {
      if (currentId === '-1') {
        document.querySelector('#urlGame').textContent =
          window.location.href + '/?id=' + data.id;
      }

      currentTurn = data.turn;
      displayBoard(data.board);
      if (playerTurn !== currentTurn) {
        pollGame(data.id, data.winner, data.draw, data.turn, playerTurn);
      }

      document.querySelectorAll('.square').forEach((square) => {
        square.addEventListener('click', (e) => {
          if (playerTurn === currentTurn) {
            fetch(`/tateti/?square=${e.target.dataset.number}&id=${data.id}`, {
              method: 'PATCH',
            })
              .then((res) => res.json())
              .then((data) => {
                displayBoard(data.board);
                if (data.winner) {
                  displayWinner();
                } else if (data.draw) {
                  displayDraw();
                } else {
                  pollGame(
                    data.id,
                    data.winner,
                    data.draw,
                    data.turn,
                    playerTurn
                  );
                }
              });
          } else {
            console.log('No es tu turno pa');
          }
        });
      });
    });
});
