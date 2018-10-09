//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Problemas ao conectar no MongoDB Server.');
    }
    console.log( 'Conectado no MongoDB Server.');
    const db = client.db('TodoApp');

    // DeleteMany
    // db.collection('Todos').deleteMany({text : 'Tirar tempo para meditação e descanso'}).then( (result) => {
    //     console.log( result );
    // });
 
    // DeleteOne
    // db.collection('Todos').deleteOne({text : 'Tirar tempo para meditação e descanso.'}).then( (result) => {
    //     console.log( result );
    // });
    
    //FindeOneAndDelete
    db.collection('Todos').findOneAndDelete({completed : false}).then( (result) => {
        console.log( result );
    });

    //client.close();
});