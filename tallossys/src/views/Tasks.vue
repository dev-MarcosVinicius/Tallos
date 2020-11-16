<template>
  <div id="app">
     <!--Cria uma div centralizada-->
      <div class="ui center aligned container">
        <!--Cria uma div preta dividida em forma de menu--> 
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

    <!--Cria uma div centralizada-->
    <div class="ui center aligned container">
    <!--Cria um texto no centro da div-->
    <h1>Tallos System</h1>
    </div>

    <!--Cria uma tabela dividida com uma linha cinza-->
    <table id="tasks" class="ui celled compact table">
      <!--Cria uma linha da tabela mais escura para ser um cabeçalho-->
      <thead>
        <tr>
          <!--Cria a primeira coluna adicionando um icone e centralizando o texto-->
         <th class="center aligned">  <i class="tasks icon"></i>Lista de Funcionários</th>
         <!--Cria a segunda coluna adicionando um icone e centralizando o texto-->
          <th class="center aligned"> <i class="info circle icon"></i>Cargo</th>
                   <!--Cria a terceira coluna adicionando um icone-->
                   <th class="center aligned"> <i class="edit icon"></i></th>
                   <!--Cria a quarta coluna adicionando um icone-->
                    <th class="center aligned"> <i class="trash icon"></i></th>
        </tr>
      </thead>

      <!--Cria a segunda linha com uma renderização condicional-->
      <tr v-for="(task, i) in tasks" :key="i">
        <!--Cria a primeira coluna com o nome do funcionário-->
        <td class="center aligned">{{ task.task1 }}</td>
        <!--Cria a segunda coluna com o nome do cargo do funcionário-->
        <td class="center aligned">{{ task.task2 }}</td>
        <!--Cria a terceira coluna-->
        <td width="75" class="center aligned">
          <!--Cria o botão de editar na terceira coluna-->
          <router-link :to="{ name: 'edit', params: { id: task._id }}">Editar</router-link>
        </td>
        <!--Cria a quarta coluna-->
        <td width="75" class="center aligned" @click.prevent="onDestroy(task._id)">
          <!--Cria o botão de excluir na quarta coluna-->
          <a :href="`/tasks/${task._id}`">Exluir</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// Importa a chamada do axios para rodar a API
import { api } from '../helpers/Helpers';

// Exporta com o nome tasks o componente para ser chamado por outro componente
export default {
  name: 'tasks',
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    // Cria a função que é chamada na botão da quarta coluna para excluir um funcionário
    async onDestroy(id) {
      // Abre uma janela que pede uma confirmação e armazena o valor da resposta em sure
      const sure = window.confirm('Você tem certeza que quer demitir?');
      // Testa para ver se sure está nulo (se foi cancelado) e não retorna nada
      if (!sure) return;
      /* Se o sure retornar algum valor ele executa deletetask dentro de Helpers que está
         sendo importado como api, passando o if da task */
      await api.deletetask(id);
      // Exibe um alerta confirmando a exclusão
      this.flash('Funcionário demitido com sucesso!', 'success');
      // Atualiza as tasks fazendo um filter do id da task
      const newtasks = this.tasks.filter(task => task._id !== id);
      this.tasks = newtasks;
    }
  },
  // Executa sempre que o componente é montado
  async mounted() {
    /* Adiciona no arrays tasks tudo que é recebido ao chamar o método gettasks
       dentro de Helpers que está importado como api*/
    this.tasks = await api.gettasks();
  }
};
</script>