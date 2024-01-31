<template>
  <div class="background">
    <div class="upper-div">
      <h1 class="title">Who's that</h1>
      <img src="../assets/img/pokemon_logo.svg.png" alt="Pokemon logo" class="pokemon-logo">
    </div>
    <div class="lower-div">
      <button><NuxtLink to="/game" class="start-game">Start</NuxtLink></button>
      <div class="select-div">
        <h2 class="switch-h2">Switch theme</h2>
        <select v-model="$colorMode.preference" name="select-mode" class="select-mode">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
const colorMode = useColorMode();
</script>

<style lang="scss">
  $primary-color: #3b4cca;
  $secondary-color:   #fdea9e;
  $tertiary-color: #363b81;
  .background {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .upper-div,
  .lower-div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    font-size: 44px;
    color: $primary-color;
    margin-bottom: 0;
    margin-top: 6vh;
  }
  .dark-mode .title {
    color: #fbd743;
  }
  .lower-div {
    button {
    background-color: #fbeee0;
    border: 2px solid $primary-color;
    border-radius: 30px;
    box-shadow: black 4px 4px 0 0;
    color: black;
    cursor: pointer;
    font-weight: 600;
    font-size: 40px;
    padding: 2vh;
    margin-top: 10vh;
    color: black;
    -webkit-animation: mover 1s infinite  alternate;
    animation: mover 2s infinite  alternate;
  }
  button:hover {
    background-color: #fff;
  }
}
.dark-mode .lower-div{
  button {
    background-color: $tertiary-color;
    border: 2px solid black;
  }
}
  .start-game {
    text-decoration: none;
    color: $primary-color;
  }
  .dark-mode .start-game {
    color: #fbd743;
  }
  .pokemon-logo {
    width: 28em;
  }
.select-div{
  display: flex;
  flex-direction: column;
  margin-top: 2vh;
  h2 {
    color: $primary-color;
  }
  select {
    border-radius: 30px;
    box-shadow: black 3px 3px 0 0;
    font-size: 2vh;
  }
}
.dark-mode .select-div h2 {
  color: #fbd743;
}
  @media (max-width: 650px) {
    .pokemon-logo {
      width: 75%;
    }
    .start-game {
      margin-top: 17vh;
    }
    .lower-div {
      button {
        font-size: 7vw;
      }
    }
  }
  @media (max-width: 480px) {
    .title {
      font-size: 9vw;
    }
    .pokemon-logo {
      width: 80%;
    }
    .start-game {
      margin-top: 17vh;
    }
  }
  @media (min-width: 1600px) and (min-height: 850px) {
    .title {
      font-size: 3vw;
    }
    .pokemon-logo {
      width: 35vw;
    }
    .start-game {
      margin-top: 17vh;
      font-size: 50px;
    }
  }
  @keyframes mover {
    0% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0); }
  }
</style>