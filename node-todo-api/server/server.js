require('./config/config');                   // Verifica qual ambiente estamos executando a aplicacao

const _ = require('lodash');
const express = require('express');             // Importacao da library Express
const bodyParser = require('body-parser');      // Importacao da library Body-Parser
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');    // Importacao do modulo de conexão ao banco de dados Moogoose para a variavel moongose
var {Todo} = require('./models/todo');        // Importacao do programa (Data Object) todo para a variavel todo
var {User} = require('./models/user');        // Importacao do programa (Data Object) user para a variavel user
var {authenticate} = require('./middleware/authenticate');

var app = express();    
// const port = process.env.PORT || 3000;        // Define a porta para o servidor, via parametro externo                      

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

// Metodo para listar todos os to-dos do banco de dados
app.get('/todos', (req, res) => {
  Todo.find().then( (todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// Metodo para listar somente um to-do da base por ID
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;             // Recebe o ID do request e atribui a variaval id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();    // Se o ID é um objeto invalido, interrompe a execucao com erro 404
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();  // Manda de volta erro 404 com corpo vazio
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();           // Manda de volta erro 400 com corpo vazio
  });
});

// Metodo para deletar somente um to-do da base por ID
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});


// Metodo para atualizar somente um to-do na base por ID
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);       // Definir quais atributos serao passiveis de update

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {      // de completed é booleano e true
    body.completedAt = new Date().getTime();                // Atribui um Timestamp para o atributo completedAt
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// Methodo CREATE do CRUD para os Users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// Inicializador do server na porta 3000, chamando a funcao anonima de callback e exibindo o log
app.listen(3000, () => {
  console.log('Started on port 3000');
});

//app.listem( port, () => {
//  console.log(`Servidor iniciado na porta: ${port}`)
//});

module.exports = {app};