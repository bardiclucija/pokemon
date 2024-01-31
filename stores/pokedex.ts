import { defineStore } from 'pinia';

export const usePokedexStore = defineStore('pokedex', () => {
  const capturedPokemons: Ref<number[]> = ref([]);
  const pokemonList = ref(
    Array.from({ length: 151 }, (_, index) => ({}))
  );
  
  const addCapturedPokemon = (id: number, guessedPokemon: {}) => {
    let targetIndex = id - 1;
    pokemonList.value.splice(targetIndex, 1, guessedPokemon);
    capturedPokemons.value.push(id);
  };

  function getPokemonList() {
    return pokemonList.value;
  }

  function resetGame(){
    capturedPokemons.value = [];
    pokemonList.value = Array.from({ length: 151 }, (_, index) => ({}));
  };

  const guessedCount = computed(() => capturedPokemons.value.length)

  const getPokemonById = (id: number): Record<string, any> | null => {
    const targetIndex = id - 1;
    if (targetIndex >= 0 && targetIndex < pokemonList.value.length) {
      return pokemonList.value[targetIndex];
    }
    return null;
  };

  const getPokemonImage = (id:number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  };

  const capitalizeFirstLetter = (str: String) => {
    if (str && typeof str === 'string' && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return '';
  };

  const pokemonColors = ref({
    normal: '#A8A77A',
    fire: '#ed8e47',
    water: '#739cf5',
    electric: '#f7d74d',
    grass: '#8fd964',
    ice: '#96D9D6',
    fighting: '#d4433d',
    poison: '#9d50b3',
    ground: '#E2BF65',
    flying: '#968ff3',
    psychic: '#f06992',
    bug: '#aebd44',
    rock: '#b8ab6a',
    ghost: '#615797',
    dragon: '#695eff',
    dark: '#80695b',
    steel: '#ababc7',
    fairy: '#d18eaf',
  });
  return {
    capturedPokemons,
    pokemonList,
    addCapturedPokemon,
    getPokemonList,
    guessedCount,
    resetGame,
    getPokemonById,
    getPokemonImage,
    capitalizeFirstLetter,
    pokemonColors
  };
});
