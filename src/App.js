import React, {useEffect, useState} from 'react';
import ImportNotes from './components/import-notes/ImportNotes';
import NoteList from './components/notes-list/NotesList';
import Note from './components/note/Note';
import Storage from './components/storage/Storage';
import {getNoteCategories} from './helpers/categories';

import './styles/app.scss';

function App() {
  const onCreateNote = async () => {
    const note = await onSaveNote({});

    onSelectNote(note.id);
  };

  const onDeleteNote = async note => {
    const {id} = note;

    await Storage.deleteNote(id);
    const newAllNotes = await getNotes();

    onSelectNote(null);
    setAllNotes(newAllNotes);
  };

  const onSelectNote = async id => {
    const selectedNote = await getNote(id);

    setSelectedNote(selectedNote);
  };

  const getNote = async id => {
    const allNotes = await getNotes();

    const note = allNotes.filter(note => {
      return note.id === id;
    });

    return note[0];
  };

  const getNotes = async () => {
    return await Storage.getAllNotes();
  };

  const onSaveNote = async note => {
    const savedNote = await Storage.saveNote(note);
    const allNotes = await getNotes();

    setAllNotes(allNotes);
    setNoteCategories(getNoteCategories(allNotes));
    setSelectedNote(note);

    return savedNote;
  };

  const [allNotes, setAllNotes] = useState([]);
  const [noteCategories, setNoteCategories] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isImportingNotes, setIsImportingNotes] = useState(false);

  useEffect(() => {
    getNotes().then(allNotes => {
      setAllNotes(allNotes);
      setNoteCategories(getNoteCategories(allNotes));
    });
  }, []);

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

      <Note
        note={selectedNote}
        noteCategories={noteCategories}
        onDelete={onDeleteNote}
        onSave={onSaveNote}
      />

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
