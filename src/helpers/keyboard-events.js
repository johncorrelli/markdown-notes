import { KEY_S } from "keycode-js";

export const handleKeyDown = (keyboardEvent, keyListeners, onChange, onSave) => {
    // Cmd+S or Ctrl+S
    if (isKeyComboTracked('meta+s', keyListeners) && isKeyComboPressed('meta+s', keyboardEvent)) {
        onSave();
        keyboardEvent.preventDefault();
        return;
    }
}

const isKeyComboPressed = (keyCombo, keyboardEvent) => {
    const {keyCode, metaKey: isMetaKeyPressed} = keyboardEvent;

    switch (keyCombo) {
        case 'meta+s':
            return isMetaKeyPressed && keyCode === KEY_S;
        default:
            return false;
    }
}

const isKeyComboTracked = (combo, keyListeners) => {
    return keyListeners.indexOf(combo) > -1;
}