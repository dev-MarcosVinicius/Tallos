<!--Renderiza um componente vazio apenas para 
    redirecionar para a pagina de login -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<!--Exporta o componente com o nome de app para ser chamado em outra rota-->
<script>
export default {
  name: 'app'
};
</script>

<!--Carrega estilos usados dentro dos componentes input em rotas definidas
    a partir de app -->
<style>
div.input {
  margin-bottom: 10px;
}
</style>