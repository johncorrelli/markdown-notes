import React, {useState} from 'react';
import ImportNotes from './components/import-notes/ImportNotes';
import NoteList from './components/notes-list/NotesList';
import Note from './components/note/Note';
import Storage from './components/storage/Storage';
import {getNoteCategories} from './helpers/categories';

import './styles/app.scss';

function App() {
  const onCreateNote = () => {
    const note = onSaveNote({});

    onSelectNote(note.id);
  };

  const onDeleteNote = note => {
    const {id} = note;

    Storage.deleteNote(id);
    onSelectNote(null);
    setAllNotes(getNotes());
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
    const allNotes = getNotes();

    setAllNotes(allNotes);
    setNoteCategories(getNoteCategories(allNotes));

    return savedNote;
  };

  const [allNotes, setAllNotes] = useState(getNotes());
  const [selectedNote, setSelectedNote] = useState(null);
  const [isImportingNotes, setIsImportingNotes] = useState(false);
  const [noteCategories, setNoteCategories] = useState(
    getNoteCategories(allNotes)
  );

  const downloadNotesUrl =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(allNotes));

  return (
    <div className="App">
      <NoteList
        downloadNotesUrl={downloadNotesUrl}
        noteCategories={noteCategories}
        notes={allNotes}
        onSelectNote={onSelectNote}
        onCreateNote={onCreateNote}
        onImportNotes={() => setIsImportingNotes(!isImportingNotes)}
        selectedNoteId={selectedNote && selectedNote.id}
      />

      <Note note={selectedNote} onDelete={onDeleteNote} onSave={onSaveNote} />

      {isImportingNotes && (
        <ImportNotes
          onNotImportingNotes={() => setIsImportingNotes(false)}
          onSaveNote={onSaveNote}
        />
      )}
    </div>
  );
}

export default App;
