




window.addEventListener('load', () => {
  let currentId;
  // let playerTurn;

  if (window.location.href.split('?')[1] === undefined) {
    currentId = '-1';
    // playerTurn = 'X';
  } else {
    currentId = window.location.href.split('=')[1];
    // playerTurn = 'O';
  }

  fetch('/tateti/start/?id=' + currentId)
    .then((res) => res.json())
    .then((data) => {
      displayPlayerTurn(playerTurn);
      displayCurrentTurn(data.turn);
      if (currentId === '-1') {
        let link = document.querySelector('#link');
        link.innerHTML = `<input type="text" value="${window.location.href + '?id=' + data.id}" disabled>
    <button onclick="copy()">Copiar</button>`;
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
