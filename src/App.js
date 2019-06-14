import React, {useState} from 'react';
import NoteList from './components/NotesList';
import Note from './components/Note';
import Storage from './components/Storage';

import './styles/app.scss';

function App() {
  const onCreateNote = () => {
    const note = onSaveNote({});

    onSelectNote(note.id);
  };

  const onSelectNote = id => {
    setSelectedNote(getNote(id));
  };

  const getNote = id => {
    const note = getNotes().filter(note => {
      return note.id === id;
    });

    return note[0];
  };

  const getNotes = () => {
    return Storage.getAllNotes();
  };

  const onSaveNote = note => {
    const savedNote = Storage.saveNote(note);
    setAllNotes(getNotes());

    return savedNote;
  };

  const [allNotes, setAllNotes] = useState(getNotes());
  const [selectedNote, setSelectedNote] = useState(null);

  const downloadNotesUrl =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(allNotes));

  return (
    <div className="App">
      <NoteList
        downloadNotesUrl={downloadNotesUrl}
        notes={allNotes}
        onClick={onSelectNote}
        onCreateNote={onCreateNote}
        selectedNoteId={selectedNote && selectedNote.id}
      />
      <Note note={selectedNote} onSave={onSaveNote} />
    </div>
  );
}

export default App;
