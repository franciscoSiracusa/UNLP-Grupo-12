let playerNum;

const copy = () => {
  let copyText = document.querySelector('#link input');
  copyText.focus();
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
    '<div class="option hover hidden-top" data-option="rock"><img src="../icons/rock.svg" alt="rock"></div> <div class="option hover" data-option="paper"><img src="../icons/paper.svg" alt="paper"></div>  <div class="option hover" data-option="scissors"><img src="../icons/scissors.svg" alt="scissors"></div>  <div class="option hover" data-option="lizard"><img src="../icons/lizard.svg" alt="lizard"></div>  <div class="option hover" data-option="spock"><img src="../icons/spock.svg"></div>'; 

  document.querySelectorAll('.option').forEach((option) => {
    option.addEventListener('click', (e) => {
      fetch(
        `/pptls?option=${e.target.parentNode.dataset.option}&id=${id}&player=${playerNum}`,
        {
          method: 'PATCH',
        }
      )
        .then((res) => res.json())
        .then((data) => {
          document.querySelectorAll('.option').forEach((option) => {
            option.classList.add('clicked');
            option.classList.remove('hover');
          });
          setTimeout(() => {
            deleteOptions();
            displayPlayerOption(data.players);
            if (arePlayersReady(data.players)) {
              displayFinalResult(data);
            } else {
              // checkea el estado del juego hasta que ambos esten ready
              pollGame(data.id);
            }
          }, 400);
        });
    });
  });
};

const deleteOptions = () => {
  document.getElementById('options').innerHTML = '';
};

const displayPlayerOption = (players) => {
  let option = document.createElement('div');
  option.classList.add('option');
  option.classList.add('hidden');
  let img = document.createElement('img');
  img.src = '../icons/' + players[playerNum].option + '.svg';
  img.alt = players[playerNum].option;
  option.appendChild(img);
  document.getElementById('options').appendChild(option);
  setTimeout(() => {
    option.classList.remove('hidden');
  }, 50);
};

const displayEnemyOption = (players) => {
  let option = document.createElement('div');
  option.classList.add('option');
  option.classList.add('hidden-enemy');
  let img = document.createElement('img');
  const enemyNum = playerNum === 0 ? 1 : 0;
  img.src = '../icons/' + players[enemyNum].option + '.svg';
  img.alt = players[enemyNum].option;
  option.appendChild(img);
  document.getElementById('options').appendChild(option);
  setTimeout(() => {
    option.classList.remove('hidden-enemy');
  }, 50);
};

const displayPoints = (players) => {
  const enemyPointsContainer = document.getElementById('enemy-points');
  enemyPointsContainer.textContent = '';
  const yourPointsContainer = document.getElementById('your-points');
  yourPointsContainer.textContent = '';

  const enemyNum = playerNum === 0 ? 1 : 0;
  const yourPoints = document.createElement('p');
  yourPoints.textContent = players[playerNum].points;
  yourPointsContainer.appendChild(yourPoints);
  const enemyPoins = document.createElement('p');
  enemyPoins.textContent = players[enemyNum].points;
  enemyPointsContainer.appendChild(enemyPoins);
};

const displayGameResult = (game) => {
  const result = document.createElement('p');
  if (game.result === -1) {
    result.textContent = 'Empate';
  } else {
    if (game.result === 0) {
      result.textContent = `El ganador es ${game.players[0].option}`;
    } else {
      result.textContent = `El ganador es ${game.players[1].option}`;
    }
  }
  document.querySelector('.result-message').appendChild(result);
};

/* const toggleConnect = (id, num) => {
  fetch(`/pptls/toggleConnect?id=${id}&player=${playerNum}`, {
    method: 'POST',
  });
}; */

const disconectPlayer = () => {};

const displayRematch = (id) => {
  const btn = document.createElement('button');
  btn.textContent = 'Jugar otra vez';
  btn.classList.add('btn');
  document.getElementById('rematch').appendChild(btn);
  btn.addEventListener('click', () => {
    // vaciar el resultado
    document.querySelector('.result-message').innerHTML = '';
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
  displayPoints(game.players);
  displayRematch(game.id);
};


const pollGame = (id) => {
  fetch(`/pptls/start?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (arePlayersReady(data.players)) {
        // sacar mensaje de espera al oponente
        document.querySelector('.wait-message').innerHTML = '';
        displayFinalResult(data);
      } else {
        // imprimir mensaje para esperar al oponente
        document.querySelector('.wait-message').innerHTML = 'Tu oponente esta pensando ...';
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
        let input = document.createElement('input');
        input.value = window.location.href + '?id=' + data.id;
        let btn = document.createElement('button');
        btn.textContent = 'Copiar';
        btn.addEventListener('click', copy);

        link.appendChild(input);
        link.appendChild(btn);
        
        link.classList.add('link');
      }

      /* toggleConnect(data.id, playerNum);

      window.addEventListener('beforeunload', () => {
        toggleConnect(data.id, playerNum);
      }); */

      createOptions(data.id);
    });
});
