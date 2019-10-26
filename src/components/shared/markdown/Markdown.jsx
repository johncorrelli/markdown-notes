//@flow
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Code from '../renderers/Code';
import ListItem from '../renderers/ListItem';
import {updateCheckbox} from './checkbox-helpers';

type Props = {
  value: string,
  onChange: (value: string) => void,
};

const Markdown = (props: Props) => {
  const onChangeCheckbox = (line, checked) => {
    props.onChange(updateCheckbox(props.value, line, checked));
  };

  const renderListItem = props => (
    <ListItem {...props} onChangeCheckbox={onChangeCheckbox} />
  );

  return (
    <ReactMarkdown
      className="markdown-body"
      source={props.value}
      rawSourcePos={true}
      linkTarget="_blank"
      renderers={{code: Code, listItem: renderListItem}}
    />
  );
};

export default Markdown;
