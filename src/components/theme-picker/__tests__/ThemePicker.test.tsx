import {fireEvent, render, screen} from '@testing-library/react';
import {THEMES} from '../../../constants/themes';
import {getSavedTheme, saveTheme} from '../../../helpers/themes';
import ThemePicker from '../ThemePicker';

afterEach(() => {
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
});

it('shows a pill for every theme', () => {
  render(<ThemePicker />);

  const group = screen.getByRole('radiogroup', {name: 'Theme'});
  const pills = group.querySelectorAll('.theme-picker__pill');

  expect([...pills].map(pill => pill.textContent)).toEqual(
    THEMES.map(theme => theme.name)
  );
});

it('selects the saved theme', () => {
  saveTheme('teamgantt');
  render(<ThemePicker />);

  expect(screen.getByRole('radio', {name: 'TeamGantt'})).toHaveProperty(
    'checked',
    true
  );
  expect(screen.getByText('TeamGantt').className).toContain(
    'theme-picker__pill--selected'
  );
});

it('applies and remembers the picked theme', () => {
  render(<ThemePicker />);

  fireEvent.click(screen.getByRole('radio', {name: 'TeamGantt'}));

  expect(document.documentElement.dataset.theme).toBe('teamgantt');
  expect(getSavedTheme()).toBe('teamgantt');
  expect(screen.getByRole('radio', {name: 'TeamGantt'})).toHaveProperty(
    'checked',
    true
  );
});
