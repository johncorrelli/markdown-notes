// @flow
import React from 'react';
import classNames from 'classnames/bind';
import {
  LAYOUT_EDIT,
  LAYOUT_MARKDOWN,
  LAYOUT_SPLIT,
  LAYOUT_PRESENTER,
  LAYOUT_PRESENTER_DARK,
} from '../../constants/layout';
import './layout-toggle.scss';

type Props = {
  options: Array<string>,
  onChangeLayout: (layout: string) => void,
  selectedLayout: string,
};

const LayoutToggle = ({options, onChangeLayout, selectedLayout}: Props) => {
  const getLayoutIcon = layout => {
    switch (layout) {
      case LAYOUT_PRESENTER:
        return 'P1';
      case LAYOUT_PRESENTER_DARK:
        return 'P2';
      case LAYOUT_EDIT:
        return '_|';
      case LAYOUT_MARKDOWN:
        return '|_';
      case LAYOUT_SPLIT:
      default:
        return '_|_';
    }
  };

  return (
    <ul className="layout-toggle">
      {options.map((option, index) => {
        const styles = classNames({
          option,
          selected: option === selectedLayout,
        });

        return (
          <li
            key={index}
            className={styles}
            onClick={() => onChangeLayout(option)}
            title={option}
          >
            {getLayoutIcon(option)}
          </li>
        );
      })}
    </ul>
  );
};

export default LayoutToggle;
