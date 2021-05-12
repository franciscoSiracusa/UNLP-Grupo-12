function stateChangeHandler() {
  if (this.readyState === 4 && this.status === 200) {
    let res = JSON.parse(this.responseText);
    let results = res.results;

    pokemonImages.forEach((pokemon, index) => {
      pokemon.id = results[index].name;
    });

    results.forEach((pok) => makeRequest(pok.url, setPokemon));
  }
}

function setPokemon() {
  if (this.readyState === 4 && this.status === 200) {
    let res = JSON.parse(this.responseText);
    pokemonImages.forEach((container) => {
      if (container.id == res.name) {
        container.style.backgroundImage = `url(${res.sprites.other['official-artwork'].front_default})`;
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

makeRequest(
  'https://pokeapi.co/api/v2/pokemon?limit=6&offset=0',
  stateChangeHandler
);
const pokemonImages = document.querySelectorAll('.pokemon');
