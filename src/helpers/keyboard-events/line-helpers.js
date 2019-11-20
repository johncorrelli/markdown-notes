export const getCurrentLineBeforeCursor = (value, position) => {
  return getLine(value, position, 0);
};

export const trimLine = line => {
  return line.trimLeft();
};

export const firstCharacter = line => {
  return line.substring(0, 1);
};

const getLine = (value, position, relativeLine) => {
  const noteValueBeforeCursor = value.substring(0, position).split('\n');
  const lastKey = noteValueBeforeCursor.length - 1;

  return noteValueBeforeCursor[lastKey + relativeLine];
};
