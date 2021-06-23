

const copy = () => {
  let copyText = document.querySelector("#link input");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

// imprime el resultado del player
const displayPlayerResult = (players) => {

}

// imprime en pantalla el resultado de la partida
const displayFinalResult = (game) => {

}

const pollGame = (id, players) => {
  if (!players[0].ready && !players[1].ready) {
    fetch(`/pptls/start/?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        displayFinalResult(data);
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
      displayWinner(winner);
    } else {
      displayDraw();
    }
  }
};


window.addEventListener('load', () => {
  let currentId;
  let playerNum;

  if (window.location.href.split('?')[1] === undefined) {
    currentId = '-1';
    playerNum = 0;
  } else {
    currentId = window.location.href.split('=')[1];
    playerNum = 1;
  }

  fetch('/tateti/start/?id=' + currentId)
    .then((res) => res.json())
    .then((data) => {

      if (currentId === '-1') {
        let link = document.querySelector('#link');
        link.innerHTML = `<input type="text" value="${window.location.href + '?id=' + data.id}" disabled>
    <button onclick="copy()">Copiar</button>`;
        link.classList.add('link');
      }

      
    // pollGame(data.id, data.winner, data.draw);

      document.querySelectorAll('.option').forEach((option) => {
        option.addEventListener('click', (e) => {
        //  if (!data.players[playerNum].option) {
            fetch(`/pptls/?option=${e.target.dataset.option}&id=${data.id}&player=${playerNum}`, {
              method: 'PATCH',
            })
              .then((res) => res.json())
              .then((data) => {
                displayPlayerResult(data.players);
                // checkea el estado del juego hasta que ambos esten ready
                pollGame()

                // nos quedamos aca

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
          // }
        });
      });
    });
});
