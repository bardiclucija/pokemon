<template>
  <div class="by-id">
    <div>
    <div class="maincontainer">
    <AppHeader/>
  <div class="container" :class="{ flipped: isFlipped }" @mouseover="flipCard(true)" @mouseout="flipCard(false)">
    <div class="pokemontype" :class = "pokemon.type" >
      <div class = "nameheaders">
        <div class = "nameofanimal">
          {{ pokedexStore.capitalizeFirstLetter(pokemon.name) }}
        </div>
        <div class = "hp">
          <img :src="getImageUrl(pokemon.type)" alt="">
          {{ pokemon.hp }} HP
        </div>
      </div>
      <div class="headshot">
         <img v-if="pokemon.id" :src="pokedexStore.getPokemonImage(pokemon.id)" alt="Pokemon Image"> 
         <img v-else src="../../assets/img/question-mark.png" alt="Pokemon Image" style="width: 16vw;"> 
      </div>
      <div class = "stats">
        <div>  
          <p>Type: {{ pokedexStore.capitalizeFirstLetter(pokemon.type) }}</p>
          <hr>
        </div>
        <div>
          <p>Attack: {{ pokemon.attack }}</p>
          <hr>
        </div>
        <div>
          <p>Defense: {{ pokemon.defense }}</p>
          <hr>
        </div>
        <div>
          <p>Speed: {{ pokemon.speed }}</p>
          <hr>
        </div>
        </div>    
      </div> 
      <img class="pokemoncard" src="../../assets/img/pokemoncard.png" alt="">
    </div>
  </div> 
  </div>
  </div>
  
   
</template>
<script setup>
import { usePokedexStore } from '../stores/pokedex';
import { ref } from 'vue';

const pokedexStore = usePokedexStore();
const route = useRoute();
const isFlipped = ref(false);
const pokemonId = parseInt(route.params.id);
const pokemon = pokedexStore.getPokemonById(pokemonId);

const flipCard = (value) => {
isFlipped.value = value;
};

const getImageUrl = (type) => {
  return new URL(`../../assets/img/${type}.png`, import.meta.url);
};
</script>

<style lang="scss" scoped>
.by-id {
  width: 100vw;
  height: 100vh;
}
.flipped {
transform: rotateY(180deg);
}

.maincontainer {
position: relative;
font-family: 'Roboto';
.container {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  margin-left: auto;
  margin-right: auto;
  transform-style: preserve-3d;
  transition: transform 0.8s ease;
  width: 350px;
  height: 540px;
  transform: rotateY(0deg);
  .nameheaders {
    display: flex;
    justify-content: space-between;
    width: 100%;
    backface-visibility: hidden;
    .nameofanimal {
      font-size: 20px;
    }
    .hp {
      color: crimson;
      font-size: 20px;
      text-align: right;
      img {
        width: 2vh;
      }
    }
  }
  .pokemoncard {
    position: fixed;
    display: flex;
    justify-content: center;
    height: 540px;
    width: 350px;
    backface-visibility: hidden;
    transform: rotateY(180deg);
  }
}
.container:hover{
    transform: rotateY(180deg);
  }
}
.headshot {
  display: flex;
  justify-content: center;
  img {
      width: 18em;
      border: 5px yellow outset;
      box-shadow: 3px 3px 10px #000;  
  }
}
.stats {
  margin-left: 0.5vw;
  margin-right: 0.5vw;
    hr {
      border: 0;
      border-top: 2px solid black;
      margin: 0;
    }
    p {
      margin-bottom: 0;
    }
  }
.pokemontype {
width: 310px;
height: 500px;
padding: 10px;
border: 10px solid gold;
border-radius: 20px;
position: absolute;
backface-visibility: hidden;
}
div.water {background: linear-gradient(to bottom right, #d9e4ec,#adc1d1,#7d99af,#557792,#7d99af,#adc1d1);}
div.electric {background: linear-gradient(to bottom right, #ffffa4,#fff870,#fff200,#fff870,#ffffa4,#fff870);}
div.fire {background: linear-gradient(to bottom right, #ffbfba,#ff978f,#ff756b,#ff594c,#ff756b,#ff978f);}
div.grass {background: linear-gradient(to bottom right, #aae5b7,#78cf8b,#4fb665,#319d49,#4fb665,#78cf8b);}
div.normal {background: linear-gradient(to bottom right, #cfcfb0,#c4c4a1,#adac82,#a8a77a,#adac82,#c4c4a1);}
div.ice {background: linear-gradient(to bottom right, #cef2f0,#aee6e4,#9edbd9,#96D9D6,#9edbd9,#aee6e4);}
div.fighting {background: linear-gradient(to bottom right, #f78a86,#e86b66,#e05651,#d4433d,#e05651,#e86b66);}
div.poison {background: linear-gradient(to bottom right, #e0a0f2,#cc84e0,#b469c9,#9d50b3,#b469c9,#cc84e0);}
div.ground{background: linear-gradient(to bottom right, #ffe8ad,#f5d890,#ebcb7a,#E2BF65,#ebcb7a,#f5d890);} 
div.flying {background: linear-gradient(to bottom right, #d4d2fa,#bdb9fa,#a9a4f5,#968ff3,#a9a4f5,#bdb9fa);}
div.psychic {background: linear-gradient(to bottom right, #fab6ca,#f79cb7,#f27c9f,#f06992,#f27c9f,#f79cb7);}
div.bug {background: linear-gradient(to bottom right, #eff7b2,#d7e384,#c3d160,#aebd44,#c3d160,#d7e384);}
div.rock {background: linear-gradient(to bottom right, #f7f0cd,#e3d9a8,#ccc085,#b8ab6a,#ccc085,#e3d9a8);}
div.ghost {background: linear-gradient(to bottom right, #c9c3eb,#a199cc,#7e74b3,#615797,#7e74b3,#a199cc);}
div.dragon {background: linear-gradient(to bottom right, #b6b1fc,#9a92fc,#8077fc,#695eff,#8077fc,#9a92fc);}
div.dark {background: linear-gradient(to bottom right, #d4c9c3,#b8a89e,#998579,#80695b,#998579,#b8a89e);}
div.steel {background: linear-gradient(to bottom right, #f0f0f0,#dfdfe8,#c8c8db,#ababc7,#c8c8db,#dfdfe8);}
div.fairy {background: linear-gradient(to bottom right, #f5dae7,#ebc3d7,#dea6c2,#d18eaf,#dea6c2,#ebc3d7);}

@media (max-height: 760px) {
  .container {
    margin-top: 4vh !important;
  }
}
@media (max-width:380px) {
  .pokemontype {
    padding: 5px;
    height: 480px;
    width: 260px;
    margin: auto;
  }

  .headshot img {
    width: 15em;
  }
  .pokemoncard {
    padding: 5px;
    height: 510px !important;
    width: 290px !important;
  }
}
</style>