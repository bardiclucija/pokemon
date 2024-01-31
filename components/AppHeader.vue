<template>
  <header>
    <div class="nav">
      <NuxtLink to="/pokedex" class="nuxt-link"><button class="pokedex-btn">Pokédex</button></NuxtLink>
      <NuxtLink to="/" class="nuxt-link"><button @click="pokedexStore.resetGame()">Exit game</button></NuxtLink>
    </div>
  </header>
</template>

<script setup>
import { usePokedexStore } from '../stores/pokedex';
import { ref } from 'vue';

const pokedexStore = usePokedexStore();
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
      font-size: 18px;
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

@media (max-width: 405px) {
  header{
      .nav {
          padding: 0 2vh;
      }
  }
}

@media (max-height: 2560px) {
  header{
    button {
      font-size: 25px;
    }
  }
}

@media (max-width: 1250PX) {
  header{
    button {
      font-size: 20px;
    }
  }
}

</style>