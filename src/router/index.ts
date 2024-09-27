import { createRouter, createWebHistory } from 'vue-router';

import PrincipalPagina from '@/modules/landing/PrincipalPagina.vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PrincipalPagina',
      component: PrincipalPagina
    },
    {
      path: '/PokemonComparison',
      name: 'PokemonComparison',
      component: () => import('@/modules/landing/PokemonComparison.vue')
    },
    /**{
      path: '/PokemonQuiz',
      name: 'PokemonQuiz',
      component: () => import('@/modules/landing/PokemonQuiz.vue')
    },**/
    {
      path: '/battle-log',
      name: 'BattleLog',
      component: () => import('@/modules/landing/BattleLog.vue')
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: () => import('@/modules/landing/contacto.vue')
    }
  ]
});

export default router;
