// @flow
import React from 'react';
import NotePreview from './NotePreview';
import '../styles/notes-list.scss';

type Props = {
    notes: Array<Object>,
    onClick: (id: string) => void,
    onCreateNote: () => void,
}

const NotesList = ({notes, onClick, onCreateNote}: Props) => {
    notes.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        if (aTitle < bTitle) {
            return -1;
        }
        if (aTitle > bTitle) {
            return 1;
        }
        return 0;
    });

    return (
        <div className="notes-list">
            <input
                className="create-note"
                onClick={onCreateNote}
                type="button"
                value="Create Note"
            />

            {notes.map(note => (
                <NotePreview
                    key={note.id}
                    note={note}
                    onClick={() => onClick(note.id)}
                />
            ))}
        </div>
    );
};

export default NotesList;