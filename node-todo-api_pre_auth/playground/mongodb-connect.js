//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Problemas ao conectar no MongoDB Server.');
    }
    console.log( 'Conectado no MongoDB Server.');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne( {
    //     text: 'Alguma coisa a fazer',
    //     completed: false
    // }, (err, result ) => {
    //     if (err) {
    //         return console.log('Problemas ao inserir o TODO.', err);
    //     }
    //     console.log( JSON.stringify(result.ops, undefined, 2));
    // });
    
    // inserir novo documento em Users (name, age, location)

//     db.collection('Users').insertOne( {
//         name: 'Carlos Eduardo',
//         age: 46,
//         location: 'Tatuapé'
//     }, (err, result) => {
//         if (err) {
//             return console.log('Não foi possivel inserir o usuário.', err);
//         }
//         console.log(result.ops);
//         console.log(result.ops[0]._id.getTimestamp());
//     });

//     client.close();
});