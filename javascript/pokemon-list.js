let currentlyShowingAmount = 0;
let maxIndex = 29;
let currentList = [];

const typeColors = {
    'normal': '#BCBCAC',
    'fighting': '#BC5442',
    'flying': '#669AFF',
    'poison': '#AB549A',
    'ground': '#DEBC54',
    'rock': '#BCAC66',
    'bug': '#ABBC1C',
    'ghost': '#6666BC',
    'steel': '#ABACBC',
    'fire': '#FF421C',
    'water': '#2F9AFF',
    'grass': '#78CD54',
    'electric': '#FFCD30',
    'psychic': '#FF549A',
    'ice': '#78DEFF',
    'dragon': '#7866EF',
    'dark': '#785442',
    'fairy': '#FFACFF',
    'shadow': '#0E2E4C'
};

/** atualiza a lista de pokémons para */
function updatePokemonList() {
    if(currentlyShowingAmount <= maxIndex) {
        renderPokemonListItem(currentlyShowingAmount);
    };
};

/** renderizar */
function renderPokemonListItem(index) {
    if (currentList[index]) {
        document.getElementById('pokedex-list-render-container').insertAdjacentHTML('beforeend', `<div onclick="openInfo(${currentList[index].id})" class="pokemon-render-result-container container center column">
                                                                                                    <img class="search-pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentList[index].id}.png">
                                                                                                    <span class="bold font-size-12">N° ${currentList[index].id}</span>
                                                                                                    <h3>${dressUpPayloadValue(currentList[index].name)}</h3>
                                                                                                    ${getTypeContainers(currentList[index].types)}
                                                                                                </div>`);

        currentlyShowingAmount += 1;

        updatePokemonList();
    };
};

function increaseMaxIndex(by) {
    if (maxIndex + by <= currentList.length) {
        maxIndex += by;
    } else {
        maxIndex = currentList.length - 1;
    };
};

/**obtém contêiners de tipo para informações de pokémon */
function getTypeContainers(typesArray) {
    let htmlToReturn = '<div class="row">';

    for (let i = 0; i < typesArray.length; i++) {
        htmlToReturn += `<div class="type-container" style="background: ${typeColors[typesArray[i]]};">
                                ${dressUpPayloadValue(typesArray[i])}
                            </div>`;
    };

    return htmlToReturn + '</div>';
};

/**na tecla de entrada de pesquisa*/
function search() {
    setTimeout(function () {
        let searchResults = [];

        for (let i = 0; i < pokemons.length; i++) {
            if (pokemons[i].name) {
                if (pokemons[i].name.replaceAll('-', ' ').includes(document.getElementById('search-input').value.toLowerCase())) {
                    searchResults.push(pokemons[i]);
                };
            };
        };

        document.getElementById('pokedex-list-render-container').innerHTML = '';

        currentList = searchResults;
        currentlyShowingAmount = 0;
        maxIndex = 0;

        increaseMaxIndex(30);
        updatePokemonList();
    }, 1);
};


/** Scroll */
window.addEventListener('scroll', function () {
    addNewScrollPokemon();
    updateBackToTopVisibility();
});

/** adiciona novo pokémon scroll quando o fundo é atingido */
function addNewScrollPokemon() {
    if (window.scrollY + 100 >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
        increaseMaxIndex(30);
        updatePokemonList();
    };
};

/**torna o botão voltar ao topo visível */
function updateBackToTopVisibility() {
    if(window.scrollY > window.innerHeight) {
        document.getElementById('back-to-top-button').classList.remove('hide');
    } else {
        document.getElementById('back-to-top-button').classList.add('hide');
    };
};

function backToTop() {
    window.scrollTo(0, 0);
};


/** melhorar o valor da carga útil */
function dressUpPayloadValue(string) {
    let splitStr = string.toLowerCase().split('-');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    };
    return splitStr.join(' ');
};