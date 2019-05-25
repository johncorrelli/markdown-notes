// @flow
import React from 'react';
import {handleKeyDown} from '../helpers/keyboard-events';

type Props = {
    name: String,
    keyListeners: Array,
    onChange: (e) => void,
    onSave: () => void,
    tagName: String,
    value: string
}

const Input = ({name, keyListeners, onChange, onSave, tagName, value}: Props) => {
    const TagName = tagName || 'input';

    return (
        <TagName
            name={name}
            onBlur={onSave}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, keyListeners, onChange, onSave)}
            value={value || ''}
        />
    )
}

export default Input;