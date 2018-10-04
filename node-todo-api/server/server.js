var express = require('express');             // Importacao da library Express
var bodyParser = require('body-parser');      // Importacao da library Body-Parser

var {mongoose} = require('./db/mongoose');    // Importacao do modulo de conexão ao banco de dados Moogoose para a variavel moongose
var {Todo} = require('./models/todo');        // Importacao do programa (Data Object) todo para a variavel todo
var {User} = require('./models/user');        // Importacao do programa (Data Object) user para a variavel user

var app = express();                          

app.use(bodyParser.json());                   // Informa ao parser que sera usado o padrao JSON para o conteudo WEB

// Methodo CREATE do CRUD para os To-Dos
app.post('/todos', (req, res) => {            
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// Inicializador do server na porta 3000, chamando a funcao anonima de callback e exibindo o log
app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};