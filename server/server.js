// Importa o express
const express = require('express');
// Importa o cors
const cors = require('cors');
// Importa o mongoose
const mongoose = require('mongoose');
// Importa o bodyParser
const bodyParser = require('body-parser');
// Importa o morgan
const morgan = require("morgan");

// Importa de forma global para a variavel Task o modelo taskModel
global.Task = require('./api/models/taskModel');
// Importa de forma global para a variavel Task o modelo User
global.User = require('./api/models/User')
// Importa para a variavel routes todas as rotas em taskRoutes
const routes = require('./api/routes/taskRoutes');

// Define o Promise do mongoose de forma global
mongoose.Promise = global.Promise;
// Adiciona o useFindAndModify como false ao mongoose
mongoose.set('useFindAndModify', false);
// Realiza a conecção do mongoose através da url e define como true o 
// useNewUrlParser e useUnifiedTopology
mongoose.connect(
  'mongodb+srv://124578mv:124578mv@7itecdb.yv0nb.mongodb.net/itecDB?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Define a variavel port com a porta 3000
const port = process.env.PORT || 3000;
// Define a variavel app com os métodos do express
const app = express();

// Passa os métodos do cors como parametros no .use do express
app.use(cors());
// Passa o método do bodyParser urlencoded extended como true no use do express 
app.use(bodyParser.urlencoded({ extended: true }));
// Passa o método do bodyParser como json
app.use(bodyParser.json());

// Passa o como paramentro dev para o morgan no use do express
app.use(morgan("dev"));

// Passa o express como parametro nas rotas
routes(app);
// Faz o express ouvir a porta definida
app.listen(port);

// Mostra no console que o server está ouvindo a porta 3000t
console.log(`Server started on port ${port}`);