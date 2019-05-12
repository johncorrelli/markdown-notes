import React from 'react';
import NotePreview from './NotePreview';
import '../styles/notes-list.scss';

const NotesList = (props) => {
    const {notes} = props;
    const onClick = (id) => {
        props.onClick(id);
    }

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
                onClick={props.onCreateNote}
                type="button"
                value="Create Note"
            />

            {notes.map(note => (
                <NotePreview
                    key={note.id}
                    note={note}
                    onClick={onClick}
                />
            ))}
        </div>
    );
};

export default NotesList;