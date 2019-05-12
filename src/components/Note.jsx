import React, {useEffect, useState} from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import '../styles/note.scss';
import 'github-markdown-css';

const Note = (props) => {
    const {note, onSave} = props;

    const id = note && note.id;
    const [title, setTitle] = useState(null);
    const [category, setCategory] = useState(null);
    const [value, setValue] = useState(null);

    useEffect(
        () => {
            if (props.note) {
                setTitle(props.note.title || '');
                setCategory(props.note.category || '');
                setValue(props.note.value || '');
            }
        },
        [props.note]
    );

    const saveNote = () => {
        onSave({
            id,
            title,
            category,
            value
        });
    }

    if (!note) {
        return (
            <div className="selected-note">
                <div className="modify-note"></div>
                <div className="view-note"></div>
            </div>
        );
    }

    return (
        <div className="selected-note">
            <div className="modify-note">
                <div className="title">
                    Title:<br />
                    <input
                        name="title"
                        onBlur={saveNote}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title || ''}
                    />
                </div>
                <div className="category">
                    Category:<br />
                    <input
                        name="category"
                        onBlur={saveNote}
                        onChange={(e) => setCategory(e.target.value)}
                        value={category || ''}
                    />
                </div>
                <div className="note">
                    Note:<br />
                    <textarea
                        name="value"
                        onBlur={saveNote}
                        onChange={(e) => setValue(e.target.value)}
                        value={value || ''}
                    />
                </div>
            </div>
            <div className="view-note">
                <MarkdownRenderer
                    className='markdown-body'
                    markdown={value || ''}
                    options={{breaks: true, linkify: true, linkTarget: '_blank'}}
                />

            </div>
        </div>
    );
};

export default Note;