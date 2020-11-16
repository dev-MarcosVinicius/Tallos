// Importa o mongoose
const mongoose = require("mongoose");
// Importa o web token
const jwt = require("jsonwebtoken");
// Importa o bcrypt
const bcrypt = require("bcrypt")

// Define o esquema no mongoose
const { Schema } = mongoose;

// Define o esquema que vai ser usado na coleção User no Schema
const userSchema = Schema({
  // Define a variavel do nome como uma string no DB e define como campo obrigatório
  name: {
    type: String,
    required: [true, "Campo Obrigatório!"]
  },
//  Define a variavel do email como uma string no DB e define como campo obrigatório
  email: {
    type: String,
    required: [true, "Campo Obrigatório!"]
  },
// Define a variavel do password como uma string no DB e define como campo obrigatório
  password: {
    type: String,
    required: [true, "Campo Obrigatório"]
  },
// Define a variavel da sessão como booleana no DB
  section: {
    type: Boolean,
  },
// Define um array que vai armazenar os tokens gerados em cada login como uma string no DB
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    },
// Define o nome da coleção como User
    { collection: 'User' }
  ]
});

// Define um método que gera o token de autenticação 
// que é chamado através do userSchema
userSchema.methods.generateAuthToken = async function() {
  // Define user como array
  const user = this;
  // Define o token com o jwt usando o id,nome e email como secret
  const token = jwt.sign({ _id: user._id, name: user.name, email: user.email },
  "secret");
  // Define dentro de user em tokens a concatenação recebida de token
  user.tokens = user.tokens.concat({ token });
  // Salva a variavel user com a concatenação
  await user.save();
  // Retorna o token 
  return token;
};

// Define o método que faz a busca do usuário no DB
userSchema.statics.findByCredentials = async (email, password) => {
  // Define na variavel user a resposta da procura da variavel email dentro da coleção User
  const user = await User.findOne({ email });
  // Cria uma condição se não for encontrado um usuário
  if (!user) {
    // Se o usuário não for encontrado retorna um erro
    throw new Error({ error: "Login invalido!" });
  }
  // Define na variavel isPasswordMatch a resposta da comparação feita pelo bcrypt da senha
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  // Cria uma condição se o password não for igual
  if (!isPasswordMatch) {
    // Se o password não for igual restorna um erro
    throw new Error({ error: "Login invalido!" });
  }
  // Retorna a variavel user com a resposta da procura pelo email no DB
  return user;
};

// Exporta o modulo com o esquema userSchema
module.exports = mongoose.model('User', userSchema);