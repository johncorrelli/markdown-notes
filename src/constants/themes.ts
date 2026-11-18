// The themes in src/styles/themes. Keep the ids in sync with $themes in
// src/styles/themes/_index.scss.
export const THEMES = [{id: 'nord', name: 'Nord'}] as const;

export type Theme = (typeof THEMES)[number]['id'];

export const DEFAULT_THEME: Theme = 'nord';
