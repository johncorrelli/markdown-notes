import classNames from 'classnames';
import {
  LAYOUT_EDIT,
  LAYOUT_MARKDOWN,
  LAYOUT_SPLIT,
  type Layout,
} from '../../constants/layout';
import './layout-toggle.scss';

type Props = {
  options: readonly Layout[];
  onChangeLayout: (layout: Layout) => void;
  selectedLayout: Layout;
};

const getLayoutIcon = (layout: Layout) => {
  switch (layout) {
    case LAYOUT_EDIT:
      return '_|';
    case LAYOUT_MARKDOWN:
      return '|_';
    case LAYOUT_SPLIT:
    default:
      return '_|_';
  }
};

const LayoutToggle = ({options, onChangeLayout, selectedLayout}: Props) => {
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
