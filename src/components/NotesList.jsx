// @flow
import React, {useState} from 'react';
import CategorySelector from './CategorySelector';
import NotePreview from './NotePreview';
import {displayNotes} from '../helpers/display-notes';
import '../styles/notes-list.scss';

type Props = {
  downloadNotesUrl: string,
  notes: Array<Object>,
  onClick: (id: string) => void,
  onCreateNote: () => void,
  selectedNoteId: String,
};

const NotesList = ({
  downloadNotesUrl,
  notes,
  onClick,
  onCreateNote,
  selectedNoteId,
}: Props) => {
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
      <div className="header">
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
      </div>

      <div className="scrollable-content">
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

      <div className="footer">
        <a
          className="secondary-button"
          download="markdown-notes.json"
          href={downloadNotesUrl}
        >
          Download Notes
        </a>
      </div>
    </div>
  );
};

export default NotesList;
