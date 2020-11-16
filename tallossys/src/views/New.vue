<template>
<!--Cria uma div-->
  <div>
    <!--Cria uma outra div centralizada-->
      <div class="ui center aligned container">
        <!--Cria uma div em um formato de menu--> 
        <div class="ui large primary inverted pointing menu compact">
          <!--Cria um botão que faz a chamada do 
              componente tasks definido nas rotas-->
          <router-link to="/tasks" exact class="item">
          <!--Adiciona um ícone ao lado do texto-->
           <i class="tasks icon"></i> Lista de Funcionários
          </router-link>
          <!--Cria um botão que faz a chamada do
              componente new definido nas rotas-->
          <router-link to="/tasks/new" class="item">
          <!--Adiciona um ícone ao lado do textoi-->
            <i class="plus circle icon"></i> Adicionar Funcionário
          </router-link>
        </div>
    </div>

    <!--Cria uma div centralizada-->
    <div class="ui center aligned container">
    <!--Adiciona o text à div-->
    <h1>Adicione um novo funcionário</h1>
    </div>
    <!--Faz a chamada do método createOrUpdate-->
    <task-form @createOrUpdate="createOrUpdate"></task-form>
  </div>
</template>

<script>
// Importa o componente taskForm para ser exibido
import taskForm from '../components/Taskform.vue';
// Importa as funçoes de chamadas do axios de Helpers
import { api } from '../helpers/Helpers';
// Exporta como new-task para chamadas
export default {
  name: 'new-task',
  components: {
    'task-form': taskForm
  },
  methods: {
    // Cria o metodo para Adicionar um novo funcionário
    createOrUpdate: async function(task) {
      // Armazena o valor que retorna do método createtask
      const res = await api.createtask(task);
      // Mostra uma janela que cria um novo funcionário
      this.flash('task created', 'success');
      // Faz a chamada de dentro do router usando axios
      this.$router.push(`/tasks/${res._id}`);
    }
  }
};
</script>