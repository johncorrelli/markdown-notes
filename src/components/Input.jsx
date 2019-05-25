// @flow
import React from 'react';

type Props = {
    name: String,
    onChange: (e) => void,
    onSave: () => void,
    tagName: String,
    value: string
}

const Input = ({name, onChange, onSave, tagName, value}: Props) => {
    const TagName = tagName || 'input';

    return (
        <TagName
            name={name}
            onBlur={onSave}
            onChange={(e) => onChange(e.target.value)}
            value={value || ''}
        />
    )
}

export default Input;