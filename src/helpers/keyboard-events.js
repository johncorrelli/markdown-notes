import { KEY_S, KEY_TAB, KEY_ENTER, KEY_RETURN } from "keycode-js";

const TAB = '    ';

export const handleKeyDown = (keyboardEvent, keyListeners, onChange, onSave) => {
    const {target} = keyboardEvent;
    const {value, selectionEnd} = target;

    const updateElementValue = (newValue, selectionPosition) => {
        updateElementState(target, newValue, selectionPosition, onChange);
        onSave();
        keyboardEvent.preventDefault();
    }

    // Cmd+S or Ctrl+S
    if (isKeyComboTracked('meta+s', keyListeners) && isKeyComboPressed('meta+s', keyboardEvent)) {
        onSave();
        keyboardEvent.preventDefault();
        return;
    }

    // Enter
    if (isKeyComboTracked('enter', keyListeners) && isKeyComboPressed('enter', keyboardEvent)) {
        onSave();
        return;
    }

    // Shift+Tab
    if (isKeyComboTracked('shift+tab', keyListeners) && isKeyComboPressed('shift+tab', keyboardEvent)) {
        try {
            const {newValue, selectionPosition} = removeText(value, selectionEnd, TAB);

            updateElementValue(newValue, selectionPosition);
        } catch (e) { }

        keyboardEvent.preventDefault();
        return;
    }

    // Tab
    if (isKeyComboTracked('tab', keyListeners) && isKeyComboPressed('tab', keyboardEvent)) {
        const {newValue, selectionPosition} = insertText(value, selectionEnd, TAB);

        updateElementValue(newValue, selectionPosition);
        return;
    }
}

const isKeyComboPressed = (keyCombo, keyboardEvent) => {
    const {keyCode, metaKey: isMetaKeyPressed} = keyboardEvent;

    switch (keyCombo) {
        case 'enter':
            return keyCode === KEY_ENTER || keyCode === KEY_RETURN;
        case 'meta+s':
            return isMetaKeyPressed && keyCode === KEY_S;
        case 'shift+tab':
            return keyboardEvent.shiftKey && keyCode === KEY_TAB;
        case 'tab':
            return keyCode === KEY_TAB;
        default:
            return false;
    }
}

const isKeyComboTracked = (combo, keyListeners) => {
    return keyListeners.indexOf(combo) > -1;
}

const insertText = (value, position, textToInsert) => {
    const selectionPosition = position + textToInsert.length;

    return {
        newValue: `${value.substring(0, position)}${textToInsert}${value.substring(position)}`,
        selectionPosition
    }
}

const removeText = (value, position, textToRemove) => {
    const beforePosition = value.substring(0, position);
    const textToRemoveLength = textToRemove.length;

    if (beforePosition.substring(beforePosition.length - textToRemoveLength) !== textToRemove) {
        throw new Error("Text to remove not found before cursor.");
    }

    const trimmedBefore = value.substring(0, position - textToRemoveLength);
    const selectionPosition = position - textToRemove.length;

    return {
        newValue: `${trimmedBefore}${value.substring(position)}`,
        selectionPosition
    }
}

const updateElementState = (target, newValue, selectionPosition, onChange) => {
    onChange(newValue);
    setTimeout(() => { target.setSelectionRange(selectionPosition, selectionPosition); }, 1);
}