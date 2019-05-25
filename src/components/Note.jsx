// @flow
import React, {useEffect, useState} from 'react';
import Input from './Input';
import MarkdownRenderer from 'react-markdown-renderer';
import '../styles/note.scss';
import 'github-markdown-css';

type Props = {
    note: {
        id: string,
        title: string,
        category: string,
        value: string
    },
    onSave: (note: Object) => void
}

const Note = ({note, onSave}: Props) => {
    const id = note && note.id;
    const [title, setTitle] = useState(null);
    const [category, setCategory] = useState(null);
    const [value, setValue] = useState(null);

    useEffect(
        () => {
            if (note) {
                setTitle(note.title);
                setCategory(note.category);
                setValue(note.value);
            }
        },
        [note]
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
                    <Input
                        name="value"
                        onChange={(value) => setTitle(value)}
                        onSave={saveNote}
                        value={title}
                    />
                </div>
                <div className="category">
                    Category:<br />
                    <Input
                        name="value"
                        onChange={(value) => setCategory(value)}
                        onSave={saveNote}
                        value={category}
                    />
                </div>
                <div className="note">
                    Note:<br />
                    <Input
                        name="value"
                        onChange={(value) => setValue(value)}
                        onSave={saveNote}
                        tagName="textarea"
                        value={value}
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