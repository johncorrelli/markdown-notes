// @flow
import React from 'react';
import Input from './Input';
import LayoutToggle from './LayoutToggle';
import {LAYOUTS} from '../constants/layout';
import '../styles/note-header.scss';

type Props = {
  category: ?string,
  layout: string,
  onSave: () => void,
  onSetCategory: (category: string) => void,
  onSetLayout: (layout: string) => void,
  onSetTitle: (title: string) => void,
  title: ?string,
};

const NoteHeader = ({
  category,
  layout,
  onSave,
  onSetCategory,
  onSetLayout,
  onSetTitle,
  title,
}: Props) => {
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

      <LayoutToggle
        options={LAYOUTS}
        onChangeLayout={nextLayout => onSetLayout(nextLayout)}
        selectedLayout={layout}
      />
    </div>
  );
};

export default NoteHeader;
