<template>
  <div class="flex flex-col h-screen bg-gradient-to-b from-blue-100 to-white">
    <header
      v-if="isLoggedIn"
      class="flex items-center h-14 px-4 border-b border-gray-300 sm:h-16 md:px-6 lg:px-8 bg-white shadow-md"
    >
      <div>
        <a class="flex items-center gap-2 font-semibold" href="/">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />
          <span class="text-xl font-bold text-blue-600">Pokémon App</span>
        </a>
      </div>
      <nav class="ml-auto flex items-center h-10 space-x-4 sm:space-x-6">
        <RouterLink
          to="/"
          class="text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg px-3 py-1 transition duration-200 hover:bg-gradient-to-l"
          >Principal</RouterLink
        >
        <RouterLink
          :to="{ name: 'PokemonComparison' }"
          class="text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg px-3 py-1 transition duration-200 hover:bg-gradient-to-l"
          >Comparar Pokémon</RouterLink
        >
        <RouterLink
          :to="{ name: 'BattleLog' }"
          class="text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg px-3 py-1 transition duration-200 hover:bg-gradient-to-l"
          >BattleLog</RouterLink
        >
        <RouterLink
          :to="{ name: 'contacto' }"
          class="text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg px-3 py-1 transition duration-200 hover:bg-gradient-to-l"
          >Contacto</RouterLink
        >
        <button
          @click="logout"
          class="bg-red-600 text-white rounded-lg px-4 py-2 transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>

    <main class="flex-1 flex items-center justify-center py-6">
      <RouterView v-if="isLoggedIn" />
      <LoginPage v-else @login-success="handleLoginSuccess" />
    </main>

    <footer
      v-if="isLoggedIn"
      class="flex items-center h-14 px-4 border-t border-gray-300 sm:h-16 md:px-6 lg:px-8 bg-white shadow-md"
    >
      <p class="flex-1 text-sm text-gray-500 text-center">
        © {{ new Date().getFullYear() }} 20xx Acme Corporation. Derechos reservados
      </p>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import LoginPage from '@/modules/landing/LoginPage.vue';

export default {
  components: {
    LoginPage
  },
  setup() {
    const isLoggedIn = ref(false);

    // Verifica el estado de autenticación al cargar el componente
    onMounted(() => {
      const loggedIn = localStorage.getItem('isLoggedIn');
      isLoggedIn.value = loggedIn === 'true';
    });

    const handleLoginSuccess = () => {
      isLoggedIn.value = true; // Actualiza el estado de autenticación
      localStorage.setItem('isLoggedIn', 'true'); // Almacena el estado en localStorage
    };

    const logout = () => {
      isLoggedIn.value = false; // Actualiza el estado para cerrar sesión
      localStorage.setItem('isLoggedIn', 'false'); // Elimina el estado en localStorage
    };

    return { isLoggedIn, handleLoginSuccess, logout };
  }
};
</script>
