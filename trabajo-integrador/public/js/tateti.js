/*  TODO
	Display X y O
	No ejecutar evento si el square ya se clickeo
	Hacer que el url tenga en la ruta el id, para que puedan jugar dos personas
*/
let currentTurn;

const pollGame = (id, winner, boardTurn, playerTurn) => {
  currentTurn = boardTurn;
  if (!winner && boardTurn !== playerTurn) {
    fetch(`/tateti/start/?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        displayBoard();
        currentTurn = boardTurn;
        setTimeout(() => {
          pollGame(id, data.winner, data.turn, playerTurn);
        }, 2000);
      });
  } else {
    displayWinner();
  }
};

const displayBoard = () => {
  //todo
};

const displayWinner = () => {};

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

      if (playerTurn === 'O') {
        pollGame(data.id, data.winner, data.turn, playerTurn);
      }

      document.querySelectorAll('.square').forEach((square) => {
        square.addEventListener('click', (e) => {
          console.log(currentTurn);
          if (playerTurn === currentTurn) {
            fetch(`/tateti/?square=${e.target.dataset.number}&id=${data.id}`, {
              method: 'PATCH',
            })
              .then((res) => res.json())
              .then((data) => {
                displayBoard(data);
                if (data.winner) {
                  displayWinner();
                } else {
                  pollGame(data.id, data.winner, data.turn, playerTurn);
                }
                // aca va el loop pidiendo el board
              });
          } else {
            console.log('No es tu turno pa');
          }
        });
      });
    });
});
