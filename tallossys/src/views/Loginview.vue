<template>
<!--Cria uma div importando as configurações de login-->
  <div class="login">
    <!--Exibe o componente login-->
    <login />
  </div>
</template>
<script>
// Importa o componente login
import login from "../components/Loginform";
export default {
  // Exporta o componente login para ser exibido
  components: {
    login
  }
};
</script>