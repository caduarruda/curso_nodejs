//console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
  try {
    //Leitura previa das anotações
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  }
  catch (e) {
    return [];
  }
}

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = ( title, body ) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  }

  var duplicateNotes = notes.filter((note) => note.title === title);

  if ( duplicateNotes.length === 0) {
    // Gravação da anotação
    notes.push(note);
    saveNotes(notes);
    return note;
  }

}

var getAll = () => {
  return fetchNotes();
}

var getNote = ( title ) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title );
  return filteredNotes[0];
}

var removeNote = (title) => {
  var notes = fetchNotes();
  filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length; // Retorna verdadeiro se houve a remoção, false se não houve (qtdes iguais de linhas)
}

var printNote = (note)  => {
  debugger;
  console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
  console.log('Nota: ', note.title);
  console.log('Corpo: ', note.body);
}

module.exports = {
   addNote,
   getAll,
   getNote,
   removeNote,
   printNote
}