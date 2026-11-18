// @vitest-environment node
import * as sass from 'sass';
import {DEFAULT_THEME, THEMES} from '../../constants/themes';

// The CSS custom properties the Sass themes compile to (vitest runs from the
// project root).
const css = sass.compileString(
  "@use 'themes'; @include themes.custom-properties;",
  {loadPaths: ['src/styles']}
).css;

const themeSelector = /:root\[data-theme=['"]?([\w-]+)['"]?\]/g;

it('defines exactly the themes the picker offers', () => {
  const compiled = [...css.matchAll(themeSelector)].map(match => match[1]);

  expect(compiled.sort()).toEqual(THEMES.map(theme => theme.id).sort());
});

it('applies the same default theme before one is picked', () => {
  expect(css).toMatch(
    new RegExp(`:root,\\s*:root\\[data-theme=['"]?${DEFAULT_THEME}['"]?\\]`)
  );
});
