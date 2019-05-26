// @flow
import React, {useEffect, useState} from 'react';
import Input from './Input';
import LayoutToggle from './LayoutToggle';
import MarkdownRenderer from 'react-markdown-renderer';
import {
  LAYOUTS,
  LAYOUT_EDIT,
  LAYOUT_MARKDOWN,
  LAYOUT_SPLIT,
} from '../constants/layout';
import '../styles/note.scss';
import 'github-markdown-css';

type Props = {
  note: {
    id: string,
    title: string,
    category: string,
    value: string,
  },
  onSave: (note: Object) => void,
};

const Note = ({note, onSave}: Props) => {
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

  const saveNote = () => {
    onSave({
      id,
      title,
      category,
      value,
    });
  };

  if (!note) {
    return (
      <div className="selected-note">
        <div className="modify-note" />
        <div className="view-note" />
      </div>
    );
  }

  const showEdit = layout === LAYOUT_EDIT || layout === LAYOUT_SPLIT;
  const showMarkdown = layout === LAYOUT_MARKDOWN || layout === LAYOUT_SPLIT;

  return (
    <div className={`selected-note ${layout}`}>
      {showEdit && (
        <div className="modify-note">
          <div className="title">
            Title:
            <br />
            <Input
              keyListeners={['enter', 'meta+s']}
              name="value"
              onChange={value => setTitle(value)}
              onSave={saveNote}
              value={title}
            />
          </div>
          <div className="category">
            Category:
            <br />
            <Input
              keyListeners={['enter', 'meta+s']}
              name="value"
              onChange={value => setCategory(value)}
              onSave={saveNote}
              value={category}
            />
          </div>
          <div className="edit-note">
            Note:
            <br />
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
        </div>
      )}

      {showMarkdown && (
        <div className="view-note">
          <MarkdownRenderer
            className="markdown-body"
            markdown={value || ''}
            options={{breaks: true, linkify: true, linkTarget: '_blank'}}
          />
        </div>
      )}

      <LayoutToggle
        options={LAYOUTS}
        onChangeLayout={nextLayout => setLayout(nextLayout)}
        selectedLayout={layout}
      />
    </div>
  );
};

export default Note;
