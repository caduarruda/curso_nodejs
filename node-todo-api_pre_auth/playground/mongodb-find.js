//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Problemas ao conectar no MongoDB Server.');
    }
    console.log( 'Conectado no MongoDB Server.');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({_id: new ObjectID('5bb3a04499f9a8176686bcea')}).toArray().then( (docs) => {
    //     console.log( 'To-dos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Não foi possivel pesquisar as informações no banco de dados.', err);
    // });

    db.collection('Todos').find().count().then( (count) => {
        console.log( `To-dos total: ${count}`);
    }, (err) => {
        console.log('Não foi possivel pesquisar as informações no banco de dados.', err);
    });

    client.close();
});