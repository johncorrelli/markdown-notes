// @flow
import React, {useState, useEffect} from 'react';
import Input from '../shared/input/Input';
import LayoutToggle from '../layout-toggle/LayoutToggle';
import {LAYOUTS} from '../../constants/layout';
import {EMPTY_CATEGORY_NAME} from '../../constants/categories';
import './note-header.scss';

type Props = {
  category: ?string,
  layout: string,
  onDelete: () => void,
  onSetLayout: (layout: string) => void,
  onUpdateNote: (object: Object) => void,
  title: ?string,
};

const NoteHeader = ({
  category,
  layout,
  onDelete,
  onSetLayout,
  onUpdateNote,
  title,
}: Props) => {
  const noteCategoryValue = category || EMPTY_CATEGORY_NAME;

  const [noteCategory, setNoteCategory] = useState(noteCategoryValue);
  const [noteTitle, setNoteTitle] = useState(title);

  useEffect(() => {
    setNoteCategory(noteCategoryValue);
    setNoteTitle(title);
  }, [noteCategoryValue, title]);

  const onDeleteWithConfirmation = () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this note?'
    );

    if (!confirm) {
      return;
    }

    onDelete();
  };

  const onSaveTitle = nextTitle => {
    setNoteTitle(nextTitle || '');
    onUpdateNote({title: nextTitle});
  };

  const onSaveCategory = nextCategory => {
    setNoteCategory(nextCategory);
    onUpdateNote({category: nextCategory});
  };

  return (
    <div className="note-header">
      <div className="title">
        <Input
          keyListeners={['enter', 'meta+s']}
          name="value"
          onChange={value => setNoteTitle(value)}
          onSave={value => onSaveTitle(value)}
          placeholderText="Set Title"
          value={noteTitle}
        />
      </div>
      <div className="category">
        <Input
          keyListeners={['enter', 'meta+s']}
          name="value"
          onChange={value => setNoteCategory(value)}
          onSave={value => onSaveCategory(value)}
          placeholderText="enter category"
          value={noteCategory}
        />
      </div>

      <button
        className="delete-note"
        onClick={() => onDeleteWithConfirmation()}
      >
        Delete
      </button>

      <LayoutToggle
        options={LAYOUTS}
        onChangeLayout={nextLayout => onSetLayout(nextLayout)}
        selectedLayout={layout}
      />
    </div>
  );
};

export default NoteHeader;
