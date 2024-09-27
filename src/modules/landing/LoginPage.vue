<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 to-blue-500">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-3xl font-bold text-center text-blue-600">PokeComparer</h1>
  
        <div v-if="!showRegister">
          <h2 class="text-xl mt-4 text-center">Iniciar Sesión</h2>
          <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Correo Electrónico" required class="mt-4 w-full p-2 border border-blue-400 rounded" />
            <input v-model="password" type="password" placeholder="Contraseña" required class="mt-4 w-full p-2 border border-blue-400 rounded" />
            <button type="submit" class="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Entrar</button>
          </form>
          <p class="text-center mt-4">¿No tienes cuenta? <button @click="toggleForm" class="text-blue-600 hover:underline">Regístrate</button></p>
        </div>
  
        <div v-else>
          <h2 class="text-xl mt-4 text-center">Registro</h2>
          <form @submit.prevent="register">
            <input v-model="registerEmail" type="email" placeholder="Correo Electrónico" required class="mt-4 w-full p-2 border border-blue-400 rounded" />
            <input v-model="registerPassword" type="password" placeholder="Contraseña" required class="mt-4 w-full p-2 border border-blue-400 rounded" />
            <button type="submit" class="mt-4 w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">Registrar</button>
          </form>
          <p class="text-center mt-4">¿Ya tienes cuenta? <button @click="toggleForm" class="text-blue-600 hover:underline">Iniciar Sesión</button></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        registerEmail: '',
        registerPassword: '',
        showRegister: false,
      };
    },
    methods: {
      toggleForm() {
        this.showRegister = !this.showRegister;
      },
      login() {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        console.log('Usuarios registrados:', users);
  
        if (this.email in users) {
          console.log(`Intentando iniciar sesión con: ${this.email}`);
          if (users[this.email] === this.password) {
            console.log('Inicio de sesión exitoso');
            this.$emit('login-success'); // Emitir evento de éxito
            this.$router.push('/'); // Redirigir a la página principal
          } else {
            console.log('Contraseña incorrecta');
            alert('Credenciales incorrectas. Por favor intenta nuevamente.');
          }
        } else {
          console.log('Usuario no encontrado');
          alert('Credenciales incorrectas. Por favor intenta nuevamente.');
        }
      },
      register() {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (this.registerEmail && this.registerPassword) {
          if (this.registerEmail in users) {
            alert('El usuario ya está registrado.');
          } else {
            users[this.registerEmail] = this.registerPassword;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registro exitoso. Puedes iniciar sesión ahora.');
            this.toggleForm(); // Regresar a la pantalla de login
          }
        } else {
          alert('Por favor completa todos los campos.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Sin estilos adicionales necesarios */
  </style>
  