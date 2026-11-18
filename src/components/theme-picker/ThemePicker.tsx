import {useId, useState} from 'react';
import classNames from 'classnames';
import {THEMES, type Theme} from '../../constants/themes';
import {applyTheme, getSavedTheme, saveTheme} from '../../helpers/themes';
import './theme-picker.scss';

/** One pill per theme. Each pill wraps a radio button, so it works by keyboard. */
const ThemePicker = () => {
  const [theme, setTheme] = useState(getSavedTheme);
  const id = useId();

  const pickTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  };

  return (
    <div
      aria-labelledby={`${id}-label`}
      className="theme-picker"
      role="radiogroup"
    >
      <span className="theme-picker__label" id={`${id}-label`}>
        Theme
      </span>
      {THEMES.map(({id: themeId, name}) => (
        <label
          className={classNames('theme-picker__pill', {
            'theme-picker__pill--selected': themeId === theme,
          })}
          key={themeId}
        >
          <input
            checked={themeId === theme}
            name={`${id}-theme`}
            onChange={() => pickTheme(themeId)}
            type="radio"
            value={themeId}
          />
          {name}
        </label>
      ))}
    </div>
  );
};

export default ThemePicker;
