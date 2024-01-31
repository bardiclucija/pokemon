<template>
  <div class="game">
    <div v-if="isLoading" class="loader">
      <img src="../assets/img/pokeball2.png" alt="Pokeball loader">
    </div>
  <div v-if="isLoading===false" class="background">
    <AppHeader />
    <div v-if="capturedPokemons.length === 151" > 
      <div class="card-container win-card">
        <div class="card" style="flex-direction: column; animation: mover 2s infinite  alternate; margin-top: 7vh;">
          <h1>Congratulations!</h1> 
          <h1>You've captured all the Pokémon.</h1>
      </div>
      </div>
    </div>
    <div v-else class="card-container">
      <div class="card">
        <div class="pokemon-content">
          <div class="input">
            <div>
              <h1>Who's that Pokémon?</h1>
            </div>
            <div class="input-field-div">
              <input v-model="userInput" @keyup.enter="checkPokemon"  type="text" id="pokemonInput" class="input-field" :class="{ 'shake': isShaking, 'red-border': isShaking }" />
              <button @click="checkPokemon" class="check-btn">Check</button>
            </div>
            <div>
              <button @click="resetStreak" :disabled="points === 151" class="generate-pokemon-btn">Generate new Pokémon</button>
            </div>
          </div>
          <div class="pokemon-img" v-show="selectedPokemon">
            <img :src="selectedPokemon.img" alt="Pokemon">
            <hr>
          </div>
        </div>
      </div>
      <div class="card score-card"><div class="floating-score" v-if="showFloatingScore">+1</div>
        <div>
          <h3>Points: {{ points }}/151</h3>
          <h3>Streak: {{ streak }}</h3>
          <p>{{ selectedPokemon.name }} - {{ selectedPokemon.id }}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { usePokedexStore } from '../stores/pokedex';

const colorMode = useColorMode();
const pokedexStore = usePokedexStore();
const {capturedPokemons} = pokedexStore;
const isLoading = ref(true);
const userInput = ref('');
const showFloatingScore = ref(false);
const isShaking = ref(false);
const isCorrect = ref(false);
const streak = ref(0);
const selectedPokemon = ref({
  id: '',
  name: '',
  img: '',
  type: '',
  hp: '',
  speed: '',
  attack: '',
  defense: '',
});

const getRandomPokemon = async () => {
  if (capturedPokemons.length === 151) {
    console.log('END OF GAME')
  }

  let random_pokemon_id;
  do {
    random_pokemon_id = Math.floor(Math.random() * 151) + 1;
  } while (capturedPokemons.includes(random_pokemon_id));

  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${random_pokemon_id}`);
  const selectedPokemonData = response.data;
  const pokemon_img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${random_pokemon_id}.png`;
  const speed = selectedPokemonData.stats.find((stat) => stat.stat.name === 'speed').base_stat;
  const attack = selectedPokemonData.stats.find((stat) => stat.stat.name === 'attack').base_stat;
  const defense = selectedPokemonData.stats.find((stat) => stat.stat.name === 'defense').base_stat;

  selectedPokemon.value = {
    id: selectedPokemonData.id,
    name: selectedPokemonData.name,
    img: pokemon_img,
    type: selectedPokemonData.types[0].type.name,
    hp: selectedPokemonData.stats[0]?.base_stat,
    speed,
    attack,
    defense,
  };

  isCorrect.value = false;
  userInput.value = '';
  setTimeout(() => {
      isLoading.value = false;
    }, 2000);
};

const checkPokemon = () => {
  if (userInput.value.toLowerCase() === selectedPokemon.value.name.toLowerCase()) {
    isCorrect.value = true;
    streak.value += 1;
    showFloatingScore.value = true;

    setTimeout(() => {
      showFloatingScore.value = false;
    }, 1000);
  } else {
    isCorrect.value = false;
    streak.value = 0;
    isShaking.value = true;

    setTimeout(() => {
      isShaking.value = false;
    }, 1000);
  }

  if (isCorrect.value) {
    pokedexStore.addCapturedPokemon(selectedPokemon.value.id, selectedPokemon.value);

    setTimeout(() => {
      getRandomPokemon();
    }, 1000);
  } else {
    userInput.value = '';
  }
};

const points = computed(() => pokedexStore.guessedCount);
console.log(colorMode)
const resetStreak = () => {
  streak.value = 0;
  getRandomPokemon();
};

onMounted(() => {
  getRandomPokemon();
});
</script>

