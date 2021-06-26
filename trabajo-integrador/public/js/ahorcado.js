const copy = () => {
  let copyText = document.querySelector('#link input');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand('copy');
};

const displayWordInput = (id) => {
  const form = document.getElementById('form');
  const input = document.createElement('input');
  const submit = document.createElement('input');

  input.id = 'word';
  input.name = 'word';
  input.placeholder = 'Insertar Palabra';

  submit.type = 'submit';
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(encodeURI(`/ahorcado/setWord?id=${id}&word=${e.target.word.value}`), {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        e.target.reset();
        //removeWordInput
        pollgameWritter(data.id);
      });
  });

  form.appendChild(input);
  form.appendChild(submit);
};

const displayCurrentWord = (currentword) => {
  document.getElementById('currentWord-container').textContent = currentword;
};

const displayStatus = (game) => {
  console.log(game.status);
};

const displayLetterInput = (id) => {
  const form = document.getElementById('form');
  const input = document.createElement('input');
  const submit = document.createElement('input');

  input.id = 'letter';
  input.name = 'letter';
  input.maxLength = 1;
  input.placeholder = 'Insertar Letra';

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
        displayCurrentWord(data.currentWord);
        if (data.status !== 'playing') {
          displayStatus(data);
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
      displayCurrentWord(data.currentWord);
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
        link.innerHTML = `<input type="text" value="${
          window.location.href + '?id=' + data.id
        }" disabled>
      <button onclick="copy()">Copiar</button>`;
        link.classList.add('link');
      }

      if (data.writter === playerNum) {
        displayWordInput(data.id);
      } else {
        pollGameGuest(data.id);
      }
    });
});
