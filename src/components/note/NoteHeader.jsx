// @flow
import React from 'react';
import Input from '../shared/input/Input';
import LayoutToggle from '../layout-toggle/LayoutToggle';
import {LAYOUTS} from '../../constants/layout';
import './note-header.scss';

type Props = {
  category: ?string,
  layout: string,
  onDelete: () => void,
  onSave: () => void,
  onSetCategory: (category: string) => void,
  onSetLayout: (layout: string) => void,
  onSetTitle: (title: string) => void,
  title: ?string,
};

const NoteHeader = ({
  category,
  layout,
  onDelete,
  onSave,
  onSetCategory,
  onSetLayout,
  onSetTitle,
  title,
}: Props) => {
  const onDeleteWithConfirmation = () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this note?'
    );

    if (!confirm) {
      return;
    }

    onDelete();
  };

  return (
    <div className="note-header">
      <div className="title">
        <Input
          keyListeners={['enter', 'meta+s']}
          name="value"
          onChange={value => onSetTitle(value)}
          onSave={onSave}
          placeholderText="Set Title"
          value={title}
        />
      </div>
      <div className="category">
        <Input
          keyListeners={['enter', 'meta+s']}
          name="value"
          onChange={value => onSetCategory(value)}
          onSave={onSave}
          placeholderText="enter category"
          value={category}
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
