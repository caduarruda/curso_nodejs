console.log('Starting app.js ...');

const fs    = require('fs');
const os    = require('os');
const _     = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')

const argv = yargs.argv;

var command = process.argv[2];

console.log('Command: ', command);
console.log('Process: ', process.argv);
console.log('Yargs: ', argv);

if (command === 'add') {
  notes.addNote(argv.title, argv.body);
}
else if (command === 'list') {
  notes.getAll();
}
else if (command === 'read') {
  notes.getNote(argv.title);
}
else if (command === 'remove') {
  notes.removeNote(argv.title);
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
