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
