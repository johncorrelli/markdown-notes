// @flow
import React from 'react';

type Props = {
    note: {
        id: string,
        title: string,
        category: string,
        value: string
    },
    onClick: (id: string) => void,
}

const NotePreview = ({note, onClick}: Props) => {
    if (!note.title) {
        return null;
    }

    return (
        <div
            className='note-preview'
            id={note.id}
            onClick={() => onClick(note.id)}
        >
            <div className='note-title'>{note.title}</div>
            <div className='note-category'>{note.category}</div>
        </div>
    );
}

export default NotePreview;