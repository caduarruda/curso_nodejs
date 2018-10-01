// var obj = {
//     name: 'Cadu'
// };

// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log( stringObj );

// var personString = '{"name": "Cadu", "age": 45}';
// var person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);

const fs = require( 'fs');

var originalNote = {
    title: 'Some title',
    body: 'Some body'
};

var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);
console.log(note);
console.log(noteString);