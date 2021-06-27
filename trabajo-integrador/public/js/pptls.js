let playerNum;

const copy = () => {
  let copyText = document.querySelector('#link input');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand('copy');
};

const arePlayersReady = (players) => {
  return (
    players[0].ready &&
    players[1].ready &&
    players[0].round === players[1].round
  );
};

const displayConnect = () => {};

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
          displayPlayerOption(data.players, playerNum);
          if (arePlayersReady(data.players)) {
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

const displayPlayerOption = (player, playerNum) => {
  console.log(`tu eleccion es ${player[playerNum].option}`);
};

const displayEnemyOption = (players) => {
  console.log(`${players[0].option} vs ${players[1].option}`);
};

const displayPoints = () => {};

const displayGameResult = (game) => {
  if (game.result === -1) {
    console.log('empate');
  } else {
    if (game.result === 0) {
      console.log(`el ganador es ${game.players[0].option}`);
    } else {
      console.log(`el ganador es ${game.players[1].option}`);
    }
  }
  console.log('----------');
};

/* const toggleConnect = (id, num) => {
  fetch(`/pptls/toggleConnect?id=${id}&player=${playerNum}`, {
    method: 'POST',
  });
}; */

const disconectPlayer = () => {};

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
  displayEnemyOption(game.players);
  displayGameResult(game);
  displayPoints();
  displayRematch(game.id);
};

const pollGame = (id) => {
  fetch(`/pptls/start?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (arePlayersReady(data.players)) {
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

      /* toggleConnect(data.id, playerNum);

      window.addEventListener('beforeunload', () => {
        toggleConnect(data.id, playerNum);
      }); */

      createOptions(data.id, playerNum);
    });
});
