import {useState} from 'react';
import type {FuseOptionKey} from 'fuse.js';
import CategorySelector from '../category-selector/CategorySelector';
import NoteCategory from './NoteCategory';
import {displayNotes} from '../../helpers/display-notes';
import {getNoteCategories, getNotesByCategory} from '../../helpers/categories';
import DropboxBackup from '../dropbox-backup/DropboxBackup';
import ThemePicker from '../theme-picker/ThemePicker';
import type {Note} from '../../types';
import './notes-list.scss';

type Props = {
  downloadNotesUrl: string;
  noteCategories: Array<string | null>;
  notes: Note[];
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
  onImportNotes: () => void;
  selectedNoteId: string | null | undefined;
};

const searchKeys: FuseOptionKey<Note>[] = [
  {name: 'title', weight: 0.7},
  {name: 'value', weight: 0.3},
];

const NotesList = ({
  downloadNotesUrl,
  noteCategories,
  notes,
  onSelectNote,
  onCreateNote,
  onImportNotes,
  selectedNoteId,
}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchString, setSearchString] = useState('');

  const filteredNotes = displayNotes(
    notes,
    selectedCategory,
    searchString,
    searchKeys
  );

  const filteredNoteCategories = getNoteCategories(filteredNotes);

  return (
    <div className="notes-list">
      <div className="header">
        <input
          className="create-note"
          onClick={onCreateNote}
          type="button"
          value="Create Note"
        />

        <CategorySelector
          blankOption="All Categories"
          categories={noteCategories}
          onChange={selected => setSelectedCategory(selected)}
          value={selectedCategory}
        />

        <input
          className="search"
          name="searchString"
          onChange={e => setSearchString(e.target.value)}
          placeholder="Enter search..."
          value={searchString}
        />
      </div>

      <div className="scrollable-content">
        {filteredNoteCategories.map((category, index) => {
          return (
            <NoteCategory
              category={category}
              key={index}
              notes={getNotesByCategory(filteredNotes, category)}
              onSelectNote={noteId => onSelectNote(noteId)}
              selectedNoteId={selectedNoteId}
            />
          );
        })}
      </div>

      <div className="footer">
        <ThemePicker />
        <button className="secondary-button" onClick={onImportNotes}>
          Import
        </button>
        <a
          className="secondary-button"
          download="markdown-notes.json"
          href={downloadNotesUrl}
        >
          Export
        </a>
        <DropboxBackup notes={notes} />
      </div>
    </div>
  );
};

export default NotesList;
