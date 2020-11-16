<template>
<!--Cria uma div-->
  <div id="app">
    <!--Cria uma div centralizada-->
      <div class="ui center aligned container">
        <!--Cria uma div preta como um menu--> 
        <div class="ui large primary inverted pointing menu compact">
          <!--Cria um botão que chama a rota /tasks-->
          <router-link to="/tasks" exact class="item">
          <!--Cria um icone ao lado do texto-->
           <i class="tasks icon"></i> Lista de Funcionários
          </router-link>
          <!--Cria um botão que chama a rota /tasks/new-->
          <router-link to="/tasks/new" class="item">
            <!--Cria um icone ao lado do texto-->
            <i class="plus circle icon"></i> Adicionar Funcionário
          </router-link>
        </div>
    </div>
    <!--Cria uma div centralizada com o seguinte texto-->
    <div class="ui center aligned container">
    <!--Cria um texto-->
    <h1>Edite as informações do funcionário</h1>
    </div>
    <!--Cria o formulario importando o metodo createOrUpdate-->
    <task-form @createOrUpdate="createOrUpdate" :task=this.task></task-form>
  </div>
</template>

<script>
// Importa o componente Taskform
import Taskform from '../components/Taskform.vue';
// Importa os métodos que fazem a chamada pelo axios do backend
import { api } from '../helpers/Helpers';
// Exporta o componente Taskform para ser exibido
export default {
  name: 'edit',
  components: {
    'task-form': Taskform
  },
  // Cria um array com as tasks
  data: function() {
    return {
      task: {}
    };
  },
  // Cria o método chamado no formulário createOrUpdate 
  methods: {
    createOrUpdate: async function(task) {
      // Executa o método updatetask da api
      await api.updatetask(task);
      // Executa um alerta
      this.flash('Informações atualizadas com sucesso!', 'success');
      // Chama a rota /tasks/id
      this.$router.push(`/tasks/${task._id}`);
    }
  },
  // Executa sempre que o componente é montado
  async mounted() {
    // Executa o método gettask da api
    this.task = await api.gettask(this.$route.params.id);
  }
};
</script>