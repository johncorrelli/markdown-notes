// @flow
import React, {useEffect, useState} from 'react';
import Input from '../shared/input/Input';
import NoteHeader from './NoteHeader';
import {
  LAYOUT_EDIT,
  LAYOUT_MARKDOWN,
  LAYOUT_SPLIT,
} from '../../constants/layout';
import Markdown from '../shared/markdown/Markdown';

import './note.scss';
import 'github-markdown-css';

type Props = {
  note: {
    id: string,
    title: string,
    category: string,
    value: string,
  },
  noteCategories: Array<Object>,
  onDelete: (note: Object) => void,
  onSave: (note: Object) => void,
};

const Note = ({note, noteCategories, onDelete, onSave}: Props) => {
  const noteValue = note && note.value;
  const [value, setValue] = useState(noteValue || '');
  const [layout, setLayout] = useState(LAYOUT_SPLIT);

  useEffect(() => {
    setValue(noteValue || '');
  }, [noteValue]);

  const onDeleteNote = () => {
    onDelete(note);
  };

  const onUpdateNote = newAttributes => {
    const newNote = {
      ...note,
      ...newAttributes,
    };

    onSave(newNote);
  };

  const onSaveNote = nextValue => {
    onUpdateNote({value: nextValue});
  };

  if (!note) {
    return <div className="selected-note" />;
  }

  const showEdit = layout === LAYOUT_EDIT || layout === LAYOUT_SPLIT;
  const showMarkdown = layout === LAYOUT_MARKDOWN || layout === LAYOUT_SPLIT;

  return (
    <div className={`selected-note ${layout}`}>
      <NoteHeader
        category={note && note.category}
        layout={layout}
        noteCategories={noteCategories}
        onDelete={onDeleteNote}
        onUpdateNote={onUpdateNote}
        onSetLayout={nextLayout => setLayout(nextLayout)}
        title={note && note.title}
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
