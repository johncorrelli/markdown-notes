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
  const [searchString, setSearchString] = useState('');

  const searchKeys = [
    {name: 'title', weight: 0.7},
    {name: 'value', weight: 0.3},
  ];

  const filteredNotes = displayNotes(
    notes,
    selectedCategory,
    searchString,
    searchKeys
  );

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

      <input
        className="search"
        name="searchString"
        onChange={e => setSearchString(e.target.value)}
        placeholder="Enter search..."
        value={searchString}
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
