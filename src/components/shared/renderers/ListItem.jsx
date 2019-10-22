//@flow
import React from 'react';
import {listItem as defaultListItem} from 'react-markdown/lib/renderers';
import Checkbox from './Checkbox';
import type {OnChangeCheckbox, SourcePosition} from './types';

type Props = {
  checked?: boolean,
  children: any,
  onChangeCheckbox: OnChangeCheckbox,
  sourcePosition: SourcePosition,
};

const ListItem = ({onChangeCheckbox, sourcePosition, ...props}: Props) => {
  if (props.checked !== null && props.checked !== undefined) {
    return (
      <Checkbox
        onChange={onChangeCheckbox}
        sourcePosition={sourcePosition}
        {...props}
      />
    );
  }

  return defaultListItem(props);
};

export default ListItem;
