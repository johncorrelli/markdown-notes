// @flow
import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {EMPTY_CATEGORY_NAME} from '../../constants/categories';
import Code from '../shared/renderers/Code';

import './import-notes.scss';

type Props = {
  onNotImportingNotes: () => void,
  onSaveNote: (note: Object) => void,
};

const ImportNotes = ({onNotImportingNotes, onSaveNote}: Props) => {
  const importNoteShape =
    // eslint-disable-next-line
    '```json \n \
[ \n \
  {\n \
    "title": "My Note About Javascript", \n \
    "category": "Dev Notes", \n \
    "value": "Javascript is fun!" \n \
  },\n \
  {\n \
    "title": "My Note About React", \n \
    "category": "Dev Notes", \n \
    "value": "React is fun!" \n \
  }\n \
]\n \
';

  const [newNotes, setNewNotes] = useState('');

  const saveNewNote = () => {
    const errorMessage =
      'Invalid Format, please see the directions to the left.';
    let notesToImport = null;

    try {
      notesToImport = JSON.parse(newNotes);
    } catch {
      window.alert(errorMessage);
      return;
    }

    if (
      typeof notesToImport !== 'object' ||
      notesToImport === '' ||
      notesToImport === null
    ) {
      window.alert(errorMessage);
      return;
    }

    notesToImport.map(note => {
      const newNote = {
        title: note.title || 'Unset Title',
        category: note.category || EMPTY_CATEGORY_NAME,
        value: note.value || '',
      };

      onSaveNote(newNote);

      return true;
    });

    window.alert('Your notes have been saved. You can close this window now.');
  };

  const importNotePreview = () => {
    return (
      <ReactMarkdown
        className="markdown-body"
        source={importNoteShape}
        renderers={{
          code: Code,
        }}
      />
    );
  };

  const renderInstructions = () => {
    return (
      <div className="instructions">
        <h1>Import Notes</h1>
        <p>
          Importing notes is simple. Just enter a JSON array like the sample
          below...
        </p>

        {importNotePreview()}

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
