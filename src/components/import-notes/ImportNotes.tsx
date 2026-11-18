import {useState} from 'react';
import {EMPTY_CATEGORY_NAME} from '../../constants/categories';
import Markdown from '../shared/markdown/Markdown';
import type {NoteDraft} from '../../types';

import './import-notes.scss';

type Props = {
  onNotImportingNotes: () => void;
  onSaveNote: (note: NoteDraft) => void;
};

const importNoteShape = `\`\`\`json
[
  {
    "title": "My Note About Javascript",
    "category": "Dev Notes",
    "value": "Javascript is fun!"
  },
  {
    "title": "My Note About React",
    "category": "Dev Notes",
    "value": "React is fun!"
  }
]
\`\`\`
`;

const ImportNotes = ({onNotImportingNotes, onSaveNote}: Props) => {
  const [newNotes, setNewNotes] = useState('');

  const saveNewNote = () => {
    const errorMessage =
      'Invalid Format, please see the directions to the left.';
    let notesToImport: unknown;

    try {
      notesToImport = JSON.parse(newNotes);
    } catch {
      window.alert(errorMessage);
      return;
    }

    if (!Array.isArray(notesToImport)) {
      window.alert(errorMessage);
      return;
    }

    notesToImport.forEach((note: NoteDraft) => {
      const newNote = {
        title: note.title || 'Unset Title',
        category: note.category || EMPTY_CATEGORY_NAME,
        value: note.value || '',
      };

      onSaveNote(newNote);
    });

    window.alert('Your notes have been saved. You can close this window now.');
  };

  const renderInstructions = () => {
    return (
      <div className="instructions">
        <h1>Import Notes</h1>
        <p>
          Importing notes is simple. Just enter a JSON array like the sample
          below...
        </p>

        <Markdown value={importNoteShape} />

        <p>
          You can paste your json array in the white space to the right. Each
          note imported will be imported as new note and assigned a new id.
        </p>

        <button className="secondary-button full" onClick={saveNewNote}>
          Import Notes
        </button>

        <button className="secondary-button full" onClick={onNotImportingNotes}>
          Close
        </button>
      </div>
    );
  };

  return (
    <div className="import-notes">
      {renderInstructions()}
      <textarea
        className="import"
        onChange={e => setNewNotes(e.target.value)}
      />
    </div>
  );
};

export default ImportNotes;
