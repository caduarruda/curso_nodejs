const expect = require('expect');           // carregar modulo expect
const request = require('supertest');       // carregar modulo supertest
const {ObjectID} = require('mongodb');

const {app} = require('./../server');       // importar modulo server
const {Todo} = require('./../models/todo'); // importar modulo todo (Data Object)  

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }];
  
// Garantir que o banco de dados esteja vazio antes do teste
beforeEach( (done) => {                     
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then( () => done() );
});

// Test case para validar a insercao de um novo TO-DO
describe( 'POST /todos', () => {
    it('Deverá criar um novo to-do.', (done) => {
        var text = 'Test de novo to-do.';
        request(app)
            .post('/todos')                                 // Metodo a ser testado
            .send({text})                                   // Valor a ser enviado ao servico
            .expect(200)                                    // Resultado esperado 200=OK
            .expect( (res)=> {  
                expect(res.body.text).toBe(text);           // Esperado que o texto seja igual a variavel
            }).end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find({text}).then( (todos) => {              // Teste para verificar se tudo foi inserido no DB
                    expect(todos.length).toBe(1);           // Se foi inserido um unico documento
                    expect(todos[0].text).toBe(text);       // Se o texto inserido e igual a variavel text
                    done(); 
                }).catch((e) => done(e));
            });
    });

    // Testa um to-do com texto invalido
    it('Deverá criar um to-do com texto invalido.', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find().then( (todos) => {
                    expect(todos.length).toBe(2);
                    done(); 
                }).catch((e) => done(e));
            });
    });
});

// Testa a lista de to-dos
describe( 'GET /todos', () => {
    it('Deverá listar todos os to-dos da base.', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect( (res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
});

// Testa um único to-do
describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });
  
    it('should return 404 if todo not found', (done) => {
      var hexId = new ObjectID().toHexString();
  
      request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
  
    it('should return 404 for non-object ids', (done) => {
      request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
    });
  });
  
  // Testa a deleção de um to-do
  describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
      var hexId = todos[1]._id.toHexString();
  
      request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          Todo.findById(hexId).then((todo) => {
            expect(todo).toNotExist;
            done();
          }).catch((e) => done(e));
        });
    });
  
    it('should return 404 if todo not found', (done) => {
      var hexId = new ObjectID().toHexString();
  
      request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
  
    it('should return 404 if object id is invalid', (done) => {
      request(app)
        .delete('/todos/123abc')
        .expect(404)
        .end(done);
    });
  });
  
  // Testa a atualizacao de um to-do
  describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
      var hexId = todos[0]._id.toHexString();
      var text = 'This should be the new text';
  
      request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: true,
          text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(true);
          expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done);
    });
  
    it('should clear completedAt when todo is not completed', (done) => {
      var hexId = todos[1]._id.toHexString();
      var text = 'This should be the new text!!';
  
      request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: false,
          text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toNotExist;
        })
        .end(done);
    });
  });