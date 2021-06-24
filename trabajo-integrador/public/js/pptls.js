const copy = () => {
  let copyText = document.querySelector('#link input');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand('copy');
};

// imprime el resultado del player
const displayPlayerOption = (player) => {};

const displayEnemyOption = (player) => {};

const displayPoints = () => {};

const displayGameResult = () => {
  if (game.result === 0) {
  } else {
  }
};

const displayRematch = () => {};

// imprime en pantalla el resultado de la partida
const displayFinalResult = (game) => {
  displayEnemyOption();
  displayGameResult();
  displayPoints();
  displayRematch();
};

const pollGame = (id) => {
  fetch(`/pptls/start/?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.players[0].ready && data.players[1].ready) {
        displayFinalResult(data);
      } else {
        setTimeout(() => {
          pollGame(id);
        }, 500);
      }
    });
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

  fetch('/pptls/start/?id=' + currentId)
    .then((res) => res.json())
    .then((data) => {
      if (currentId === '-1') {
        let link = document.querySelector('#link');
        link.innerHTML = `<input type="text" value="${
          window.location.href + '?id=' + data.id
        }" disabled>
    <button onclick="copy()">Copiar</button>`;
        link.classList.add('link');
      }

      // pollGame(data.id, data.winner, data.draw);

      document.querySelectorAll('.option').forEach((option) => {
        option.addEventListener('click', (e) => {
          fetch(
            `/pptls/?option=${e.target.dataset.option}&id=${data.id}&player=${playerNum}`,
            {
              method: 'PATCH',
            }
          )
            .then((res) => res.json())
            .then((data) => {
              displayPlayerOption();
              if (data.players[0].ready && data.players[1].ready) {
                displayFinalResult();
              } else {
                // checkea el estado del juego hasta que ambos esten ready
                pollGame(data.id);
              }
            });
        });
      });
    });
});
