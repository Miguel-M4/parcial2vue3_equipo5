<template>
  <section class="text-gray-600 body-font relative">
    <div class="absolute inset-0 bg-gray-300">
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title="map"
        scrolling="no"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4866.078588848081!2d-89.19659947400831!3d13.675395086708617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f633119531510c3%3A0xe86e9ca19c647e6b!2sUniversidad%20Luterana%2C%20San%20Salvador!5e1!3m2!1ses!2ssv!4v1726722724626!5m2!1ses!2ssv"
        style="border: 0"
      ></iframe>
    </div>
    <div class="container px-5 py-24 mx-auto flex justify-center items-center relative z-10">
      <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col mt-10 md:mt-0 shadow-md">
        <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
        <p class="leading-relaxed mb-5 text-gray-600">Deja tu mensaje y lo recibiré por correo.</p>
        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class="relative mb-4">
          <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
          <textarea
            v-model="message"
            id="message"
            name="message"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
        <button
          @click="sendEmail"
          class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Enviar
        </button>
        <p class="text-xs text-gray-500 mt-3">Recibiré tu mensaje en mi correo electrónico.</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      message: ''
    };
  },
  methods: {
    async sendEmail() {
      try {
        await axios.post('http://localhost:3000/send-email', {
          email: this.email,
          message: this.message
        });
        alert('Correo enviado correctamente. Te hemos enviado un mensaje de agradecimiento.');
      } catch (error) {
        alert('Error al enviar correo');
        console.error(error);
      }
    }
  }
};
</script>

<style>
.absolute {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
