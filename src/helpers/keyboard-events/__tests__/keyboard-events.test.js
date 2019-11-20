import * as fn from '../keyboard-events';
import {KEY_B, KEY_I, KEY_ENTER, KEY_TAB, KEY_BACK_SPACE} from 'keycode-js';
import {TAB} from '../tab-key';
import {
  KeyboardEventResponse,
  IS_HANDLED,
  IS_NOT_HANDLED,
} from '../keyboard-event-response';

describe('keyboard-events.js', () => {
  const keyboardEvent = {
    target: {
      value: 'this is my value',
      selectionStart: 5,
      selectionEnd: 7,
    },
    ctrlKey: false,
    keyCode: 0,
    metaKey: false,
    shiftKey: false,
    preventDefault: () => {
      return null;
    },
  };
  const keyListeners = [
    'enter',
    'meta+b',
    'meta+i',
    'meta+s',
    'shift+tab',
    'tab',
  ];

  describe('handleKeyDown', () => {
    it('should ignore characters that are not tracked', () => {
      const value = 'test';

      const keyboardEventTest = {
        ...keyboardEvent,
        target: {
          value: value,
          selectionStart: value.length,
          selectionEnd: value.length,
        },
        keyCode: 0,
      };

      const call = fn.handleKeyDown(keyboardEventTest, keyListeners);
      const returnValue = new KeyboardEventResponse(
        value,
        value.length,
        IS_NOT_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    describe('non list items', () => {
      it('should handle meta+b to wrap with bold syntax', () => {
        const keyboardEventTest = {
          ...keyboardEvent,
          metaKey: true,
          keyCode: KEY_B,
        };

        const nextValue = 'this **is** my value';
        const nextPosition = keyboardEventTest.target.selectionEnd + 2; // 2 accounts for the first `*`s

        const call = fn.handleKeyDown(keyboardEventTest, keyListeners);
        const returnValue = new KeyboardEventResponse(
          nextValue,
          nextPosition,
          IS_HANDLED
        );

        expect(call).toStrictEqual(returnValue);
      });

      it('should handle meta+i to wrap with italic syntax', () => {
        const keyboardEventTest = {
          ...keyboardEvent,
          metaKey: true,
          keyCode: KEY_I,
        };

        const call = fn.handleKeyDown(keyboardEventTest, keyListeners);
        const returnValue = new KeyboardEventResponse(
          'this *is* my value',
          keyboardEventTest.target.selectionEnd + 1, // 1 accounts for the first `*`
          IS_HANDLED
        );

        expect(call).toStrictEqual(returnValue);
      });

      it('should add a new line', () => {
        const originalValue = keyboardEvent.target.value;
        const expectedValue = `${originalValue}\n`;

        const keyboardEventTest = {
          ...keyboardEvent,
          target: {
            value: originalValue,
            selectionStart: originalValue.length,
            selectionEnd: originalValue.length,
          },
          keyCode: KEY_ENTER,
        };

        const call = fn.handleKeyDown(keyboardEventTest, keyListeners);
        const returnValue = new KeyboardEventResponse(
          expectedValue,
          expectedValue.length,
          IS_HANDLED
        );

        expect(call).toStrictEqual(returnValue);
      });

      it('should handle shift+tab to remove the previous 4 spaces', () => {
        const expectedValue = 'line of text';
        const originalValue = `${expectedValue}${TAB}`;

        const keyboardEventTest = {
          ...keyboardEvent,
          target: {
            value: originalValue,
            selectionStart: originalValue.length,
            selectionEnd: originalValue.length,
          },
          shiftKey: true,
          keyCode: KEY_TAB,
        };

        const call = fn.handleKeyDown(keyboardEventTest, keyListeners);
        const returnValue = new KeyboardEventResponse(
          expectedValue,
          expectedValue.length,
          IS_HANDLED
        );

        expect(call).toStrictEqual(returnValue);
      });
    });

    it('should handle tab to insert 4 spaces', () => {
      const originalValue = 'line of text';
      const expectedValue = `${originalValue}${TAB}`;

      const keyboardEventTest = {
        ...keyboardEvent,
        target: {
          value: originalValue,
          selectionStart: originalValue.length,
          selectionEnd: originalValue.length,
        },
        keyCode: KEY_TAB,
      };

      const call = fn.handleKeyDown(keyboardEventTest, keyListeners);
      const returnValue = new KeyboardEventResponse(
        expectedValue,
        expectedValue.length,
        IS_HANDLED
      );

      expect(call).toStrictEqual(returnValue);
    });

    describe('list items', () => {
      describe('onEnter', () => {
        it('should add a list item when previous line is a list item', () => {
          const originalValue = '- item 1';
          const expectedValue = `${originalValue}\n- `;

          const keyboardEventTest = {
            ...keyboardEvent,
            target: {
              value: originalValue,
              selectionStart: originalValue.length,
              selectionEnd: originalValue.length,
            },
            keyCode: KEY_ENTER,
          };

          const call = fn.handleKeyDown(keyboardEventTest, keyListeners);
          const returnValue = new KeyboardEventResponse(
            expectedValue,
            expectedValue.length,
            IS_HANDLED
          );

          expect(call).toStrictEqual(returnValue);
        });

        it('should remove the previous line if it was an empty list item', () => {
          const originalValue = '- item 1\n- ';
          const expectedValue = '- item 1\n\n';

          const keyboardEventTest = {
            ...keyboardEvent,
            target: {
              value: originalValue,
              selectionStart: originalValue.length,
              selectionEnd: originalValue.length,
            },
            keyCode: KEY_ENTER,
          };

          const call = fn.handleKeyDown(keyboardEventTest, keyListeners);
          const returnValue = new KeyboardEventResponse(
            expectedValue,
            expectedValue.length,
            IS_HANDLED
          );

          expect(call).toStrictEqual(returnValue);
        });

        it('should add a checklist item when previous line is a checklist item', () => {
          const originalValue = '- [ ] item 1';
          const expectedValue = `${originalValue}\n- [ ] `;

          const keyboardEventTest = {
            ...keyboardEvent,
            target: {
              value: originalValue,
              selectionStart: originalValue.length,
              selectionEnd: originalValue.length,
            },
            keyCode: KEY_ENTER,
          };

          const call = fn.handleKeyDown(keyboardEventTest, keyListeners);
          const returnValue = new KeyboardEventResponse(
            expectedValue,
            expectedValue.length,
            IS_HANDLED
          );

          expect(call).toStrictEqual(returnValue);
        });
      });

      it('should handle shift+tab to outdent a list item', () => {
        const expectedValue = '- list item';
        const originalValue = `${TAB}${expectedValue}`;

        const keyboardEventTest = {
          ...keyboardEvent,
          target: {
            value: originalValue,
            selectionStart: originalValue.length,
            selectionEnd: originalValue.length,
          },
          shiftKey: true,
          keyCode: KEY_TAB,
        };

        const call = fn.handleKeyDown(keyboardEventTest, keyListeners);
        const returnValue = new KeyboardEventResponse(
          expectedValue,
          expectedValue.length,
          IS_HANDLED
        );

        expect(call).toStrictEqual(returnValue);
      });

      it('should handle tab to indent a list item', () => {
        const originalValue = '- list item';
        const expectedValue = `${TAB}${originalValue}`;

        const keyboardEventTest = {
          ...keyboardEvent,
          target: {
            value: originalValue,
            selectionStart: originalValue.length,
            selectionEnd: originalValue.length,
          },
          keyCode: KEY_TAB,
        };

        const call = fn.handleKeyDown(keyboardEventTest, keyListeners);
        const returnValue = new KeyboardEventResponse(
          expectedValue,
          expectedValue.length,
          IS_HANDLED
        );

        expect(call).toStrictEqual(returnValue);
      });
    });
  });

  describe('isKeyComboPressed', () => {
    it('should return true for tracked key combinations', () => {
      const isKeyComboPressed = fn.isKeyComboPressed('enter', {
        ...keyboardEvent,
        keyCode: KEY_ENTER,
      });
      expect(isKeyComboPressed).toBe(true);
    });

    it('should return false for untracked key combinations', () => {
      const isKeyComboPressed = fn.isKeyComboPressed('backspace', {
        ...keyboardEvent,
        keyCode: KEY_BACK_SPACE,
      });
      expect(isKeyComboPressed).toBe(false);
    });
  });
});
