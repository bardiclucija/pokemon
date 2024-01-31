<template>
  <div class="pokedex">
    <header>
      <div class="nav">
        <NuxtLink to="/game" class="nuxt-link"><button>Back to game</button></NuxtLink>
        <NuxtLink to="/" class="nuxt-link"><button @click="pokedexStore.resetGame()">Exit game</button></NuxtLink>
      </div>
    </header>
    <div class="title-pokedex">
      <h2>Pokédex</h2>
    </div>
    <div class="progress-bar-div">
      <div class="progress-inner">
        <div class="progress-bar" :style="{ width: `${progress}%` }"><div style="margin-left: 1vw;">{{ progress }}%</div></div>
      </div>
    </div>
    <div class="pokemon-grid">
      <div class="pokemon-card-container" v-for="(pokemon, index) in pokemonList" :key="index">
        <div class="pokemon-card" :class="{ shake: shake && pokemon.id !== undefined }" :style="{backgroundColor: pokedexStore.pokemonColors[pokemon.type]}">
        <div v-if="pokemon.id !== undefined">
          <NuxtLink :to="`/pokemon/${pokemon.id}`" class="nuxt-link">
            <img v-if="pokemon.name" :src="pokedexStore.getPokemonImage(pokemon.id)" alt="Pokemon Image" class="img-fluid" />
            <h4 v-if="pokemon.name"  class="pokemon-name">{{ pokedexStore.capitalizeFirstLetter(pokemon.name) }} <br> </h4>
            <p class="number">#{{ index+1 }}</p>
            <div class="type" v-if="pokemon.name" >
              <h3 >Type:</h3>
              <div class="type-wrapper">
                <img v-if="pokemon.type" :src="getImageUrl(pokemon.type)" alt="">
                <h3>{{ pokemon.type }}</h3>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div v-else :class="{shake:shake}" >
            <NuxtLink @click="shakeCard(index)">
            <img v-if="$colorMode.preference==='dark'" src="../assets/img/question-mark-dark.png" alt="" class="question-mark">
            <img v-else src="../assets/img/question-mark.png" class="question-mark" >
            <p class="number">#{{ index+1 }}</p>
          </NuxtLink>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePokedexStore } from '../stores/pokedex';

const pokedexStore = usePokedexStore();
const pokemonList = pokedexStore.getPokemonList();
const capturedPokemons = pokedexStore.capturedPokemons;
const progress = ((capturedPokemons.length/151)*100).toFixed(0);
const shake = ref(false);

function shakeCard() {
  shake.value = true;
  setTimeout(() => {
    shake.value = false;
  }, 1500);
};
const getImageUrl = (type) => {
  return new URL(`../assets/img/${type}.png`, import.meta.url);
};
</script>

<style lang="scss" scoped>
header {
    width: 100%;
    display: flex;
    justify-content: center;
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 2vh;
      padding: 0 3vh;
    }
    button {
      background-color: #fbeee0;
      border: 2px solid black;
      border-radius: 30px;
      box-shadow: black 4px 4px 0 0;
      color: black;
      cursor: pointer;
      font-weight: 600;
      font-size: 1.5em;
      padding: 2vh;
    }
    button:hover {
      background-color: #fff;
    }
    .nuxt-link {
      text-decoration: none;
      color: black;
    }
  }
  .dark-mode button {
  background-color: #363b81;
  color: #fdea9e;
}
.dark-mode button:hover {
  background-color: #181d5a;
}
  .progress-bar-div {
    display: flex;
    justify-content: center;
    .progress-inner {
      width: 60vw;
      height: 20px;
      border: 1px solid black;
      box-shadow: black 1px 2px 0 0;
      border-radius: 20px;
      margin-top: 1vh;
      }
      .progress-bar {
        height: 100%;
        border-radius: 20px;
        background-image: linear-gradient(to right, #319d49, #5dc474, #8be29e, #b6fdc6);
        background-size: 60vw 100%;
    }
  }
  .dark-mode .progress-inner {
    border: 1px solid #fbd743
  }
  .dark-mode .progress-bar {
    color: white;
  }
  .dark-mode .number {
    color: white;
  }
.title-pokedex {
  font-size: 3vw;
  color: black;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  h2 {
    margin-top: 1vh;
    margin-bottom: 0;
  }
}
.dark-mode .title-pokedex  {
  color: #fbd743;
}
.pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
    gap: 25px;
    margin-top: 5vh;
    margin-left: 1vw;
    margin-right: 1vw;
  }
  .pokemon-card-container {
    display: flex;
  }
.pokemon-card {
  flex: 1;
  text-align: center;
  box-shadow: 0 6px 8px 0 black;
  border-radius: 20px;
  height: 100%;
  margin: 1vh;
  p {
    margin-bottom: 0;
    color: black;
  }
  h4 {color: black;}
  h3 {color: black;}
  .nuxt-link {
    text-decoration: none;
  }
}
.img-fluid {
  width: 20vh;
  max-width: 100%;
  height: auto;
}
.question-mark {
  width: 20vh;
  margin-top: 5vh;
}
.pokemon-name {
  margin-top: 2vh;
  font-size: 25px;
}
.type {
  display: flex;
  justify-content: center;
  align-items: center
  h3 {
    margin-top: 1vh;
  }
  img {
    width: 35px;
    height: 35px;
    margin-left: 0.5vw;
    margin-right: 0.5vw;
  }
  .type-wrapper {
    display: flex;
    align-items: center;
  }
}
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,90% {transform: translate3d(-1px, 0, 0);}
  20%,80% {transform: translate3d(2px, 0, 0);}
  30%,50%,70% {transform: translate3d(-4px, 0, 0);}
  40%,60% {transform: translate3d(4px, 0, 0);}
}
@media (max-width: 1300px) {
  .pokemon-grid {
      grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
    }
    header{
      button {
        font-size: 1.5em;
      }
    }
    .question-mark {
      margin-top: 5vh;
    }

}
@media (max-width: 1000px) {
  .pokemon-grid {
      grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
    }
}
@media (max-width: 860px) {
  .pokemon-grid {
      grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
      margin-left: 15vw;
      margin-right: 15vw;
      margin-top: 2vh;
    }
  .title-pokedex {
    font-size: 5vw;
    }
  header {
    button {
    font-size: 1em;
    }
  }
}
@media (max-width: 500px) {
  header {
    button {
    font-size: 1em;
    }
  }
}
@media (max-width: 420px) {
  header {
    button {
    padding: 1vh;
    margin-top: 1vh;
    }
    .nav {
      flex-direction: column;
      margin-top: 0;
    }
  }
  .pokemon-grid {
    margin: auto;
  }
}
@media (max-width: 1480px) and (min-height: 1700px) {
  .pokemon-grid {
    margin-left: auto;
    margin-right: auto;
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  }
  .question-mark {
      width: 15vh;
    }
}

@media (max-width: 1100px) and (min-height: 1700px) {
  .pokemon-grid {
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  }
}

@media (max-width: 780px) and (min-height: 1700px) {
  .pokemon-grid {
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
  }
}
@keyframes mover {
    0% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0); }
  }
</style>