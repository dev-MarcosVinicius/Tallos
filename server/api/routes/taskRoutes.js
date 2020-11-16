// Define os métodos de controladores da coleção Tasks
const taskBuilder = require('../controllers/taskController');
// Define os métodos de controladores da coleção Users
const userController = require("../controllers/userController");

// Define os métodos que vão ser chamados e as rotas
module.exports = app => {
  app
  // Define a rota /task
    .route('/tasks')
    // Define o método que vai ser chamado quando for enviado um get na rota /tasks
    .get(taskBuilder.list_all_tasks)
    // Define o método que vai ser chamado quando for enviado um post na rota /tasks
    .post(taskBuilder.create_a_task);

  app
  // Define a rota /tasks/Id
    .route('/tasks/:taskId')
    // Define o método que vai ser chamado quando for enviado um get na rota /tasks/Id
    .get(taskBuilder.read_a_task)
    // Define o método que vai ser chamado quando for enviado um put na rota /tasks/Id
    .put(taskBuilder.update_a_task)
    // Define o método que vai ser chamado quando for enviado um delete na rota /tasks/Id
    .delete(taskBuilder.delete_a_task);

  app
  // Define a rota /register
    .route('/register')
    // Define o método que vai ser chamado quando for enviado um post na rota /register
    .post(userController.registerNewUser);
  
  app
  // Define a rota 
    .route('/login')
    // Define o método que vai ser chamado quando for enviado um post na rota /login
    .post(userController.loginUser);
};