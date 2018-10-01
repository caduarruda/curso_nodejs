const express = require('express');

var app = express();

// Metodo para mapear a chamada do primeiro response no contexto raiz = '/'
app.get('/', (req, res) => {
   //res.send('<h1>Hello Express.</h1>');
   res.send( {
        nome: 'Carlos Eduardo H. Arruda',
        endereco: 'Av. Celso Garcia, 5754',
        bairro: 'Tatuapé',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '03064-000',
        filhos: [
            'Gabriella',
            'Daniel',
            'Francisco'
        ]
   });
});

app.get('/about', (req, res) => {
    res.send('About page.')
});

app.get('/bad', (req, res) => {
    res.send( {
        errorMessage: 'Unable do get the result for page.'
    });
});

app.listen(8080);