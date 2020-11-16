import Vue from 'vue'

// Importa o componente app para ser definido com inicial
import App from './App.vue'

// Importa o axios para criar uma baseURL 
import axios from 'axios'

// Importa estilos para serem usados nos componentes
import "bootstrap/dist/css/bootstrap.css";
import 'semantic-ui-css/semantic.css';

// Importa as rotas
import router from './Router'

// Cria uma baseURL para chamar o localhost na porta 3000
const base = axios.create({
  baseURL: "http://localhost:3000"
});

/* Define para o Vue que quando for chamado seu método $http seja
   seja chamado no endereço e porta definidos na variavel base */
Vue.prototype.$http = base;

/* Define as rotas dentro do Vue e define que o primeiro componente
   para ser montado e renderizado seja o App*/
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
  // Método que roda após o login e antes do componente tasks ser exibido
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem("jwt") == null) {
        next({
          path: "/tasks"
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });