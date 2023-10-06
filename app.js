const promises = [];

for (let i = 1; i <= 1000; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then(res => res.json())); 
}


Promise.all(promises).then(results => {
    const pokemon = results.map(data => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      ability: data.abilities.map(ability => ability.ability.name).join(","),
      type: data.types.map(type => type.type.name).join(", "),
      stats: data.stats.map(stats => stats.stat.name).join(": </br>"),
      statsNumber: data.stats.map(stats => stats.base_stat).join("</br>")
    }));
    displayPokemon(pokemon);
  });



const displayPokemon = pokemon => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
      .map(
        pokeman =>
          ` <li class="card"> 
              <img class="card-image" src="${pokeman.image}"/>
              <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            </li>
            <li class="card card-info">
              <h4 >Type: ${pokeman.type}</h4> 
              <p>Ability: ${pokeman.ability}</p>
              <h4>Base Stats:</h4>
              <div class="organise">
                <p>${pokeman.stats}</p>
                <p>${pokeman.statsNumber}</p>
              </div>
            </li>`
      )
      .join("");
    pokedex.innerHTML = pokemonHTMLString;
  };


  
  

  