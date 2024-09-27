<template>
  <div class="game-container">
    <h1 class="text-2xl font-bold mb-4 text-center text-white">¿Quién es ese Pokémon?</h1>

    <div class="pokemon-silhouette">
      <!-- Mostrar la silueta del Pokémon -->
      <img
        v-if="!isGameOver"
        :src="currentPokemon ? currentPokemon.sprites.front_default : ''"
        alt="Pokémon"
        class="silhouette-img"
      />
    </div>

    <div class="options-container mt-4">
      <button
        v-for="(option, index) in options"
        :key="index"
        @click="checkGuess(option)"
        class="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2 w-full md:w-auto mx-2"
        :disabled="isGameOver"
      >
        {{ option }}
      </button>
    </div>

    <p class="mt-4 text-white" v-if="feedback">{{ feedback }}</p>
    <p class="mt-2 text-white font-bold" v-if="!isGameOver">Puntuación: {{ score }}</p>

    <div v-if="isGameOver" class="game-over-container">
      <h2 class="text-red-500 text-4xl font-bold mt-6">Game Over</h2>
      <button @click="startNewGame" class="bg-green-500 text-white rounded-lg px-4 py-2 mt-4">
        Jugar de nuevo
      </button>
    </div>
  </div>
</template>

<script>
import { getPokemonList, getPokemon } from '../../services/pokemonService';

export default {
  data() {
    return {
      pokemons: [], // Lista de Pokémon obtenidos de la API
      currentPokemon: null, // Pokémon actual a adivinar
      options: [], // Opciones de nombres de Pokémon
      score: 0, // Puntuación del jugador
      feedback: '', // Retroalimentación después de adivinar
      isGameOver: false // Indica si el juego ha terminado
    };
  },
  async mounted() {
    this.pokemons = await getPokemonList();
    this.startNewGame();
  },
  methods: {
    startNewGame() {
      this.isGameOver = false;
      this.score = 0;
      this.nextRound();
    },
    async nextRound() {
      const randomIndex = Math.floor(Math.random() * this.pokemons.length);
      const randomPokemonName = this.pokemons[randomIndex].name;
      this.currentPokemon = await getPokemon(randomPokemonName);

      // Generar tres opciones, incluyendo el Pokémon correcto
      this.generateOptions(randomPokemonName);
      this.feedback = '';
    },
    generateOptions(correctName) {
      const optionsSet = new Set();
      optionsSet.add(correctName); // Añadir la respuesta correcta

      while (optionsSet.size < 3) {
        const randomOption = this.pokemons[Math.floor(Math.random() * this.pokemons.length)].name;
        optionsSet.add(randomOption); // Añadir opciones incorrectas
      }

      this.options = Array.from(optionsSet).sort(() => Math.random() - 0.5); // Ordenar aleatoriamente
    },
    checkGuess(selectedOption) {
      if (selectedOption === this.currentPokemon.name) {
        this.feedback = '¡Correcto!';
        this.score++;
        this.nextRound();
      } else {
        this.feedback = `Incorrecto. Era ${this.currentPokemon.name}.`;
        this.isGameOver = true;
      }
    }
  }
};
</script>

<style scoped>
.game-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  text-align: center;
  background: #72c1ee; /* Fondo oscuro */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.pokemon-silhouette {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.silhouette-img {
  width: 250px; /* Ajustar el tamaño de la imagen */
  height: 250px;
  object-fit: cover;
  filter: brightness(0) invert(1); /* Silueta en blanco y negro */
}

.options-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

button {
  margin: 8px;
}

.game-over-container {
  text-align: center;
}
</style>
