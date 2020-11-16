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
          @submit.prevent="loginUser"
        >
        <!--Cria um input de tipo texto importando o modelo login.email-->
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="login.email"
          />
          <!--Cria um input de tipo text importando o modelo login.password-->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Senha"
            v-model="login.password"
          />
          <!--Cria um paragrado-->
          <p>
            Ainda não faz parte da nossa empresa??
            <p>
              <!--Cria uma chamada a rota ao /register-->
              <router-link to="/register">
              Quero me cadastrar!
              </router-link>
          </p>
          <!--Cria uma div centralizada-->
          <center>
            <!--Cria um botão importando as configurações e o tipo submit-->
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Entrar
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // Exporta as variaveis dentro de login, email e password
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  // Exporta os métodos
  methods: {
    // Cria o método loginUser
    async loginUser() {
      // Cria uma condição
      try {
        // Define na variavel response a resposta do post /login
        let response = await this.$http.post("/login", this.login);
        // Define na variavel token o token retornado da resposta do post
        let token = response.data.token;
        // Define no localStorage o token
        localStorage.setItem("jwt", token);
        // Cria uma condição ao receber o token
        if (token) {
          // Cria um alerta ao receber o token
          this.flash("Sucesso", "Login realizado com sucesso!", "success");
          // Cria uma chamada a rota /tasks
          this.$router.push("/tasks");
        }
        // Cria uma captura caso a condição retorne um erro
      } catch (err) {
        // Cria um alerta para exibir o erro
        this.flash("Error", "Algo deu errado!", "error");
        // Retorna no console o erro
        console.log(err.response);
      }
    }
  }
};
</script>