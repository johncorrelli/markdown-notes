import classNames from 'classnames';
import type {Note} from '../../types';

type Props = {
  note: Note;
  onClick: (id: string) => void;
  isSelected: boolean;
};

const NotePreview = ({note, onClick, isSelected}: Props) => {
  if (!note.title) {
    return null;
  }

  const noteClass = classNames({
    'note-preview': true,
    selected: isSelected,
  });

  return (
    <div className={noteClass} id={note.id} onClick={() => onClick(note.id)}>
      <div className="note-title">{note.title}</div>
      <div className="note-category">{note.category}</div>
    </div>
  );
};

export default NotePreview;
