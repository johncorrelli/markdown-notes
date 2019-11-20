import {
  getCurrentLineBeforeCursor,
  trimLine,
  firstCharacter,
} from './line-helpers';
import {insertText} from './insert-text';
import {removeText} from './remove-text';

const CHECKLIST_INCOMPLETE = '[ ]';
const CHECKLIST_COMPLETE = '[x]';

export const insertNewLineIfAddingList = (value, position) => {
  if (!isCurrentLineAListItem(value, position)) {
    return insertText(value, position, '\n');
  }

  // we call getCurrentLineBeforeCursor because the 'return' key hasn't inserted text yet
  const previousLine = getCurrentLineBeforeCursor(value, position);

  return insertNewListLine(value, position, previousLine);
};

export const isListItem = trimmedLine => {
  const firstTwoCharactersOfLine = trimmedLine.substring(0, 2);

  return firstTwoCharactersOfLine === '- ' || firstTwoCharactersOfLine === '+ ';
};

const isCurrentLineAListItem = (value, position) => {
  // getCurrentLineBeforeCursor is called because the event fires before the line is inserted.
  const previousLine = getCurrentLineBeforeCursor(value, position);
  const trimmedPreviousLine = previousLine.trimLeft();

  return isListItem(trimmedPreviousLine);
};

const insertNewListLine = (value, position, previousLine) => {
  const trimmedPreviousLine = trimLine(previousLine);
  const isPreviousLineEmptyListItem = trimmedPreviousLine.substring(1) === ' ';

  const isPreviousLineChecklistItem = isChecklist(trimmedPreviousLine);
  const checklistText = isPreviousLineChecklistItem
    ? ` ${CHECKLIST_INCOMPLETE}`
    : '';
  const isPreviousLineEmptyChecklistItem =
    isPreviousLineChecklistItem && isEmptyChecklistLine(trimmedPreviousLine);

  const isPreviousLineEmpty =
    isPreviousLineEmptyListItem || isPreviousLineEmptyChecklistItem;

  const listCharacter = firstCharacter(trimmedPreviousLine);
  const linePrefix = `\n${
    previousLine.split(listCharacter)[0]
  }${listCharacter}${checklistText} `;

  if (isPreviousLineEmpty) {
    return removePreviousEmptyLine(value, position, linePrefix);
  }

  return insertText(value, position, linePrefix);
};

const removePreviousEmptyLine = (value, position, linePrefix) => {
  const {newValue, selectionPosition} = removeText(value, position, linePrefix);

  return insertText(newValue, selectionPosition, '\n\n');
};

const isChecklist = trimmedLine => {
  return (
    isIncompleteChecklist(trimmedLine) || isCompletedChecklist(trimmedLine)
  );
};

const isIncompleteChecklist = trimmedLine => {
  return trimmedLine.substring(2, 5) === CHECKLIST_INCOMPLETE;
};

const isCompletedChecklist = trimmedLine => {
  return trimmedLine.substring(2, 5) === CHECKLIST_COMPLETE;
};

const isEmptyChecklistLine = trimmedLine => {
  return trimmedLine.substring(1, 7) === ` ${CHECKLIST_INCOMPLETE} `;
};
