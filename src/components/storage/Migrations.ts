import type {NoteDraft} from '../../types';

const MIGRATION_LOCAL_STORAGE_TO_INDEXEDDB = 'localstorage-to-indexeddb';

/**
 * A note saved by the old localStorage version of the app, or null when the
 * value isn't one (other keys live there too, like the theme preference).
 */
export const parseLegacyNote = (value: string | null): NoteDraft | null => {
  try {
    const parsed: unknown = JSON.parse(value ?? 'null');

    return typeof parsed === 'object' &&
      parsed !== null &&
      !Array.isArray(parsed)
      ? (parsed as NoteDraft)
      : null;
  } catch {
    return null;
  }
};

type NotesStorage = {
  storage: LocalForage;
  saveNote: (note: NoteDraft) => Promise<unknown>;
};

export default class Migrations {
  migrationDb: LocalForage;
  notesStorage: NotesStorage;

  constructor(migrationDb: LocalForage, notesStorage: NotesStorage) {
    this.migrationDb = migrationDb;
    this.notesStorage = notesStorage;
  }

  migrate = async () => {
    const storageDriver = this.notesStorage.storage.driver();

    const localstorageToIndexeddb = await this.migrationDb.getItem(
      MIGRATION_LOCAL_STORAGE_TO_INDEXEDDB
    );

    // if the browser only supports localStorage, there is no need
    // to migrate localStorage over to indexeddb or websql
    if (
      !localstorageToIndexeddb &&
      storageDriver !== this.notesStorage.storage.LOCALSTORAGE
    ) {
      const keys = Object.keys(window.localStorage);

      for (const key of keys) {
        const note = parseLegacyNote(window.localStorage.getItem(key));

        if (note) {
          await this.notesStorage.saveNote(note);
        }
      }

      this.migrationDb.setItem(
        MIGRATION_LOCAL_STORAGE_TO_INDEXEDDB,
        new Date()
      );

      // we don't have an elegant way to reload the note list.
      // since this will only happen once, a reload seems to be okay.
      window.location.reload();
    }

    return true;
  };
}
