import type {Note, NoteDraft} from '../../types';
import Migrations from './Migrations';
import {notesDb, migrationsDb} from './Databases';

class Storage {
  storage: LocalForage;

  constructor(store: LocalForage) {
    this.storage = store;

    const migrations = new Migrations(migrationsDb, this);
    migrations.migrate();
  }

  deleteNote = async (id: string) => {
    await this.storage.removeItem(id);
  };

  getAllNotes = async (): Promise<Note[]> => {
    const values: Note[] = [];
    const keys = await this.storage.keys();

    for (const key of keys) {
      values.push(await this.getNote(key));
    }

    return values;
  };

  getNote = async (id: string): Promise<Note> => {
    const selectedNote = await this.storage.getItem<string>(id);

    return JSON.parse(selectedNote ?? 'null') || {};
  };

  saveNote = async (note: NoteDraft): Promise<Note> => {
    const newNote: Note = {
      id: note.id || crypto.randomUUID(),
      title: note.title || 'Untitled Note',
      category: note.category || null,
      value: note.value || null,
    };

    await this.storage.setItem(newNote.id, JSON.stringify(newNote));

    return newNote;
  };
}

const storage = new Storage(notesDb);

export default storage;
