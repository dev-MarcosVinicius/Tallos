// Importa o vue para ser usado na linha 15
import Vue from 'vue';

// Importa o vue-router, onde são usados para criar as rotas
import Router from 'vue-router';

// Importa os componentes que serão renderizados ao acessar as rotas
import Tasks from './views/Tasks.vue';
import New from './views/New.vue';
import Edit from './views/Edit.vue';
import Login from './views/Loginview.vue';
import Register from './views/Registerview.vue';

// Chamada use para criar as rotas com o vue-router 
Vue.use(Router);

// Array criado com todas as rotas e os componentes que serão renderizados
const routes = [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/tasks/new',
      name: 'new-task',
      component: New
    },
    {
      path: '/tasks/:id/edit',
      name: 'edit',
      component: Edit
    },   
    {
      path: '/login',
      name: 'login',
      component: Login
    },  
    {
      path: '/register',
      name: 'register',
      component: Register
    },  
  ]

 // Cria e define as rotas usando o vue-router
  const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes
  });

  // Exporta as rotas para serem chamadas
  export default router;