// @flow
import React, {useEffect, useState} from 'react';
import Input from '../shared/input/Input';
import NoteHeader from './NoteHeader';
import MarkdownRenderer from 'react-markdown-renderer';
import {
  LAYOUT_EDIT,
  LAYOUT_MARKDOWN,
  LAYOUT_SPLIT,
} from '../../constants/layout';
import syntaxHighlighting from '../../helpers/syntax-highlighting';

import './note.scss';
import 'github-markdown-css';

type Props = {
  note: {
    id: string,
    title: string,
    category: string,
    value: string,
  },
  onDelete: (note: Object) => void,
  onSave: (note: Object) => void,
};

const Note = ({note, onDelete, onSave}: Props) => {
  const id = note && note.id;
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [value, setValue] = useState(null);
  const [layout, setLayout] = useState(LAYOUT_SPLIT);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setCategory(note.category);
      setValue(note.value);
    }
  }, [note]);

  const deleteNote = () => {
    onDelete(note);
  };

  const saveNote = () => {
    onSave({
      id,
      title,
      category,
      value,
    });
  };

  const renderCodeBlock = (string, lang) => {
    return syntaxHighlighting(string, lang);
  };

  if (!note) {
    return <div className="selected-note" />;
  }

  const showEdit = layout === LAYOUT_EDIT || layout === LAYOUT_SPLIT;
  const showMarkdown = layout === LAYOUT_MARKDOWN || layout === LAYOUT_SPLIT;

  return (
    <div className={`selected-note ${layout}`}>
      <NoteHeader
        category={category}
        layout={layout}
        onDelete={deleteNote}
        onSave={saveNote}
        onSetCategory={value => setCategory(value)}
        onSetLayout={nextLayout => setLayout(nextLayout)}
        onSetTitle={value => setTitle(value)}
        title={title}
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
              onSave={saveNote}
              tagName="textarea"
              value={value}
            />
          </div>
        )}

        {showMarkdown && (
          <div className="view-note">
            <MarkdownRenderer
              className="markdown-body"
              markdown={value || ''}
              options={{
                breaks: true,
                highlight: (string, lang) => {
                  return renderCodeBlock(string, lang);
                },
                linkify: true,
                linkTarget: '_blank',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
