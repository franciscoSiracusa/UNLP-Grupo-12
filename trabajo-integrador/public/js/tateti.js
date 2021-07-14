let currentTurn;

const copy = () => {
  let copyText = document.querySelector('#link input');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand('copy');
};

const displayBoard = (board) => {
  document.querySelectorAll('.square').forEach((squere, index) => {
    squere.textContent = board[index];
  });
};

const displayRematch = (id) => {
  const btn = document.createElement('button');
  const container = document.getElementById('alert');
  btn.textContent = 'Jugar otra vez';
  btn.classList.add('rematchBtn');
  container.appendChild(btn);
  btn.addEventListener('click', () => {
    fetch(`/tateti/reset?id=${id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        container.innerHTML = '';
        container.classList.remove('alert');
        document.querySelectorAll('.square').forEach((square) => {
          square.textContent = '';
        });
        displayCurrentTurn(data.turn);
        currentTurn = data.turn;
        if (playerTurn !== currentTurn) {
          pollGame(data.id, data.winner, data.draw, data.turn, playerTurn);
        }
      });
  });
};

const displayWinner = (winner) => {
  const container = document.getElementById('alert');
  const p = document.createElement('p');

  p.textContent = 'Ganador: ' + winner;

  container.appendChild(p);
  container.classList.add('alert');
};

const displayDraw = () => {
  const container = document.getElementById('alert');
  const p = document.createElement('p');
  p.textContent = 'Empate';
  container.appendChild(p);
  container.classList.add('alert');
};

const displayPlayerTurn = (turn) => {
  document.getElementById('playerTurn').innerHTML = 'Jugas con: ' + turn;
};

const displayCurrentTurn = (turn) => {
  document.querySelector('#currentTurn span').innerHTML = turn;
};

const displayInvalidTurn = () => {
  const p = document.getElementById('invalidTurn');
  p.textContent = 'No es tu turno!';
};

const deleteInvalidTurn = () => {
  const p = document.getElementById('invalidTurn');
  p.textContent = '';
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
          }, 500);
        });
    } else {
      deleteInvalidTurn();
    }
  } else {
    if (winner) {
      displayWinner(winner);
      displayRematch(id);
    } else {
      displayDraw();
      displayRematch(id);
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
        let input = document.createElement('input');
        input.value = window.location.href + '?id=' + data.id;
        let btn = document.createElement('button');
        btn.textContent = 'Copiar';
        btn.addEventListener('click', copy);

        link.appendChild(input);
        link.appendChild(btn);

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
                  displayWinner(data.winner);
                  displayRematch(data.id);
                } else if (data.draw) {
                  displayDraw();
                  displayRematch(data.id);
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
