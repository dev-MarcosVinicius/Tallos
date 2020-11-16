<template>
  <!--Cria uma div importando as configurações da classe register-->
  <div class="register">
    <!--Importa o componente register para ser exibido-->
    <register />
  </div>
</template>
<script>
// Importa o componente Registerform
import register from "../components/Registerform";
// Exporta o componente register para que possa ser usado para ser exibido
export default {
  components: {
    register
  }
};
</script>