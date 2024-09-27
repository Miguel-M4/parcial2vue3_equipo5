<template>
  <div class="container">
    <h1 class="text-5xl font-bold mb-4 text-blue-800">Lista de Pokémon</h1>

    <div class="filter">
      <label for="typeFilter" class="mr-2">Filtrar por tipo:</label>
      <select id="typeFilter" v-model="selectedType" @change="filterPokemon">
        <option value="">Todos</option>
        <option v-for="type in types" :key="type" :value="type">{{ capitalizeName(type) }}</option>
      </select>
    </div>

    <div class="pokemon-list">
      <div v-for="pokemon in filteredPokemonList" :key="pokemon.id" class="pokemon-item">
        <img :src="getPokemonImage(pokemon.id)" :alt="pokemon.name" class="pokemon-img" />
        <p>{{ capitalizeName(pokemon.name) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getPokemonList } from '@/services/pokemonService';
import axios from 'axios'; // Asegúrate de importar axios

export default {
  data() {
    return {
      pokemonList: [],
      filteredPokemonList: [],
      types: [],
      selectedType: ''
    };
  },
  async created() {
    try {
      this.pokemonList = await getPokemonList();
      // Hacer una llamada para obtener los tipos de cada Pokémon
      await this.loadPokemonTypes();
      this.types = await this.getTypes();
    } catch (error) {
      console.error('Error al cargar la lista de Pokémon:', error);
    }
  },
  methods: {
    async getTypes() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type/');
        return response.data.results.map((type) => type.name);
      } catch (error) {
        console.error('Error al obtener tipos de Pokémon:', error);
        return [];
      }
    },
    async loadPokemonTypes() {
      const promises = this.pokemonList.map(async (pokemon) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        pokemon.types = response.data.types.map((type) => type.type.name); // Almacena los tipos del Pokémon
        pokemon.id = response.data.id; // Almacena el ID del Pokémon
      });
      await Promise.all(promises);
      this.filteredPokemonList = this.pokemonList; // Inicializa la lista filtrada
    },
    filterPokemon() {
      if (this.selectedType) {
        this.filteredPokemonList = this.pokemonList.filter(
          (pokemon) => pokemon.types.includes(this.selectedType) // Filtra por tipos
        );
      } else {
        this.filteredPokemonList = this.pokemonList; // Muestra todos si no hay filtro
      }
    },
    getPokemonImage(id) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    },
    capitalizeName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.filter {
  margin-bottom: 20px;
}

.pokemon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.pokemon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
}

.pokemon-item:hover {
  transform: scale(1.05);
}

.pokemon-img {
  width: 100px;
  height: 100px;
}

p {
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}
</style>
