const expect = require('expect');           // carregar modulo expect
const request = require('supertest');       // carregar modulo supertest

const {app} = require('./../server');       // importar modulo server
const {Todo} = require('./../models/todo'); // importar modulo todo (Data Object)  

// Garantir que o banco de dados esteja vazio antes do teste
beforeEach( (done) => {                     
    Todo.deleteMany({}).then(() => done());
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
                Todo.find().then( (todos) => {              // Teste para verificar se tudo foi inserido no DB
                    expect(todos.length).toBe(1);           // Se foi inserido um unico documento
                    expect(todos[0].text).toBe(text);       // Se o texto inserido e igual a variavel text
                    done(); 
                }).catch((e) => done(e));
            });
    });

    it('Devera criar um to-do com texto invalido.', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .expect( (res)=> {
                expect(res.body.text).toBe(undefined);
            }).end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find().then( (todos) => {
                    expect(todos.length).toBe(0);
                    done(); 
                }).catch((e) => done(e));
            });
    });
});