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

const displayWinner = () => {
  console.log('ganaste pa');
};

const displayDraw = () => {};

const displayPlayerTurn = (turn) => {
  document.getElementById('playerTurn').innerHTML = 'Jugas con : ' + turn;
};

const displayCurrentTurn = (turn) => {
  document.querySelector('#currentTurn span').innerHTML = turn;
};

const displayInvalidTurn = () => {
  const playerInfo = document.getElementById('playerInfo');
  const p = document.createElement('p');
  p.id = 'invalidTurn';
  p.textContent = 'no te toca gil';
  playerInfo.appendChild(p);
};

const deleteInvalidTurn = () => {
  const playerInfo = document.getElementById('playerInfo');
  const p = document.getElementById('invalidTurn');
  playerInfo.removeChild(p);
};

const pollGame = (id, winner, draw, boardTurn, playerTurn) => {
  if (!winner && !draw) {
    if (boardTurn !== playerTurn) {
      fetch(`/tateti/start/?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          displayBoard(data.board);
          displayCurrentTurn(data.turn);
          currentTurn = data.turn;
          setTimeout(() => {
            pollGame(id, data.winner, data.draw, data.turn, playerTurn);
          }, 1000);
        });
    } else {
      deleteInvalidTurn();
    }
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
      displayPlayerTurn(playerTurn);
      displayCurrentTurn(data.turn);
      if (currentId === '-1') {
        let link = document.querySelector('#link');
        link.innerHTML = `<p>${window.location.href + '/?id=' + data.id}</p>
    <button>Copiar</button>`;
        link.classList.add('link');
      }
      currentTurn = data.turn;
      displayBoard(data.board);
      if (playerTurn !== currentTurn) {
        pollGame(data.id, data.winner, data.draw, data.turn, playerTurn);
      }

      document.querySelectorAll('.square').forEach((square) => {
        square.addEventListener('click', (e) => {
          if (playerTurn === currentTurn && !data.winner && !data.draw) {
            fetch(`/tateti/?square=${e.target.dataset.number}&id=${data.id}`, {
              method: 'PATCH',
            })
              .then((res) => res.json())
              .then((data) => {
                displayBoard(data.board);
                displayCurrentTurn(data.turn);
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
            displayInvalidTurn();
          }
        });
      });
    });
});
