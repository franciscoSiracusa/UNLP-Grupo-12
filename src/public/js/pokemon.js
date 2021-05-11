function stateChangeHandler() {
  if (this.readyState === 4 && this.status === 200) {
    let res = JSON.parse(this.responseText);
    let results = res.results;
    
    results.forEach(pok => makeRequest(pok.url, setPokemon));
   
  }
}

function setPokemon() {
  if (this.readyState === 4 && this.status === 200) {
    let res = JSON.parse(this.responseText);
    
    let img = document.createElement("img");
    img.src = res.sprites.other["official-artwork"].front_default;
    img.classList.add("image");
    document.body.appendChild(img);
  }
}

function makeRequest(url, func) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = func;
  xhttp.open("GET", url, true);
  xhttp.send();
}

makeRequest("https://pokeapi.co/api/v2/pokemon?limit=3&offset=400", stateChangeHandler);
