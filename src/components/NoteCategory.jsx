// @flow
import React from 'react';
import NotePreview from './NotePreview';

type Props = {
  category: string,
  notes: Array<Object>,
  onSelectNote: (id: string) => void,
  selectedNoteId: ?string,
};

const NoteCategory = ({
  category,
  notes,
  onSelectNote,
  selectedNoteId,
}: Props) => {
  if (!category) {
    return null;
  }

  return (
    <div>
      <div className="note-category-heading">{category}</div>
      {notes.map(note => {
        return (
          <NotePreview
            key={note.id}
            note={note}
            onClick={() => onSelectNote(note.id)}
            isSelected={selectedNoteId === note.id}
          />
        );
      })}
    </div>
  );
};

export default NoteCategory;
