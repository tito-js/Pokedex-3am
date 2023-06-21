/** informações abertas quando o pokémon da lista é clicado */
function openInfo(id) {
    document.getElementById("current-pokemon-empty").classList.add("hide");

    if (window.innerWidth > 1100) {
        slideOutPokemonInfo();

        setTimeout(function () {
        fetchPokemonInfo(id);
        updateCurrentPokemonImage(id);
        }, 350);
    } else {
        fetchPokemonInfo(id);
        updateCurrentPokemonImage(id);
    };
};

/** buscar informações do pokémon */
async function fetchPokemonInfo(id) {
    const urlPokemon = "https://pokeapi.co/api/v2/pokemon/" + id;
    const urlSpecies = "https://pokeapi.co/api/v2/pokemon-species/" + id;
    const responsePokemon = await fetch(urlPokemon);
    const responseSpecies = await fetch(urlSpecies);
    const pokemon = await responsePokemon.json();
    const species = await responseSpecies.json();

    const responseEvolutions = await fetch(species.evolution_chain.url);
    const evolution_chain = await responseEvolutions.json();

    setupPokemonAbout(pokemon, id, species);
    setupPokemonStats(pokemon);
    setupPokemonAbilities(pokemon);
    setupEvolutionChain(evolution_chain);
    setupResponsiveBackground(pokemon);

    slideOutPokemonInfo();

    if (window.innerWidth < 1100) {
        openPokemonResponsiveInfo();
    };
};

/**atualize a imagem do pokémon e ajuste a altura para várias dimensões do sprite ---> (para posicionar diretamente acima das informações) */
function updateCurrentPokemonImage(id) {

    const currentPokemonImage = Document.getElementById('current-pokemon-image');
    const img = new Image();

    img.onload = function() {
        currentPokemonImage.src = this.src;
        currentPokemonImage.style.height * 3 + 'px';
    };

    if(id >= 650) {
        img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/' + id + '.png';
    } else {
        img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + id + '.gif';
    };
};

/** configura id do pokémon, nome, tipos, altura, peso e descrição */
function setupPokemonAbout(pokemon, id, species) {
    document.getElementById('current-pokemon-info').classList.remove('hide');
    document.getElementById('current-pokemon-id').innerHTML = 'N° ' + pokemon.id;
    document.getElementById('current-pokemon-name').innerHTML = dressUpPayloadValue(pokemon.name);
    document.getElementById('current-pokemon-types').innerHTML = getTypeContainers(pokemons[id - 1].types);
    document.getElementById('current-pokemon-height').innerHTML = pokemon.height / 10 + 'm';
    document.getElementById('current-pokemon-weight').innerHTML = pokemon.weigth / 10 + 'kg';

    for(i = 0; i < species.flavo_text_entries.length; i++) {
        if(species.flavo_text_entries[i].language.name == 'pt-br'){
            document.getElementById('current-pokemon-descripiton').innerHTML = dressUpPayloadValue(species.flavo_text_entries[i].flavo_text.replace('', ' '));
            break;
        };
    };
};

/** configura as estatísticas do pokémon */
function setupPokemonStats(pokemon) {
    
}