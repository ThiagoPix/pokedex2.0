const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')
const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')


let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  if (APIResponse.status == 200){
    const data = await APIResponse.json()
    const statusAPIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    const statusData = await statusAPIResponse.json()
    data.stats = statusData.stats
    return data
  } 
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading..."
  const data = await fetchPokemon(pokemon)

  if(data){
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    input.value = ""
    pokemonImage.style.display = 'flex'
    searchPokemon = data.id
    const statusList = document.createElement('ul')
    statusList.classList.add('pokemon__status-list')
    data.stats.forEach((stat) => {
      const statusListItem = document.createElement('li')
      statusListItem.innerHTML = `${stat.stat.name}: ${stat.base_stat}`
      statusList.appendChild(statusListItem)
    });
    pokemonStatus.appendChild(statusList)


    
  } else {
    pokemonName.innerHTML = "not found"
    pokemonNumber.innerHTML = ""
    pokemonImage.style.display = 'none'
    input.value = ""
  }
};


form.addEventListener('submit', (event) => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
  renderPokemonEvolutions(input.value.toLowerCase())
  getStatusPokemon(input.value.toLowerCase())
  pokemonForte(input.value.toLowerCase())
  pokemonFraco(input.value.toLowerCase())
})

prev.addEventListener('click', () => {
  searchPokemon -= 1
  renderPokemon(searchPokemon)
  renderPokemonEvolutions(searchPokemon)
  getStatusPokemon(searchPokemon)
  pokemonForte(searchPokemon)
  pokemonFraco(searchPokemon)
  if(searchPokemon <= 0){
    searchPokemon = 1
    renderPokemon(searchPokemon)
    renderPokemonEvolutions(searchPokemon)
    getStatusPokemon(searchPokemon)
    pokemonForte(searchPokemon)
    pokemonFraco(searchPokemon)
  }
})
next.addEventListener('click', () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
  renderPokemonEvolutions(searchPokemon)
  getStatusPokemon(searchPokemon)
  pokemonForte(searchPokemon)
  pokemonFraco(searchPokemon)
  if(searchPokemon >= 649){
    searchPokemon = 649
    renderPokemon(searchPokemon)
    renderPokemonEvolutions(searchPokemon)
    getStatusPokemon(searchPokemon)
    pokemonForte(searchPokemon)
    pokemonFraco(searchPokemon)
  }
})

renderPokemon(searchPokemon)














document.addEventListener('DOMContentLoaded', () => {
  const pokemonList = document.getElementById('pokemon-list')

  fetch('https://pokeapi.co/api/v2/pokemon?limit=649')
    .then(response => response.json())
    .then(data => {
      data.results.forEach((pokemon, index) => {
        const listItem = document.createElement('li')
        pokemonList.appendChild(listItem);

        renderListItemContent(index + 1, listItem)

        listItem.addEventListener('click', () => {
          
          renderPokemon(index + 1);
          renderPokemonEvolutions(index + 1);
          getStatusPokemon(index + 1)
          pokemonForte(index + 1)
          pokemonFraco(index + 1)
        });
      });
    });
});

function renderListItemContent(id, listItem) {
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`
  fetch(pokemonUrl)
    .then(response => response.json())
    .then(data => {
      const pokemonImage = document.createElement('img')
      pokemonImage.src = data.sprites.front_default
      listItem.appendChild(pokemonImage)

      const pokemonName = document.createElement('span')
      pokemonName.textContent = data.name
      listItem.appendChild(pokemonName)

      const typeColors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
      };

      listItem.addEventListener('mouseover', () => {
        const hoverColor = typeColors[data.types[0].type.name]
        listItem.style.backgroundColor = hoverColor
      })

      listItem.addEventListener('mouseout', () => {
        listItem.style.backgroundColor = "transparent"
      })
    })
}














const pokemonEvolutions = document.querySelector('.evolutions')

const fetchPokemonEvolutions = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`)
  if (APIResponse.status == 200) {
    const data = await APIResponse.json()
    const evolutionChainUrl = data['evolution_chain']['url']
    const evolutionChainResponse = await fetch(evolutionChainUrl)
    const evolutionChainData = await evolutionChainResponse.json()
    return evolutionChainData
  }
};

