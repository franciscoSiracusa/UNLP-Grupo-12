let playerNum;

const displayGuestInfo = () => {
  let container = document.getElementById('playerInfo');
  if (container.textContent === '') {
    container.textContent = 'Adivinas la palabra, esperando al contrincante...';
  } else {
    container.textContent = '';
  }
};

const displayWritterInfo = () => {
  let container = document.getElementById('playerInfo');
  if (container.textContent === '') {
    container.textContent = 'Escribis la palabra.';
  } else {
    container.textContent = '';
  }
};

const copy = () => {
  let copyText = document.querySelector('#link input');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand('copy');
};

const initializeGame = (data) => {
  displayImage(0);
  if (data.writter === playerNum) {
    displayWritterInfo();
    displayWordInput(data.id);
  } else {
    displayGuestInfo();
    pollGameGuest(data.id);
  }
};

const displayWordInput = (id) => {
  const form = document.createElement('form');
  form.id = 'form';
  document.getElementById('form-container').appendChild(form);
  const input = document.createElement('input');
  const submit = document.createElement('input');

  input.id = 'word';
  input.name = 'word';
  input.placeholder = 'Insertar Palabra';
  input.pattern = '^[a-zA-Z ñÑ]*$';
  input.required = true;
  input.maxLength = 30;

  submit.type = 'submit';

  form.classList.add('link');
  input.classList.add('textInput');
  submit.classList.add('btn');

  form.appendChild(input);
  form.appendChild(submit);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(encodeURI(`/ahorcado/setWord?id=${id}&word=${e.target.word.value}`), {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        e.target.reset();
        displayWritterInfo();
        document.getElementById('form-container').removeChild(form);
        pollgameWritter(data.id);
      });
  });

  form.appendChild(input);
  form.appendChild(submit);
};

const displayCurrentWord = (currentword) => {
  document.getElementById('currentWord').textContent = currentword;
};

const undisplayGame = () => {
  document.getElementById('currentWord').textContent = '';
  document.getElementById('letters').textContent = '';
  document.getElementById('attempts').textContent = '';
  document.getElementById('status').textContent = '';
  const img = document.getElementById('img');
  img.src = '';
  img.alt = '';
};

const displayRematch = (id) => {
  const btn = document.createElement('button');
  btn.textContent = 'Jugar otra vez';
  btn.classList.add('rematchBtn');
  document.getElementById('rematch').appendChild(btn);
  btn.addEventListener('click', () => {
    fetch(`/ahorcado/reset?id=${id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById('rematch').innerHTML = '';
        undisplayGame();
        initializeGame(data);
      });
  });
};

const displayStatus = (game) => {
  const status = document.getElementById('status');
  if (game.status === 'survived') {
    status.textContent = 'El pana sobrevivió, me alegro mucho por el pana ;D';
  } else {
    status.textContent = 'El pana murió, hay que avisarle a la familia D:';
  }
  displayRematch(game.id);
};

const displayLetters = (letters) => {
  const container = document.getElementById('letters');
  container.textContent = letters;
};

const displayAttempts = (attempts) => {
  document.getElementById('attempts').textContent = attempts;
};

const displayImage = (attempts) => {
  let alt;
  switch (attempts) {
    case 0:
      alt = 'horca';
      break;
    case 1:
      alt = 'cabeza';
      break;
    case 2:
      alt = 'torso';
      break;
    case 3:
      alt = 'brazo izquierda';
      break;
    case 4:
      alt = 'brazo derecho';
      break;
    case 5:
      alt = 'pierna izquierda';
      break;
    case 6:
      alt = 'pierna derecha';
      break;
  }
  const img = document.getElementById('img');
  img.src = `../icons/hanged-${attempts}.svg`;
  img.alt = alt;
};

const displayUpdatedGame = (data) => {
  displayCurrentWord(data.currentWord);
  displayLetters(data.letters);
  displayAttempts(data.attempts);
  displayImage(data.attempts);
};

const displayLetterInput = (id) => {
  const form = document.createElement('form');
  form.id = 'form';
  document.getElementById('form-container').appendChild(form);
  const input = document.createElement('input');
  const submit = document.createElement('input');

  input.id = 'letter';
  input.name = 'letter';
  input.maxLength = 1;
  input.placeholder = 'Insertar Letra';
  input.pattern = '^[a-zA-ZñÑ]*$';
  input.required = true;

  submit.type = 'submit';

  form.classList.add('link');
  input.classList.add('textInput');
  submit.classList.add('btn');

  form.appendChild(input);
  form.appendChild(submit);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(
      encodeURI(`/ahorcado/attempt?id=${id}&letter=${e.target.letter.value}`),
      {
        method: 'PATCH',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        e.target.reset();
        displayUpdatedGame(data);
        if (data.status !== 'playing') {
          displayStatus(data);
          document.getElementById('form-container').removeChild(form);
        }
      });
  });

  form.appendChild(input);
  form.appendChild(submit);
};

const pollGameGuest = (id) => {
  fetch(`/ahorcado/start?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.word) {
        displayGuestInfo();
        displayCurrentWord(data.currentWord);
        displayLetterInput(id);
        displayImage(data.attempts);
      } else {
        setTimeout(() => {
          pollGameGuest(id);
        }, 500);
      }
    });
};

const pollgameWritter = (id) => {
  fetch(`/ahorcado/start?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayUpdatedGame(data);
      if (data.status === 'playing' && data.word !== data.currentWord) {
        setTimeout(() => {
          pollgameWritter(id);
        }, 500);
      } else {
        displayStatus(data);
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

  fetch('/ahorcado/start?id=' + currentId)
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
        input.classList.add('textInput');
        btn.classList.add('btn');
      }

      initializeGame(data);
    });
});
