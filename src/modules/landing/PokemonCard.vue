<template>
  <div class="card">
    <h2 class="text-xl font-bold mb-2">
      {{ pokemon.name | capitalize }} <span class="font-normal">#{{ pokemon.id }}</span>
    </h2>
    <img
      :src="pokemon.sprites.front_default"
      alt="Imagen de {{ pokemon.name }}"
      class="card-img mb-2"
    />
    <p><strong>Peso:</strong> {{ pokemon.weight }} kg</p>
    <p><strong>Altura:</strong> {{ pokemon.height }} m</p>
    <p>
      <strong>Vida (HP):</strong>
      {{ pokemon.stats.find((stat) => stat.stat.name === 'hp').base_stat }}
    </p>
    <p><strong>Experiencia Base:</strong> {{ pokemon.base_experience }}</p>
    <p><strong>Tipo:</strong> {{ getTypePower(pokemon.types) }}</p>
    <p><strong>Descripción:</strong> {{ pokemon.flavor_text_entries[0].flavor_text }}</p>

    <h3 class="font-bold">Estadísticas:</h3>
    <ul>
      <li v-for="stat in pokemon.stats" :key="stat.stat.name">
        <strong>{{ getStatName(stat.stat.name) }}:</strong> {{ stat.base_stat }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['pokemon'],
  methods: {
    getTypePower(types) {
      return types.map((type) => type.type.name).join(', ');
    },
    getStatName(statName) {
      const statNames = {
        hp: 'Vida (HP)',
        attack: 'Ataque',
        defense: 'Defensa',
        'special-attack': 'Ataque Especial',
        'special-defense': 'Defensa Especial',
        speed: 'Velocidad'
        // Agrega más estadísticas si es necesario
      };
      return statNames[statName] || statName.charAt(0).toUpperCase() + statName.slice(1);
    }
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style scoped>
.card {
  background: #f8f9fa;
  border: 2px solid #007bff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  border-color: #ffcc00; /* Color del borde al pasar el mouse */
  box-shadow: 0 4px 20px rgba(255, 204, 0, 0.5); /* Sombra más intensa */
}

.card-img {
  width: 200px; /* Tamaño de la imagen */
  height: auto;
}
</style>
