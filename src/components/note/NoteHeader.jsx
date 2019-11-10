// @flow
import React, {useState, useEffect} from 'react';
import Input from '../shared/input/Input';
import LayoutToggle from '../layout-toggle/LayoutToggle';
import CategorySelector from '../category-selector/CategorySelector';
import {LAYOUTS} from '../../constants/layout';
import {EMPTY_CATEGORY_NAME} from '../../constants/categories';
import './note-header.scss';

type Props = {
  category: ?string,
  layout: string,
  noteCategories: Array<Object>,
  onDelete: () => void,
  onSetLayout: (layout: string) => void,
  onUpdateNote: (object: Object) => void,
  title: ?string,
};

const NoteHeader = ({
  category,
  layout,
  noteCategories,
  onDelete,
  onSetLayout,
  onUpdateNote,
  title,
}: Props) => {
  const noteCategoryValue = category || EMPTY_CATEGORY_NAME;
  const hasNoteCategories = noteCategories.filter(n => n !== null).length > 0;

  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState(noteCategoryValue);
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
    if (!nextCategory) {
      setIsAddingNewCategory(true);
      return;
    }

    setNoteCategory(nextCategory);
    onUpdateNote({category: nextCategory});
  };

  const onSaveNewCategory = newCategory => {
    const updatedCategoryName =
      newCategory !== '' ? newCategory : EMPTY_CATEGORY_NAME;

    setNoteCategory(updatedCategoryName);
    onUpdateNote({category: updatedCategoryName});
    setIsAddingNewCategory(false);
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
        {!isAddingNewCategory && hasNoteCategories ? (
          <CategorySelector
            blankOption="- add new category -"
            categories={noteCategories}
            onChange={nextCategory => onSaveCategory(nextCategory)}
            value={noteCategory}
          />
        ) : (
          <Input
            keyListeners={['enter', 'meta+s']}
            name="value"
            onChange={value => setNewCategory(value)}
            onSave={value => onSaveNewCategory(value)}
            placeholderText="enter category"
            value={newCategory}
          />
        )}
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
