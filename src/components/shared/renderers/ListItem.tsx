import type {Element} from 'hast';
import type {ComponentPropsWithoutRef} from 'react';
import Checkbox from './Checkbox';
import type {OnChangeCheckbox} from './types';

type Props = ComponentPropsWithoutRef<'li'> & {
  node?: Element;
  onChangeCheckbox: OnChangeCheckbox;
};

/**
 * remark-gfm marks a task-list item by giving it a disabled checkbox <input>,
 * either directly (tight lists) or inside its first paragraph (loose lists).
 */
const findTaskCheckbox = (node: Element | undefined): Element | undefined => {
  for (const child of node?.children ?? []) {
    if (child.type !== 'element') {
      continue;
    }
    if (child.tagName === 'input') {
      return child;
    }
    if (child.tagName === 'p') {
      return findTaskCheckbox(child);
    }
  }
  return undefined;
};

const ListItem = ({node, onChangeCheckbox, children, ...props}: Props) => {
  const checkbox = findTaskCheckbox(node);
  const line = node?.position?.start.line;

  if (checkbox && line !== undefined) {
    return (
      <Checkbox
        checked={Boolean(checkbox.properties.checked)}
        line={line}
        onChange={onChangeCheckbox}
      >
        {children}
      </Checkbox>
    );
  }

  return <li {...props}>{children}</li>;
};

export default ListItem;
