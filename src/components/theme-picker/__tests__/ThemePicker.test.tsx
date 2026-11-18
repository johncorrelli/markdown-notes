import {render, screen} from '@testing-library/react';
import {THEMES} from '../../../constants/themes';
import {saveTheme} from '../../../helpers/themes';
import ThemePicker from '../ThemePicker';

afterEach(() => window.localStorage.clear());

it('shows a pill for every theme', () => {
  render(<ThemePicker />);

  const group = screen.getByRole('radiogroup', {name: 'Theme'});
  const pills = group.querySelectorAll('.theme-picker__pill');

  expect([...pills].map(pill => pill.textContent)).toEqual(
    THEMES.map(theme => theme.name)
  );
});

it('selects the saved theme', () => {
  saveTheme('nord');
  render(<ThemePicker />);

  expect(screen.getByRole('radio', {name: 'Nord'})).toHaveProperty(
    'checked',
    true
  );
  expect(screen.getByText('Nord').className).toContain(
    'theme-picker__pill--selected'
  );
});
