import NotePreview from '../note/NotePreview';
import type {Note} from '../../types';

type Props = {
  category: string | null;
  notes: Note[];
  onSelectNote: (id: string) => void;
  selectedNoteId: string | null | undefined;
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
    <>
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
    </>
  );
};

export default NoteCategory;
