import ReactMarkdown, {type Components} from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import CodeBlock from '../renderers/CodeBlock';
import ListItem from '../renderers/ListItem';
import {updateCheckbox} from './checkbox-helpers';

type Props = {
  value: string;
  onChange?: (value: string) => void;
};

const remarkPlugins = [remarkGfm, remarkBreaks];

const Markdown = ({value, onChange}: Props) => {
  const onChangeCheckbox = (line: number, checked: boolean) => {
    onChange?.(updateCheckbox(value, line, checked));
  };

  const components: Components = {
    a: ({node, ...props}) => (
      <a {...props} target="_blank" rel="noopener noreferrer" />
    ),
    // Task-list checkboxes are drawn by ListItem, so drop GFM's disabled input.
    input: ({node, ...props}) =>
      props.type === 'checkbox' ? null : <input {...props} />,
    li: ({node, ...props}) => (
      <ListItem node={node} onChangeCheckbox={onChangeCheckbox} {...props} />
    ),
    pre: CodeBlock,
  };

  return (
    <div className="markdown-body">
      <ReactMarkdown components={components} remarkPlugins={remarkPlugins}>
        {value}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