const renderPokemonEvolutions = async (pokemon) => {
  pokemonEvolutions.innerHTML = "Loading..."
  const data = await fetchPokemonEvolutions(pokemon)

  if (data) {
    pokemonEvolutions.innerHTML = ""
    const chain = data['chain']
    const chainList = document.createElement('ul')
    chainList.classList.add('evolutions__list')
    pokemonEvolutions.appendChild(chainList)

    const firstPokemon = chain['species']['name']
    const firstPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${firstPokemon}`
    const firstPokemonResponse = await fetch(firstPokemonUrl)
    const firstPokemonData = await firstPokemonResponse.json()

    const firstEvolutionItem = document.createElement('li')
    firstEvolutionItem.classList.add('evolutions__item')
    chainList.appendChild(firstEvolutionItem)

    const firstPokemonImage = document.createElement('img')
    firstPokemonImage.src = firstPokemonData.sprites.front_default
    firstPokemonImage.alt = firstPokemon
    firstEvolutionItem.appendChild(firstPokemonImage)

    const firstPokemonName = document.createElement('span')
    firstPokemonName.textContent = firstPokemon
    firstPokemonName.style.color = "white"
    firstPokemonName.style.fontWeight = "bolder"
    firstEvolutionItem.appendChild(firstPokemonName)

    const secondPokemon = chain['evolves_to'][0]['species']['name']
    const secondPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${secondPokemon}`
    const secondPokemonResponse = await fetch(secondPokemonUrl)
    const secondPokemonData = await secondPokemonResponse.json()

    const secondEvolutionItem = document.createElement('li')
    secondEvolutionItem.classList.add('evolutions__item')
    chainList.appendChild(secondEvolutionItem)

    const secondPokemonImage = document.createElement('img')
    secondPokemonImage.src = secondPokemonData.sprites.front_default
    secondPokemonImage.alt = secondPokemon
    secondEvolutionItem.appendChild(secondPokemonImage)

    const secondPokemonName = document.createElement('span')
    secondPokemonName.textContent = secondPokemon
    secondPokemonName.style.color = "white"
    secondPokemonName.style.fontWeight = "bolder"
    secondEvolutionItem.appendChild(secondPokemonName)

    const thirdPokemon = chain['evolves_to'][0]['evolves_to'][0]['species']['name']
    const thirdPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${thirdPokemon}`
    const thirdPokemonResponse = await fetch(thirdPokemonUrl)
    const thirdPokemonData = await thirdPokemonResponse.json()

    const thirdEvolutionItem = document.createElement('li')
    thirdEvolutionItem.classList.add('evolutions__item')
    chainList.appendChild(thirdEvolutionItem)

    const thirdPokemonImage = document.createElement('img')
    thirdPokemonImage.src = thirdPokemonData.sprites.front_default
    thirdPokemonImage.alt = thirdPokemon
    thirdEvolutionItem.appendChild(thirdPokemonImage)

    const thirdPokemonName = document.createElement('span')
    thirdPokemonName.textContent = thirdPokemon
    thirdPokemonName.style.color = "white"
    thirdPokemonName.style.fontWeight = "bolder"
    thirdEvolutionItem.appendChild(thirdPokemonName)
  }
}

renderPokemonEvolutions(1)


















async function getStatusPokemon(nomeOuNumero) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomeOuNumero}`)
  const data = await response.json()
  const status = data.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join('<br>')

  const statusPokemon = document.querySelector('.statusPokemon')
  statusPokemon.innerHTML = `${status}`
}

getStatusPokemon(1)



















const pokemonFraco = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await response.json()
    const pokemonType = data.types[0].type.name
    const response2 = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`)
    const data2 = await response2.json()
    
    const weaknesses = data2.damage_relations.double_damage_from.map((type) => type.name)
    
    const weaknessTexts = {
      "normal": "Normal",
      "fighting": "Lutador",
      "flying": "Voador",
      "poison": "Veneno",
      "ground": "Solo",
      "rock": "Pedra",
      "bug": "Inseto",
      "ghost": "Fantasma",
      "steel": "Aço",
      "fire": "Fogo",
      "water": "Água",
      "grass": "Planta",
      "electric": "Elétrico",
      "psychic": "Psíquico",
      "ice": "Gelo",
      "dragon": "Dragão",
      "dark": "Sombrio",
      "fairy": "Fada",
    }

    const divFraco = document.querySelector(".fraco")
    clearDiv(divFraco)

    for (let weakness of weaknesses) {
      const fraqueza = document.createElement("p")
      fraqueza.classList.add("fraquezas")
      fraqueza.classList.add(weaknessTexts[weakness])
      fraqueza.innerText = weaknessTexts[weakness]
      divFraco.appendChild(fraqueza)
    }

        
      } catch (error) {
        console.log(error)
      }
    }



















const pokemonForte = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await response.json()
    const pokemonType = data.types[0].type.name
    const response2 = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`)
    const data2 = await response2.json()
    const strengths = data2.damage_relations.double_damage_to.map((type) => type.name)

    const strengthTexts = {
      "normal": "Normal",
      "fighting": "Lutador",
      "flying": "Voador",
      "poison": "Venen.",
      "ground": "Solo",
      "rock": "Pedra",
      "bug": "Inseto",
      "ghost": "Fantasma",
      "steel": "Aço",
      "fire": "Fogo",
      "water": "Água",
      "grass": "Planta",
      "electric": "Elétrico",
      "psychic": "Psíquico",
      "ice": "Gelo",
      "dragon": "Dragão",
      "dark": "Sombrio",
      "fairy": "Fada",
    };

    const divForte = document.querySelector(".forte")
    clearDiv(divForte);

    for (let strength of strengths) {
      const fortaleza = document.createElement("p")
      fortaleza.classList.add("fortaleza")
      fortaleza.classList.add(strengthTexts[strength])
      fortaleza.innerText = strengthTexts[strength]
      divForte.appendChild(fortaleza)
    }

  } catch (error) {
    console.log(error)
  }
}



const clearDiv = (div) => {
  const elementsToRemove = div.querySelectorAll("p")
  elementsToRemove.forEach((element) => element.remove())
}



pokemonForte(1)
pokemonFraco(1)
