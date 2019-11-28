import localforage from 'localforage';

export const notesDb = localforage.createInstance({
  name: 'notes.johncorrelli',
  storeName: 'notes',
  description: 'a collection of notes',
});

export const migrationsDb = localforage.createInstance({
  name: 'migrations.notes.johncorrelli',
  storeName: 'migrations',
  description: 'migrations for notes.johncorrelli.com',
});