<style lang="scss" scoped>
  $red-colour: #cc0000;
  .game {
    width: 100vw;
    height: 100vh;
  }
  .background {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .loader {
    img {
      top: 40%;
      left: 47%;
      position: absolute;
      height: 10%;
      animation: rotation 4s infinite linear;
    }
  }
  .card-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
      .card {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fbeee0;
        box-shadow: black 4px 4px 0 0;
        border: 2px solid black;
        border-radius: 30px;

          .pokemon-img img {
            width: 18em;
            height: auto;
            padding: 3vh;
          }
          .pokemon-content {
            display: flex;
            flex-direction: column-reverse;
            align-items: center;
            justify-content: space-between; 
          }
          .input {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            text-align: center;
            .input-field-div {
              display: flex;
              justify-content: center;
              .input-field {
                font-family: 'Roboto';
                font-size: 15px;
                border-radius: 15px;
                border: 1px solid black;
              }
              .check-btn {
                font-size: 15px;
                padding: 1vh;
                border-radius: 30px;
                border: 1px solid black;
              }
            }
            .generate-pokemon-btn {
              margin-top: 2vh;
              margin-bottom: 2vh;
              padding: 1vh;
              font-size: 15px;
              border-radius: 30px;
              border: 1px solid black;
            }
            .red-border {
              box-shadow: 0px 0px 15px 0px $red-colour;
            }
            .shake {
              animation: shake 0.3s ease-in;
            }
          }
        }
      .score-card {
        margin-left: 1vw;
        padding: 1vh 2vw;
        animation: mover 2s infinite  alternate;
          h3 {
            color: $red-colour;
          }
        }
      .floating-score {
        position: absolute;
        top: 30%;
        left: 80%;
        font-size: 2em;
        color: $red-colour;
        animation: floatScore 2s ease-out;
        z-index:1;
      } 
    }
  .dark-mode .card {
      background-color: #363b81;

    }
  .dark-mode h1, .dark-mode hr {
    color: #fdea9e;
  }
  .dark-mode .score-card h3 {
    color: #ba3c3c;
  }
  @media(max-width: 380px) {
    .pokemon-img img {
      width: 16em !important;
      height: auto;
    }
    .input {
      h1 {
        font-size: 1.7em !important;
      }
    }
  }
  @media(max-width: 405px) {
    .card-container img {
      padding: 0;
    }
    .input {
      h1 {
        font-size: 1.8em;
        padding-left: 1vh;
        padding-right: 1vh;
      }
    }
    .score-card {
      margin-top: 2vw;
      width: 92%;
      padding: 0;
      h3 {
        margin-top: 0.2vh;
        margin-bottom: 0;
        font-size: 25px;
      }
    }
  }

  @media(max-width: 405px) and (min-height: 600px) {
    .card-container {
      img {
      padding: 0 !important;
      }
    }
  }
  @media (max-width: 650px) {
    .pokedex, .exit {
      margin-bottom: 2vh;
    }
    .card-container {
      flex-direction: column;
    }
    .win-card {
      font-size: 0.9em;
      margin-left: 2vh;
      margin-right: 2vh;
      h1 {
        text-align: center;
      }
    }
    .score-card {
      margin-top: 2vw;
      width: 92%;
      padding: 0;
      animation: shake-small 2s infinite  alternate !important;
      h3 {
        margin-top: 0.2vh;
        margin-bottom: 0;
        font-size: 2.5vh;
      }
    }
    .loader {
      img {
        top: 40%;
        left: 42%;
        position: absolute;
        height: 10%;
        animation: rotation 4s infinite linear;
      }
    }
  }
  @media (max-height: 670px) {
    .pokemon-img img {
      width: 15em;
      height: auto;
    }
  }
  @media (min-width: 1200px) and (min-height: 860px) {
    .card-container {
      margin-bottom: 10vh;
    }
    .score-card {
      h3 {
        font-size: 2.2vh;
      }
    }
    .check-btn {
      font-size: 0.8vw !important;
    }

    .generate-pokemon-btn {
      font-size: 0.8vw !important;
    }
    .input-field {
      font-size: 20px !important;
    }
  }

@keyframes floatScore {
  from {
    transform: translate(0, 0);
    opacity: 1;
  }
  to {
    transform: translate(0, -2vw);
    opacity: 0;
  }
}
@keyframes rotation {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
@keyframes shake {
    0%, 100% {transform: translateX(0);}
    25%, 75% {transform: translateX(-5px);}
    50% {transform: translateX(5px);}
}
@keyframes shake-small {
    0%, 100% {transform: translateY(0);}
    25% {transform: translateY(-2px);}
    50% {transform: translateY(2px);}
}
</style>