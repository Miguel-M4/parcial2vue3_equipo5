import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

// Función para obtener la lista de Pokémon
export async function getPokemonList() {
  try {
    const response = await axios.get(`${API_URL}?limit=151`);
    return response.data.results; // Devuelve solo los nombres de los Pokémon
  } catch (error) {
    console.error("Error al obtener la lista de Pokémon:", error);
    throw error; // Vuelve a lanzar el error para que pueda ser manejado en el componente
  }
}

// Función para obtener datos de un Pokémon específico por nombre
export async function getPokemon(name) {
  try {
    const response = await axios.get(`${API_URL}${name}`);
    const speciesResponse = await axios.get(response.data.species.url); // Obtiene la especie para acceder a la descripción
    response.data.flavor_text_entries = speciesResponse.data.flavor_text_entries; // Añade la descripción
    return response.data; // Devuelve todos los datos del Pokémon
  } catch (error) {
    console.error(`Error al obtener datos de ${name}:`, error);
    throw error; // Vuelve a lanzar el error para que pueda ser manejado en el componente
  }
}
