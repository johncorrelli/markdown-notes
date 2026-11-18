import {parseLegacyNote} from '../Migrations';

describe('parseLegacyNote', () => {
  it('parses a note saved by the localStorage version of the app', () => {
    const note = {id: '1', title: 'Hi', category: null, value: 'Hello'};

    expect(parseLegacyNote(JSON.stringify(note))).toEqual(note);
  });

  it('skips values that are not notes, like the theme preference', () => {
    expect(parseLegacyNote('teamgantt')).toBeNull();
    expect(parseLegacyNote('"teamgantt"')).toBeNull();
    expect(parseLegacyNote('[]')).toBeNull();
    expect(parseLegacyNote(null)).toBeNull();
  });
});
