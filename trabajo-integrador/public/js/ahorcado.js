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
  submit.textContent = 'Ingresar';
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(encodeURI(`/ahorcado/setWord?id=${id}&word=${e.target.word.value}`), {
      method: 'POST',
    })
      .then((res) => res.json)
      .then((data) => {
        e.target.reset();
      });
  });

  form.appendChild(input);
  form.appendChild(submit);
};

const displayLetterInput = () => {};

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
        //pollGame();
      }
    });
});
