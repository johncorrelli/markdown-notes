import React from 'react';

const NotePreview = (props) => {
    const {note} = props;
    const onClick = () => {
        props.onClick(note.id);
    }

    if (!note.title) {
        return null;
    }

    return (
        <div
            className='note-preview'
            id={note.id}
            onClick={onClick}
        >
            <div className='note-title'>{note.title}</div>
            <div className='note-category'>{note.category}</div>
        </div>
    );
}

export default NotePreview;