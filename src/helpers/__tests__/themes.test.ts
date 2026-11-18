import {DEFAULT_THEME, THEMES} from '../../constants/themes';
import {
  applyTheme,
  getSavedTheme,
  isTheme,
  saveTheme,
  THEME_STORAGE_KEY,
} from '../themes';

afterEach(() => {
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
});

describe('getSavedTheme', () => {
  it('returns the default theme when none was saved', () => {
    expect(getSavedTheme()).toBe(DEFAULT_THEME);
  });

  it('returns the saved theme', () => {
    saveTheme('teamgantt');

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('teamgantt');
    expect(getSavedTheme()).toBe('teamgantt');
  });

  it('ignores a saved theme that no longer exists', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'retired-theme');

    expect(getSavedTheme()).toBe(DEFAULT_THEME);
  });
});

describe('isTheme', () => {
  it('accepts every theme id', () => {
    THEMES.forEach(({id}) => expect(isTheme(id)).toBe(true));
  });

  it('rejects anything else', () => {
    expect(isTheme('retired-theme')).toBe(false);
    expect(isTheme(null)).toBe(false);
  });
});

describe('applyTheme', () => {
  it('sets data-theme on the html element', () => {
    applyTheme('teamgantt');

    expect(document.documentElement.dataset.theme).toBe('teamgantt');
  });
});
