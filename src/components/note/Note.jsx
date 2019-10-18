// @flow
import React, {useEffect, useState} from 'react';
import Input from '../shared/input/Input';
import NoteHeader from './NoteHeader';
import MarkdownRenderer from 'react-markdown-renderer';
import {
  LAYOUT_EDIT,
  LAYOUT_MARKDOWN,
  LAYOUT_SPLIT,
  LAYOUT_PRESENTER,
} from '../../constants/layout';
import syntaxHighlighting from '../../helpers/syntax-highlighting';
import {
  useWindowEvent,
  handlePresenterKeyPress,
} from '../../helpers/presenter-events';

import './note.scss';
import 'github-markdown-css';

type Props = {
  layout: string,
  note: {
    id: string,
    title: string,
    category: string,
    value: string,
  },
  noteCategories: Array<Object>,
  onDelete: (note: Object) => void,
  onLayoutChange: (layout: string) => void,
  onSave: (note: Object) => void,
};

const Note = ({
  layout,
  note,
  noteCategories,
  onDelete,
  onLayoutChange,
  onSave,
}: Props) => {
  const noteValue = note && note.value;
  const [value, setValue] = useState(noteValue || '');

  const isPresenter = layout === LAYOUT_PRESENTER;
  const showEdit =
    layout === LAYOUT_EDIT || layout === LAYOUT_SPLIT || isPresenter;
  const showMarkdown =
    layout === LAYOUT_MARKDOWN || layout === LAYOUT_SPLIT || isPresenter;

  const leftRef = React.createRef();
  const rightRef = React.createRef();

  useEffect(() => {
    setValue(noteValue || '');
  }, [noteValue]);

  const onPresenterKeyPress = event => {
    if (!isPresenter) {
      return;
    }
    handlePresenterKeyPress(event, leftRef, rightRef);
  };

  useWindowEvent('keydown', onPresenterKeyPress);

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

  const renderCodeBlock = (string, lang) => {
    return syntaxHighlighting(string, lang);
  };

  if (!note) {
    return <div className="selected-note" />;
  }

  const displayEdit = () => {
    return (
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
    );
  };

  const displayMarkdown = () => {
    return (
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
    );
  };

  return (
    <div className={`selected-note ${layout}`}>
      <NoteHeader
        category={note && note.category}
        layout={layout}
        noteCategories={noteCategories}
        onDelete={onDeleteNote}
        onSetLayout={nextLayout => onLayoutChange(nextLayout)}
        onUpdateNote={onUpdateNote}
        title={note && note.title}
      />

      <div className="note-details">
        {showEdit && (
          <div className="column left-column" ref={leftRef}>
            {!isPresenter && displayEdit()}
            {isPresenter && displayMarkdown()}
          </div>
        )}

        {showMarkdown && (
          <div className="column right-column" ref={rightRef}>
            {showMarkdown && displayMarkdown()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
