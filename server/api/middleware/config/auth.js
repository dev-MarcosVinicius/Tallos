// Importa o web token
const jwt = require("jsonwebtoken");

// Exporta o modulo passando os parametros request, response e next
module.exports = (req, res, next) => {
  // Cria uma condição
  try {
    // Define na variavel token a resposta da requisição do token
    const token = req.headers.authorization.replace("Bearer ", "");
    // Exibe no console o a variavel token
    console.log(token);
    // Define o token decriptado na variavel decoded
    const decoded = jwt.verify(token, "secret");
    // Passa o token para a request do userData
    req.userData = decoded;
    // console.log(req.userData);
    // Finaliza a autorização
    next();
    // Executa caso a condição retorne um erro
  } catch (err) {
    // Retorna um json com o status 401 com a menssagem Falha na autenticação
    return res.status(401).json({
      message: "Falha na autenticação"
    });
  }
};