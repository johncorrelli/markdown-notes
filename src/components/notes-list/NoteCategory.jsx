// @flow
import React, {Fragment} from 'react';
import NotePreview from '../note/NotePreview';

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
    <Fragment>
      <span className="note-category-heading">{category}</span>
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
    </Fragment>
  );
};

export default NoteCategory;
