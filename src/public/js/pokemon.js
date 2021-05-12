function stateChangeHandler() {
  if (this.readyState === 4 && this.status === 200) {
    let res = JSON.parse(this.responseText);
    let results = res.results;
    siguiente = res.next;
    anterior = res.previous;

    //ordenar los pokemons
    pokemonImages.forEach((container, index) => {
      container.id = results[index].name;
      container.dataset.url = results[index].url;
    });
    // crear los pokemons
    results.forEach((pok) => makeRequest(pok.url, setPokemon));
  }
}

function setPokemon() {
  if (this.readyState === 4 && this.status === 200) {
    let res = JSON.parse(this.responseText);
    pokemonImages.forEach((container) => {
      if (container.id == res.name) {
        container.style.backgroundImage = `url(${res.sprites.other['official-artwork'].front_default})`;
        container.innerHTML = '';
        const h5 = document.createElement('h5');
        h5.textContent = res.name[0].toUpperCase() + res.name.slice(1);
        container.appendChild(h5);
      }
    });
  }
}

function makeRequest(url, func) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = func;
  xhttp.open('GET', url, true);
  xhttp.send();
}

function displayInfo() {
  if (this.readyState === 4 && this.status === 200) {
    let res = JSON.parse(this.responseText);
    console.log(res);
    /* id pokemon */
    const infoHeader = document.querySelector('.info-header');
    infoHeader.childNodes[1].textContent = 'N°' + res.id;
    /* pokemon name */
    infoHeader.childNodes[5].textContent =
      res.name[0].toUpperCase() + res.name.slice(1);
    /* pokemon height */
    const pokemonHeight = document.getElementById('height');
    pokemonHeight.childNodes[1].textContent = 'Altura';
    pokemonHeight.childNodes[5].textContent = res.height / 10 + ' metros';
    /* pokemon weight */
    const pokemonWeight = document.getElementById('weight');
    pokemonWeight.childNodes[1].textContent = 'Peso';
    pokemonWeight.childNodes[5].textContent = res.weight / 10 + '  kg';
    /* habilidades */
    const pokemonAbilities = document.getElementById('abilities');
    pokemonAbilities.innerHTML = ' <h5>Habilidades</h5>';
    res.abilities.forEach((ability) => {
      const p = document.createElement('p');
      p.textContent = ability.is_hidden
        ? ability.ability.name + ' (oculta)'
        : ability.ability.name;
      pokemonAbilities.appendChild(p);
    });
    /* types */
    const pokemonTypes = document.getElementById('types');
    pokemonTypes.innerHTML = '<h5>Tipos</h5>';
    res.types.forEach((type) => {
      const p = document.createElement('p');
      p.textContent = type.type.name;
      pokemonTypes.appendChild(p);
    });
  }
}

/* Main code */
let siguiente;
let anterior;

const nextPage = document.getElementById('nextPage');
nextPage.addEventListener('click', () => {
  if (siguiente !== null) {
    if (siguiente.charAt()) {
    } //todo
    makeRequest(siguiente, stateChangeHandler);
    removeClicked();
  }
});

const previousPage = document.getElementById('previousPage');
previousPage.addEventListener('click', () => {
  if (anterior !== null) {
    if (anterior.charAt(anterior.length - 1) !== '6') {
      anterior = anterior.slice(0, anterior.length - 1) + '6';
    }
    makeRequest(anterior, stateChangeHandler);
    removeClicked();
  }
});

makeRequest(
  'https://pokeapi.co/api/v2/pokemon?limit=6&offset=1103',
  stateChangeHandler
);

function removeClicked() {
  pokemonImages.forEach((container) => {
    container.classList.remove('clicked');
  });
}

const pokemonImages = document.querySelectorAll('.pokemon');
pokemonImages.forEach((container) => {
  container.addEventListener('click', () => {
    document.querySelector('.info').classList.remove('undisplayed');
    // quitar clase clicked
    removeClicked();
    container.classList.add('clicked');
    // TODO
    // si el pokemon esta clickeado, no hacer el request
    makeRequest(container.dataset.url, displayInfo);
  });
});
