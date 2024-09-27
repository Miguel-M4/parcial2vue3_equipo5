<template>
  <div
    class="pokemon-comparison max-w-4xl mx-auto p-4 bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-md"
  >
    <h1 class="text-3xl font-bold mb-4 text-center text-blue-800">Comparación de Pokémon</h1>

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
      </div>
    </div>

    <div
      v-if="pokemon1 && pokemon2"
      class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
    >
      <Card :pokemon="pokemon1" />
      <Card :pokemon="pokemon2" />
    </div>
  </div>
</template>

<script>
import { getPokemonList, getPokemon } from '../../services/pokemonService';
import Card from './PokemonCard.vue';

export default {
  components: { Card },
  data() {
    return {
      pokemons: [],
      selectedPokemon1: '',
      selectedPokemon2: '',
      pokemon1: null,
      pokemon2: null
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
    }
  }
};
</script>

<style scoped>
.pokemon-comparison {
  background: #f8f9fa;
}

.card {
  flex: 1;
}
</style>
