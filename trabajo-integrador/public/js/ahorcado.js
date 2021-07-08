let playerNum;

const copy = () => {
  let copyText = document.querySelector('#link input');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand('copy');
};

const initializeGame = (data) => {
  if (data.writter === playerNum) {
    displayWordInput(data.id);
  } else {
    pollGameGuest(data.id);
  }
};

const displayWordInput = (id) => {
  const form = document.createElement('form');
  form.id = 'form';
  form.classList.add('form');
  document.getElementById('form-container').appendChild(form);
  const input = document.createElement('input');
  const submit = document.createElement('input');

  input.id = 'word';
  input.name = 'word';
  input.placeholder = 'Insertar Palabra';
  input.pattern = '^[a-zA-Z ñÑ]*$';
  input.required = true;

  submit.type = 'submit';
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(encodeURI(`/ahorcado/setWord?id=${id}&word=${e.target.word.value}`), {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        e.target.reset();
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

const displayRematch = (id) => {
  const btn = document.createElement('button');
  btn.textContent = 'Rematch';
  btn.classList.add('btn');
  document.getElementById('rematch').appendChild(btn);
  btn.addEventListener('click', () => {
    fetch(`/ahorcado/reset?id=${id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById('rematch').innerHTML = '';
        initializeGame(data);
      });
  });
};

const displayStatus = (game) => {
  console.log(game.status);
  displayRematch(game.id);
};

const displayLetters = (letters) => {
  const container = document.getElementById('letters');
  container.textContent = 'Letras usadas: ' + letters;
};

const displayAttempts = (attempts) => {
  document.getElementById('attemps').textContent =
    'Numero de errores: ' + attempts;
};

const displayUpdatedGame = (data) => {
  displayCurrentWord(data.currentWord);
  displayLetters(data.letters);
  displayAttempts(data.attempts);
};

const displayLetterInput = (id) => {
  const form = document.createElement('form');
  form.id = 'form';
  form.classList.add('form');
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
        displayCurrentWord(data.currentWord);
        displayLetterInput(id);
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
      }

      initializeGame(data);
    });
});
