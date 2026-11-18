import {DEFAULT_THEME, THEMES, type Theme} from '../constants/themes';

export const THEME_STORAGE_KEY = 'theme';

export const isTheme = (value: unknown): value is Theme =>
  THEMES.some(theme => theme.id === value);

/** The theme last picked in this browser, or the default. */
export const getSavedTheme = (): Theme => {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);

    return isTheme(saved) ? saved : DEFAULT_THEME;
  } catch {
    // Storage can be unavailable, e.g. when site data is blocked.
    return DEFAULT_THEME;
  }
};

export const saveTheme = (theme: Theme) => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Not remembered, but the theme still applies for this visit.
  }
};

/** Switches the page to the theme's colors and fonts (see styles/themes). */
export const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
};
