// @flow
import React, {useState} from 'react';
import CategorySelector from './CategorySelector';
import NotePreview from './NotePreview';
import {displayNotes} from '../helpers/display-notes';
import '../styles/notes-list.scss';

type Props = {
  notes: Array<Object>,
  onClick: (id: string) => void,
  onCreateNote: () => void,
  selectedNoteId: String,
};

const NotesList = ({notes, onClick, onCreateNote, selectedNoteId}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredNotes = displayNotes(notes, selectedCategory);

  return (
    <div className="notes-list">
      <input
        className="create-note"
        onClick={onCreateNote}
        type="button"
        value="Create Note"
      />

      <CategorySelector
        notes={notes}
        onChange={selected => setSelectedCategory(selected)}
      />

      {filteredNotes.map(note => {
        return (
          <NotePreview
            key={note.id}
            note={note}
            onClick={() => onClick(note.id)}
            isSelected={selectedNoteId === note.id}
          />
        );
      })}
    </div>
  );
};

export default NotesList;
