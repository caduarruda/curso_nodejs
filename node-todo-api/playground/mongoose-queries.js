const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// var id = '576bb693aaf7f28c25143d2a2d';

// if (!ObjectID.isValid(id) ) {
//     return console.log( 'ID inválido !');
// }

// Todo.find({
//     _id: id
// }).then( (todos) => {
//     console.log('To-dos: ', todos);
// });

// Todo.findOne({
//     _id: id
// }).then( (todo) => {
//     console.log('To-do: ', todo);
// });

// Todo.findById(id).then( (todo) => {
//     if (!todo) {
//         return console.log( 'ID não encontrado.');
//     }
//     console.log('To-do by Id: ', todo);
// }).catch( (e) => console.log(e));

