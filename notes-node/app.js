//console.log('Starting app.js ...');

const fs    = require('fs');
const os    = require('os');
const _     = require('lodash');
const yargs = require('yargs');

// Constantes para as sintaxes e helps dos comandos
const titleOptions = {
  describe: 'Titulo da nota.',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Corpo da nota.',
  demand: true,
  alias: 'b'
};

const notes = require('./notes.js')

const argv = yargs
            .command('add', 'Adicionar nova nota.', {
              title: titleOptions,
              body: bodyOptions
            })
            .command('list', 'Listar todas as notas.')
            .command('read', 'Listar somente uma nota.', {
              title: titleOptions
            })
            .command('remove', 'Apagar uma nota.', {
              title: titleOptions 
            })
            .help()
            .argv;

var command = process.argv[2];

//console.log('Command: ', command);
//console.log('Process: ', process.argv);
//console.log('Yargs: ', argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Nota cridada');
    notes.printNote(note);
  }
  else {
    console.log('Nota já existe. Nada foi gravado.');
  }
}
else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Listando: ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.printNote(note));
}
else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Nota encontrada');
    notes.printNote(note);
  }
  else {
    console.log('Nota não encontrada.');
  }
}
else if (command === 'remove') {
  var note = notes.getNote(argv.title);
  var logRemovido = notes.removeNote(argv.title);
  if (logRemovido) {
    console.log('Nota removida');
    notes.printNote(note);
  }
  else {
    console.log('Nota não localizada. Nada removido.')
  }
}
else {
  console.log('Command not found.');
}
// console.log(_.isString(true)); // Verifica se o valor é uma string
// console.log(_.isString('Cadu'));

// var filterArray = _.uniq(['Cadu', 1,'Cadu', 1, 2, 3, 4, 5, 5, 5, 6, 7]); // Remove duplicidades num vetor
// console.log(filterArray);

//console.log( 'Result: ', notes.add(9, -2) );
// var user = os.userInfo();

// fs.appendFile('greetings.txt', `Hello, ${user.username}! You are ${notes.age}.`, function (err) {
//   if (err) {
//     console.log('Unable to write');
//   }
// });
