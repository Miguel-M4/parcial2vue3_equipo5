<template>
  <div class="flex flex-col h-screen bg-gradient-to-b from-blue-100 to-white">
    <header
      v-if="isLoggedIn"
      class="flex items-center h-14 px-4 border-b border-gray-300 sm:h-16 md:px-6 lg:px-8 bg-white shadow-md"
    >
      <div class="flex items-center justify-between w-full">
        <a class="flex items-center gap-2 font-semibold" href="/">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />
          <span class="text-xl font-bold text-blue-600">Pokémon App</span>
        </a>
        <!-- Botón de Menú Hamburguesa -->
        <button
          @click="toggleMenu"
          class="block text-gray-600 sm:hidden focus:outline-none"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <!-- Navegación -->
        <nav
          :class="{
            'absolute top-14 left-0 w-full bg-white shadow-lg sm:static sm:bg-transparent sm:shadow-none': isMenuOpen,
            'hidden sm:flex': !isMenuOpen,
          }"
          class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 py-4 sm:py-0 px-6 sm:px-0"
        >
          <RouterLink
            to="/"
            class="text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg px-3 py-2 transition duration-200 hover:bg-gradient-to-l w-full sm:w-auto text-center"
            @click="closeMenu"
            >Principal</RouterLink
          >
          <RouterLink
            :to="{ name: 'PokemonComparison' }"
            class="text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg px-3 py-2 transition duration-200 hover:bg-gradient-to-l w-full sm:w-auto text-center"
            @click="closeMenu"
            >Comparar Pokémon</RouterLink
          >
          <RouterLink
            :to="{ name: 'BattleLog' }"
            class="text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg px-3 py-2 transition duration-200 hover:bg-gradient-to-l w-full sm:w-auto text-center"
            @click="closeMenu"
            >BattleLog</RouterLink
          >
          <RouterLink
            :to="{ name: 'contacto' }"
            class="text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg px-3 py-2 transition duration-200 hover:bg-gradient-to-l w-full sm:w-auto text-center"
            @click="closeMenu"
            >Contacto</RouterLink
          >
          <button
            @click="() => { logout(); closeMenu(); }"
            class="bg-red-600 text-white rounded-lg px-4 py-2 transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full sm:w-auto text-center"
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
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
    const isMenuOpen = ref(false); // Estado para el menú móvil

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

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value; // Alterna el estado del menú
    };

    const closeMenu = () => {
      isMenuOpen.value = false; // Cierra el menú
    };

    return { isLoggedIn, handleLoginSuccess, logout, isMenuOpen, toggleMenu, closeMenu };
  }
};
</script>

<style scoped>
.logo {
  width: 40px;
  height: 40px;
}
</style>
