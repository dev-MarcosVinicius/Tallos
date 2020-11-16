<template>
 <!--Cria um form utilizando o método onSubmit-->
 <form action="#" @submit.prevent="onSubmit">
    <!--Cria uma condição para executar um alerta quando algum campo não estiver preenchido-->
    <p v-if="errorsPresent" class="error">Por favor peencha todos os campos!</p>
    <!--Cria uma div importando as configurações de input-->
    <div class="ui labeled input fluid">
      <!--Cria uma div importando as configurações de um label-->
      <div class="ui label">
        <!--Cria um icone ao lado do texto Nome-->
        <i class="tasks icon"></i>Nome
      </div>
      <!--Cria um input de texto que altera o valor do task1(nome do funcionario)-->
      <input type="text" placeholder="Nome do Funcionário." v-model="task.task1" />
    </div>
    <!--Cria uma div importando as configurações de um input-->
    <div class="ui labeled input fluid">
      <!--Cria uma div importando as configurações de um label-->
      <div class="ui label">
    <!--Cria um icone ao lado do texto Cargo-->    
   <i class="info circle icon"></i> Cargo
      </div>
      <!--Cria um input de texto que altera o valor do task2(cargo)-->
      <input type="text" placeholder="Cargo do Funcionário" v-model="task.task2" />
    </div>
    <!--Cria um botão importando as configurações de um botão-->
    <button class="positive ui button">Enviar</button>
  </form>
</template>

<script>
// Exporta as propriedades e os métodos
export default {
  name: 'task-form',
  // Define as propriedades
  props: {
    //Define as propriedades das tasks
    task: {
      type: Object,
      required: false,
      default: () => {
        return {
          task1: '',
          task2: ''
        };
      }
    }
  },
  // Define a variavel que vai fazer a verificação do campo input pra ver se o campo estiver vazio
  data() {
    return {
      errorsPresent: false
    };
  },
  /*
    // Método executado sempre antes de montar o componente
    beforeMount(){
    
    this.$http.get("http://localhost:3000/").then((res)=>{
        if(res.body.section == false){
          console.log("Session not exist "+res.body.section)
        }
        else{
          console.log("Session exist "+res.body.section)
        }
    },(err)=>{
      console.log(err+'deu errado')
    })},*/
  // Define os métodos ultizidados no componente
  methods: {
    // Define o método onSubmit
    onSubmit: function() {
      // Faz a verificação das variaveis dos inputs para ver se não estão vazias
      if (this.task.task1 === '' || this.task.task2 === '') {
        // Se a condição for válida define a variável errorsPresent como true
        this.errorsPresent = true;
      // Condição contraria da verificação das tasks
      } else {
        // Faz a chamada do método createOrUpdate passando como parametros as tasks
        this.$emit('createOrUpdate', this.task);
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>