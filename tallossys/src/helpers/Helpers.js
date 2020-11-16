// Importa o axios para ser usado
import axios from 'axios';
// Importa o vue para ser usado
import Vue from 'vue';
// Importa o vue-flash-message
import VueFlashMessage from 'vue-flash-message';
// Importa os configurações de vue-flash-message
import 'vue-flash-message/dist/vue-flash-message.min.css';
// Adiciona as configurações ao VueFlashMessege
Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
});
// Define o Vue na constante vm
const vm = new Vue();
// Define a URL e a porta a ser chamada
const baseURL = 'http://localhost:3000/tasks/';
// Cria a função que vai ser utilizada para chamar os métodos da api passando os parametros
const handleError = fn => (...params) =>
 // Cria o método que vai ser chamado na api (get/post/delete/put) 
  fn(...params).catch(error => {
    // Cria o alerta que será apresentado caso seja capturado um erro
    vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
  });

// Exporta um array com os métodos a serem chamados
export const api = {
  // Cria o método gettask passando o parametro id
  gettask: handleError(async id => {
    // Atribui a resposta da chamada get ao res
    const res = await axios.get(baseURL + id);
    // Retorna os dados da resposta da chamada get
    return res.data;
  }),
  // Cria o método gettasks
  gettasks: handleError(async () => {
    // Atribui a resposta da chamada get ao res
    const res = await axios.get(baseURL);
    // Retorna os dados da resposta da chamada get
    return res.data;
  }),
  // Cria o método deletetask passando o parametro id
  deletetask: handleError(async id => {
    // Atribui a resposta da chamada delete ao res
    const res = await axios.delete(baseURL + id);
    // Retorna os dados da resposta da chamada delete
    return res.data;
  }),
  // Cria o método createtask passando os parametros para a chamada da api
  createtask: handleError(async payload => {
    // Atribui a resposta da chamada pos ao res
    const res = await axios.post(baseURL, payload);
    // Retorna os dados da resposta da chamada post
    return res.data;
  }),
  // Cria o método updatetask passando os parametros para a chamada da api
  updatetask: handleError(async payload => {
    // Atribui a resposta da chamada put ao res
    const res = await axios.put(baseURL + payload._id, payload);
    // Retorna os dados da resposta da chamada put
    return res.data;
  })
};