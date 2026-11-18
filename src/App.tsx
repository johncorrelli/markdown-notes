import {useEffect, useState} from 'react';
import ImportNotes from './components/import-notes/ImportNotes';
import NoteList from './components/notes-list/NotesList';
import Note from './components/note/Note';
import Storage from './components/storage/Storage';
import {getNoteCategories} from './helpers/categories';
import type {Note as NoteType, NoteDraft} from './types';

import './styles/app.scss';

function App() {
  const [allNotes, setAllNotes] = useState<NoteType[]>([]);
  const [noteCategories, setNoteCategories] = useState<string[]>([]);
  const [selectedNote, setSelectedNote] = useState<
    NoteDraft | null | undefined
  >(null);
  const [isImportingNotes, setIsImportingNotes] = useState(false);

  const getNotes = async () => {
    return await Storage.getAllNotes();
  };

  const getNote = async (id: string | null) => {
    const allNotes = await getNotes();

    const note = allNotes.filter(note => {
      return note.id === id;
    });

    return note[0];
  };

  const onSelectNote = async (id: string | null) => {
    const selectedNote = await getNote(id);

    setSelectedNote(selectedNote);
  };

  const onSaveNote = async (note: NoteDraft) => {
    const savedNote = await Storage.saveNote(note);
    const allNotes = await getNotes();

    setAllNotes(allNotes);
    setNoteCategories(getNoteCategories(allNotes));
    setSelectedNote(note);

    return savedNote;
  };

  const onCreateNote = async () => {
    const note = await onSaveNote({});

    onSelectNote(note.id);
  };

  const onDeleteNote = async (note: NoteDraft) => {
    const {id} = note;

    if (id) {
      await Storage.deleteNote(id);
    }
    const newAllNotes = await getNotes();

    onSelectNote(null);
    setAllNotes(newAllNotes);
  };

  useEffect(() => {
    Storage.getAllNotes().then(allNotes => {
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
