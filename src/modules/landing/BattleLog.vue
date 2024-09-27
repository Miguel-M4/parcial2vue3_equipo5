<template>
  <div
    class="battle-log max-w-4xl mx-auto p-4 bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-md"
  >
    <h2 class="text-3xl font-bold mb-4 text-center text-blue-800">Registro de Batallas</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label for="pokemon1" class="block font-bold">Selecciona el primer Pokémon:</label>
        <select
          v-model="selectedPokemon1"
          @change="fetchPokemon(1)"
          id="pokemon1"
          class="border rounded px-2 py-1 w-full"
        >
          <option v-for="pokemon in pokemons" :key="pokemon.name" :value="pokemon.name">
            {{ pokemon.name }}
          </option>
        </select>
        <img
          v-if="pokemon1"
          :src="pokemon1.sprites.front_default"
          alt="Pokemon 1"
          class="w-32 h-32 object-cover mt-2"
        />
      </div>

      <div>
        <label for="pokemon2" class="block font-bold">Selecciona el segundo Pokémon:</label>
        <select
          v-model="selectedPokemon2"
          @change="fetchPokemon(2)"
          id="pokemon2"
          class="border rounded px-2 py-1 w-full"
        >
          <option v-for="pokemon in pokemons" :key="pokemon.name" :value="pokemon.name">
            {{ pokemon.name }}
          </option>
        </select>
        <img
          v-if="pokemon2"
          :src="pokemon2.sprites.front_default"
          alt="Pokemon 2"
          class="w-32 h-32 object-cover mt-2"
        />
      </div>
    </div>

    <div class="mt-6">
      <button
        @click="simulateBattle"
        class="bg-green-500 text-white rounded-lg px-4 py-2 w-full md:w-auto"
        :disabled="!pokemon1 || !pokemon2"
      >
        Simular Batalla
      </button>
    </div>

    <div v-if="battleDescription" class="mt-6 border-t pt-4">
      <h3 class="text-lg font-bold">Descripción de la Batalla:</h3>
      <p>{{ battleDescription }}</p>
      <p><strong>Ganador:</strong> {{ winner }}</p>
    </div>
  </div>
</template>

<script>
import { getPokemonList, getPokemon } from '../../services/pokemonService';

export default {
  data() {
    return {
      pokemons: [],
      selectedPokemon1: '',
      selectedPokemon2: '',
      pokemon1: null,
      pokemon2: null,
      battleDescription: '',
      winner: ''
    };
  },
  async mounted() {
    this.pokemons = await getPokemonList();
  },
  methods: {
    async fetchPokemon(pokemonNumber) {
      const selectedPokemon = pokemonNumber === 1 ? this.selectedPokemon1 : this.selectedPokemon2;
      const pokemon = await getPokemon(selectedPokemon);
      pokemon.flavor_text_entries = pokemon.flavor_text_entries.filter(
        (entry) => entry.language.name === 'es'
      );

      if (pokemonNumber === 1) {
        this.pokemon1 = pokemon;
      } else {
        this.pokemon2 = pokemon;
      }
    },
    simulateBattle() {
      if (!this.pokemon1 || !this.pokemon2) return;

      const health1 = this.pokemon1.stats.find((stat) => stat.stat.name === 'hp').base_stat;
      const attack1 = this.pokemon1.stats.find((stat) => stat.stat.name === 'attack').base_stat;
      const defense1 = this.pokemon1.stats.find((stat) => stat.stat.name === 'defense').base_stat;

      const health2 = this.pokemon2.stats.find((stat) => stat.stat.name === 'hp').base_stat;
      const attack2 = this.pokemon2.stats.find((stat) => stat.stat.name === 'attack').base_stat;
      const defense2 = this.pokemon2.stats.find((stat) => stat.stat.name === 'defense').base_stat;

      let myHealth = health1;
      let opponentHealth = health2;
      let turn = 0; // 0 para pokemon1, 1 para pokemon2
      const maxTurns = 100; // Limitar el número de turnos
      let battleDescription = '';
      let winner = '';

      for (let i = 0; i < maxTurns && myHealth > 0 && opponentHealth > 0; i++) {
        let damage;
        if (turn === 0) {
          damage = Math.max(0, attack1 - defense2);
          opponentHealth -= damage;
          const move1 =
            this.pokemon1.moves[Math.floor(Math.random() * this.pokemon1.moves.length)].move.name;
          battleDescription += `${this.pokemon1.name} usa ${move1} y ataca a ${this.pokemon2.name} causando ${damage} de daño. `;
          turn = 1;
        } else {
          damage = Math.max(0, attack2 - defense1);
          myHealth -= damage;
          const move2 =
            this.pokemon2.moves[Math.floor(Math.random() * this.pokemon2.moves.length)].move.name;
          battleDescription += `${this.pokemon2.name} usa ${move2} y ataca a ${this.pokemon1.name} causando ${damage} de daño. `;
          turn = 0;
        }
      }

      if (myHealth > 0 && opponentHealth <= 0) {
        winner = this.pokemon1.name;
      } else if (opponentHealth > 0 && myHealth <= 0) {
        winner = this.pokemon2.name;
      } else {
        winner = 'Empate';
      }

      this.battleDescription = battleDescription;
      this.winner = winner;
    }
  }
};
</script>

<style scoped>
.battle-log {
  background: #f8f9fa;
}
</style>
