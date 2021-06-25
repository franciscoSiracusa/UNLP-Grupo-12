let playerNum;

const copy = () => {
  let copyText = document.querySelector('#link input');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand('copy');
};

const createOptions = (id) => {
  document.getElementById('options').innerHTML =
    '<div class="option" data-option="rock">rock</div> <div class="option" data-option="paper">paper</div>  <div class="option" data-option="scissors">scissors</div>  <div class="option" data-option="lizard">lizard</div>  <div class="option" data-option="spock">spock</div>';

  document.querySelectorAll('.option').forEach((option) => {
    option.addEventListener('click', (e) => {
      fetch(
        `/pptls?option=${e.target.dataset.option}&id=${id}&player=${playerNum}`,
        {
          method: 'PATCH',
        }
      )
        .then((res) => res.json())
        .then((data) => {
          deleteOptions();
          displayPlayerOption();
          if (data.players[0].ready && data.players[1].ready) {
            displayFinalResult(data);
          } else {
            // checkea el estado del juego hasta que ambos esten ready
            pollGame(data.id);
          }
        });
    });
  });
};

const deleteOptions = () => {
  document.getElementById('options').innerHTML = '';
};

const displayPlayerOption = (player) => {};

const displayEnemyOption = (player) => {};

const displayPoints = () => {};

const displayGameResult = () => {
  /*  if (game.result === 0) {
  } else {
  } */
};

const displayRematch = (id) => {
  const btn = document.createElement('button');
  btn.textContent = 'Rematch';
  document.getElementById('rematch').appendChild(btn);
  btn.addEventListener('click', () => {
    document.getElementById('rematch').innerHTML = '';
    createOptions(id);
    fetch(`/pptls/reset?id=${id}&player=${playerNum}`, {
      method: 'POST',
    });
  });
};

// imprime en pantalla el resultado de la partida
const displayFinalResult = (game) => {
  displayEnemyOption();
  displayGameResult();
  displayPoints();
  displayRematch(game.id);
};

const pollGame = (id) => {
  fetch(`/pptls/start?id=${id}`)
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

  if (window.location.href.split('?')[1] === undefined) {
    currentId = '-1';
    playerNum = 0;
  } else {
    currentId = window.location.href.split('=')[1];
    playerNum = 1;
  }

  fetch('/pptls/start?id=' + currentId)
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
      createOptions(data.id, playerNum);
    });
});
