//@flow
const splitMarkdown = (markdown: string): Array<string> => markdown.split('\n');

const joinMarkdown = (markdownArray: Array<string>): string =>
  markdownArray.join('\n');

const generateCheckbox = (checked: boolean): string =>
  checked ? '- [x]' : '- [ ]';

export const updateCheckbox = (
  markdown: string,
  line: number,
  checked: boolean
): string => {
  const lines = splitMarkdown(markdown);

  lines[line - 1] = lines[line - 1].replace(
    generateCheckbox(!checked),
    generateCheckbox(checked)
  );

  return joinMarkdown(lines);
};
