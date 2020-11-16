// Importa o mongoose
const mongoose = require('mongoose');
// Define o esquema no mongoose
const { Schema } = mongoose;
// Define o esquema que vai ser usado na coleção task no Schema
const taskSchema = new Schema(
  {
    // Define a variavel do nome como task1 no DB
    task1: {
      type: String,
      required: 'task1 cannot be blank'
    },
    // Define a variavel do cargo como task2 no DB
    task2: {
      type: String,
      required: 'task2  cannot be blank'
    }
  },
  // Define o nome da coleção como task
  { collection: 'task' }
);

// Exporta o modulo com o esquema taskSchema
module.exports = mongoose.model('task', taskSchema);