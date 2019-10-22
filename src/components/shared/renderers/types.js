//@flow

export type OnChangeCheckbox = (line: number, checkbox: boolean) => void;

export type Position = {
  line: number,
  column: number,
};

export type SourcePosition = {
  start: Position,
  end: Position,
};
