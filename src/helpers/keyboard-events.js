import { KEY_S, KEY_ENTER, KEY_RETURN } from "keycode-js";

export const handleKeyDown = (keyboardEvent, keyListeners, onChange, onSave) => {
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
}

const isKeyComboPressed = (keyCombo, keyboardEvent) => {
    const {keyCode, metaKey: isMetaKeyPressed} = keyboardEvent;

    switch (keyCombo) {
        case 'enter':
            return keyCode === KEY_ENTER || keyCode === KEY_RETURN;
        case 'meta+s':
            return isMetaKeyPressed && keyCode === KEY_S;
        default:
            return false;
    }
}

const isKeyComboTracked = (combo, keyListeners) => {
    return keyListeners.indexOf(combo) > -1;
}