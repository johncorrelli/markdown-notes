export const getCurrentLineBeforeCursor = (
  value: string,
  position: number
): string => {
  return getLine(value, position, 0);
};

export const trimLine = (line: string): string => {
  return line.trimStart();
};

export const firstCharacter = (line: string): string => {
  return line.substring(0, 1);
};

const getLine = (value: string, position: number, relativeLine: number) => {
  const noteValueBeforeCursor = value.substring(0, position).split('\n');
  const lastKey = noteValueBeforeCursor.length - 1;

  return noteValueBeforeCursor[lastKey + relativeLine];
};
