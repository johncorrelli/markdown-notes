const MIGRATION_LOCAL_STORAGE_TO_INDEXEDDB = 'localstorage-to-indexeddb';

export default class Migrations {
  constructor(migrationDb, notesStorage) {
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

      for (let id in keys) {
        const noteId = keys[id];
        const note = JSON.parse(window.localStorage.getItem(noteId));

        await this.notesStorage.saveNote(note);
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
