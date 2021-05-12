function stateChangeHandler() {
  if (this.readyState === 4 && this.status === 200) {
    let res = JSON.parse(this.responseText);
    let results = res.results;
<<<<<<< HEAD
    siguiente = res.next;
    anterior = res.previous;

    //ordenar los pokemons
    pokemonImages.forEach((container, index) => {
      container.id = results[index].name;
      container.dataset.url = results[index].url;
    });
    // crear los pokemons
=======

    pokemonImages.forEach((pokemon, index) => {
      pokemon.id = results[index].name;
    });

>>>>>>> 930b9a16774ebe7b7da612cc74c34a442b787d06
    results.forEach((pok) => makeRequest(pok.url, setPokemon));
  }
}

function setPokemon() {
  if (this.readyState === 4 && this.status === 200) {
    let res = JSON.parse(this.responseText);
    pokemonImages.forEach((container) => {
      if (container.id == res.name) {
        container.style.backgroundImage = `url(${res.sprites.other['official-artwork'].front_default})`;
<<<<<<< HEAD
        container.innerHTML = '';
=======
>>>>>>> 930b9a16774ebe7b7da612cc74c34a442b787d06
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

<<<<<<< HEAD
function displayInfo() {
  if (this.readyState === 4 && this.status === 200) {
    let res = JSON.parse(this.responseText);
    console.log(res);
    const info = document.querySelector('.info');
  }
}

/* Main code */
let siguiente;
let anterior;

const nextPage = document.getElementById('nextPage');
nextPage.addEventListener('click', () => {
  if (siguiente === null) {
    alert('no hay mas pokemones');
  } else {
    makeRequest(siguiente, stateChangeHandler);
  }
});

const previousPage = document.getElementById('previousPage');
previousPage.addEventListener('click', () => {
  if (anterior.charAt(anterior.length - 1) !== '6') {
    //todo
    anterior = anterior.splice(0, anterior.length - 1, '6');
  }
  makeRequest(anterior, stateChangeHandler);
});

makeRequest(
  'https://pokeapi.co/api/v2/pokemon?limit=6&offset=15',
  stateChangeHandler
);

const pokemonImages = document.querySelectorAll('.pokemon');
pokemonImages.forEach((container) => {
  container.addEventListener('click', () => {
    makeRequest(container.dataset.url, displayInfo);
  });
});
=======
makeRequest(
  'https://pokeapi.co/api/v2/pokemon?limit=6&offset=0',
  stateChangeHandler
);
const pokemonImages = document.querySelectorAll('.pokemon');
>>>>>>> 930b9a16774ebe7b7da612cc74c34a442b787d06
