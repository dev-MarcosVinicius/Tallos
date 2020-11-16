// Importa o mongoose
const mongoose = require('mongoose');
// Importa o modelo User
const User = mongoose.model('User');

// Exporta a função registerNewUser passando como parametro o request e o response
exports.registerNewUser = async (req, res) => {
  // Procura na coleção User um email igual ao requisitado
    User.findOne({ email: req.body.email }).then(data => {
      // Cria uma condição para verificar de retornou algum dado em data
    if (data) {
      // Exibe no console caso o email retorne
      console.log('Email já existe.'+data)
      // Envia os dados pelo response
      res.send(data)
      // Caso o data retorne null
    } else {
      // Cria uma variavel usando o esquema User 
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        section: req.body.section
      });
      // Salva a variavel user com as informações de nome,email,senha e sessão
      let data = user.save()
      // Se tiver recebido valor no data retorna o nome no console
      .then(data=>{
        console.log(data.name)
      })
      // Se retornar um erro exibe no console
      .catch(err=>{
        console.log(err)
      })
      // Cria uma variavel token que executa a função que gera o token 
      // usando os dados da variavel user
      const token = user.generateAuthToken();
      // Envia um response com status 201 com um json da variavel data e do token
      res.status(201).json({ data, token });
    }
  })};

  // Exporta a função loginUser passando como parametro o request e o response
  exports.loginUser = async (req, res) => {
    // Faz uma busca na coleção User procurando um email e senha compativeis com o request
    User.findOne({ email: req.body.email, password:req.body.password }).then(data => {
      // Exibe no console o response com os dados
      console.log(data)
      // Cria uma condição se for recebido valores no response data
      if (data) {
        // Cria uma variavel que recebe o token gerado com os dados do response
        const token = data.generateAuthToken();
        // Envia o token como json
        res.status(201).json({ token });
        // Envia o data pelo response 
        res.send(data)
      // Cria uma condição se não for recebido dados do response
      } else {
        // Exibe no console uma menssagem com erro no login
        console.log('Login ou senha incorretos'+data)
      }
    })
    // Exibe no console caso a condição try retorne um erro
    .catch(err=>{
      console.log(err)
    })
    };