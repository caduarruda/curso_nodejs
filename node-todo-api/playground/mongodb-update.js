//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Problemas ao conectar no MongoDB Server.');
    }
    console.log( 'Conectado no MongoDB Server.');
    const db = client.db('TodoApp');

    
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5bb4a6d256a03266b5fba9ba')

    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then( (result) => {
    //     console.log( result );
    // });
    
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5bb3fec69f49990682de27e1')

    }, {
        $set: {
            name: 'Francisco Arruda',
            age:  0
        }
    }, {
        returnOriginal: false
    }).then( (result) => {
        console.log( result );
    });

    //client.close();
});