<template>
<!--Cria uma div importando as configurações de container-->
  <div class="container">
    <!--Cria uma div importando as configurações de row-->
    <div class="row">
      <!--Cria uma div importando as configurações de estilização do semantic-ui-css/semantic.css-->
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <!--Cria uma form importando as configurações de texto centralizado 
            e borda com a cor configurada primary-->
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="registerUser"
        >
        <!--Cria um input de tipo texto importando o modelo register.name-->
          <input
            type="text"
            id="name"
            class="form-control mb-5"
            placeholder="Nome"
            v-model="register.name"
            required
          />
          <!--Cria um input de tipo email importando o modelo register.email-->
          <input
            type="email"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="register.email"
            required
          />
          
          <!--Cria um input de tipo password importando o modelo register.password-->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Senha"
            v-model="register.password"
          />
          <!--Cria um texto a baixo dos inputs para encaminhar
              o usuário para fazer o login caso ele já tenha cadastro-->
          <p>
            Já faz parte da nossa empresa??
            <p>
            <!--Cria uma chamada para a rota / junto com um texto-->
            <router-link to="/">
            Fazer Login!
              </router-link>
            <!--Cria uma div centralizada-->
            <center>
              <!--Cria um botão importando as configurações de cor primary
                  largura do tipo submit-->
              <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                Cadastrar-se
              </button>
            </center>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
// Exporta as variaveis e os métodos
export default {
  // Exporta as variaveis name,email,password,section
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: "",
        section: false
      }
    };
  },
  // Exporta os métodos
  methods: {
    // Cria um método registerUser
    async registerUser() {
      try {
        // Define no response a resposta da chamada post na rota /register
        let response = await this.$http.post("/register", this.register);
        // Define na variavel token o token que é recebido da chamada ao /register 
        let token = response.data.token;
        // Cria uma condição
        if (token) {
          // Armazena a variavel token no localStorage
          localStorage.setItem("jwt", token);
          // Faz uma chamada a rota /
          this.$router.push("/");
          // Emite um alerta 
          this.flash("Sucesso", "Funcionário registrado com sucesso!", "success");
          // Cria uma condição contraria 
        } else {
          // Emite um alerta 
          this.flash("Error", "Algo deu errado!", "error");
        }
      } catch (err) {
        // Define na variavel error o que é recebido do response
        let error = err.response;
        // Cria uma condição para o erro
        if (error.status == 409) {
          // Exibe um alerta com o erro
          this.flash("Error", error.data.message, "error");
        } else {
          // Exibe um alerta com o erro
          this.flash("Error", error.data.err.message, "error");
        }
      }
    }
  }
};
</script>