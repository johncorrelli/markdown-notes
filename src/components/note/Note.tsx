import {useState} from 'react';
import Input from '../shared/input/Input';
import NoteHeader from './NoteHeader';
import {
  LAYOUT_EDIT,
  LAYOUT_MARKDOWN,
  LAYOUT_SPLIT,
  type Layout,
} from '../../constants/layout';
import Markdown from '../shared/markdown/Markdown';
import type {NoteDraft} from '../../types';

import './note.scss';
import 'github-markdown-css/github-markdown-light.css';

type Props = {
  note: NoteDraft | null | undefined;
  noteCategories: Array<string | null>;
  onDelete: (note: NoteDraft) => void;
  onSave: (note: NoteDraft) => void;
};

const Note = ({note, noteCategories, onDelete, onSave}: Props) => {
  const noteValue = note && note.value;
  const [value, setValue] = useState(noteValue || '');
  const [layout, setLayout] = useState<Layout>(LAYOUT_SPLIT);

  // Reset the editor when a different note (or a saved value) comes in.
  // This is the "adjust state while rendering" pattern rather than an effect.
  const [prevNoteValue, setPrevNoteValue] = useState(noteValue);
  if (noteValue !== prevNoteValue) {
    setPrevNoteValue(noteValue);
    setValue(noteValue || '');
  }

  if (!note) {
    return <div className="selected-note" />;
  }

  const onDeleteNote = () => {
    onDelete(note);
  };

  const onUpdateNote = (newAttributes: NoteDraft) => {
    const newNote = {
      ...note,
      ...newAttributes,
    };

    onSave(newNote);
  };

  const onSaveNote = (nextValue: string) => {
    onUpdateNote({value: nextValue});
  };

  const showEdit = layout === LAYOUT_EDIT || layout === LAYOUT_SPLIT;
  const showMarkdown = layout === LAYOUT_MARKDOWN || layout === LAYOUT_SPLIT;

  return (
    <div className={`selected-note ${layout}`}>
      <NoteHeader
        category={note.category}
        layout={layout}
        noteCategories={noteCategories}
        onDelete={onDeleteNote}
        onUpdateNote={onUpdateNote}
        onSetLayout={nextLayout => setLayout(nextLayout)}
        title={note.title}
      />

      <div className="note-details">
        {showEdit && (
          <div className="edit-note">
            <Input
              keyListeners={[
                'enter',
                'meta+b',
                'meta+i',
                'meta+s',
                'shift+tab',
                'tab',
              ]}
              name="value"
              onChange={value => setValue(value)}
              onSave={value => onSaveNote(value)}
              tagName="textarea"
              value={value}
            />
          </div>
        )}

        {showMarkdown && (
          <div className="view-note">
            <Markdown value={value} onChange={onSaveNote} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
