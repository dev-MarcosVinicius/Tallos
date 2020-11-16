// Importa o mongoose
const mongoose = require('mongoose');
// Importa o modelo task
const task = mongoose.model('task');

// Exporta a função list_all_tasks passando como parametro o request e o response
exports.list_all_tasks = (req, res) => {
  // Procura tudo na coleção task
  task.find({}, (err, tasks) => {
    // Cria uma condição se for recebido um erro e envia esse erro em um response
    if (err) res.send(err);
    // Envia as tasks em um response
    res.json(tasks);
  });
};

// Exporta a função create_a_task passando como parametro o request e o response
exports.create_a_task = (req, res) => {
  // Cria uma variavel atribuindo todo o request da coleção task
  const newTask = new task(req.body);
  // Salva a variavel recebida e envia um response com o erro ou a task criada
  newTask.save((err, task) => {
    // Cria um condição se for recebido um erro e envia o erro em um response
    if (err) res.send(err);
    // Envia a task em um response
    res.json(task);
  });
};

// Exporta a função read_a_task passando como parametro o request e o response
exports.read_a_task = (req, res) => {
  // Faz uma procura na coleção task com o id enviado no request
  task.findById(req.params.taskId, (err, task) => {
    // Cria uma condição caso seja recebido um erro e envia o erro como response
    if (err) res.send(err);
    // Envia a task em um response
    res.json(task);
  });
};

// Exporta a função update_a_task passando como parametro o request e o response
exports.update_a_task = (req, res) => {
  // Faz uma procura pelo id e atualiza o item enviado com o valor enviado 
  task.findOneAndUpdate(
    // Id enviado para buscar na coleção
    { _id: req.params.taskId },
    // Passa todo os dados do request
    req.body,
    // Envia o item e o valor que vai ser atualizado
    { new: true },
    // Envia o erro ou a task
    (err, task) => {
      // Cria uma condição que envia o erro como response
      if (err) res.send(err);
      // Envia a task como response
      res.json(task);
    }
  );
};

// Exporta a função delete_a_task passando como parametro o request e o response
exports.delete_a_task = (req, res) => {
  // Faz uma procura pelo id
  task.deleteOne({ _id: req.params.taskId }, err => {
    // Cria uma condição caso retorne um erro
    if (err) res.send(err);
    // Envia um response com um json com o id e uma menssagem de comfirmação
    res.json({
      message: 'Taks deletada com sucesso',
     _id: req.params.taskId
    });
  });
};