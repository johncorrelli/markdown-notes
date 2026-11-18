# Markdown Notes

A small markdown note-taking app. Notes are stored in the browser (IndexedDB via
[localForage](https://github.com/localForage/localForage)) and can be exported,
imported, or backed up to Dropbox.

Built with React 19, TypeScript, Vite, and Sass.

## Getting started

Requires Node.js 22.12 or newer.

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000). The dev server stays on
port 3000 because that's the redirect URI registered for the Dropbox backup.

## Themes

Colors and fonts come from the themes in `src/styles/themes/`. Each theme is a
Sass map of settings (`text-color`, `sidebar-background`, `code-font-family`,
...) that compiles to CSS custom properties, and styles use them through the
variables in `src/styles/variables.scss`. The picker at the bottom of the
sidebar switches themes and remembers the choice in the browser. Nord is the
default.

To add a theme:

1. Copy `src/styles/themes/_nord.scss` and change its values. The build fails
   if a theme leaves out a setting or adds one the others don't have.
2. Register it in `$themes` in `src/styles/themes/_index.scss` and in `THEMES`
   in `src/constants/themes.ts`. A test checks that the two lists match.
3. If it uses web fonts, load them, the way `index.html` loads Fira Mono from
   Typekit.

## Scripts

| Command             | What it does                                                            |
| ------------------- | ----------------------------------------------------------------------- |
| `npm start`         | Run the Vite dev server with hot reload (`npm run dev` also works).     |
| `npm test`          | Run the Vitest suite in watch mode (`npx vitest run` for a single run). |
| `npm run coverage`  | Run the tests once with a coverage report.                              |
| `npm run build`     | Type-check, then build for production into `build/`.                    |
| `npm run preview`   | Serve the production build locally.                                     |
| `npm run typecheck` | Run the TypeScript compiler without emitting.                           |
| `npm run lint`      | Lint the TypeScript with ESLint.                                        |
| `npm run prettier`  | Format the TypeScript with Prettier.                                    |
| `npm run stylelint` | Lint and auto-fix the SCSS with Stylelint.                              |
