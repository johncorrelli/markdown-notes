import uuidv4 from 'uuid/v4';
import Migrations from './Migrations';
import {notesDb, migrationsDb} from './Databases';

class Storage {
  constructor(store) {
    this.storage = store;

    const migrations = new Migrations(migrationsDb, this);
    migrations.migrate();
  }

  deleteNote = async id => {
    await this.storage.removeItem(id);
  };

  getAllNotes = async () => {
    const values = [];
    const keys = await this.storage.keys();

    for (let id in keys) {
      values.push(await this.getNote(keys[id]));
    }

    return values;
  };

  getNote = async id => {
    const selectedNote = await this.storage.getItem(id);

    return JSON.parse(selectedNote) || {};
  };

  saveNote = async note => {
    const newNote = {
      id: note.id || uuidv4(),
      title: note.title || 'Untitled Note',
      category: note.category || null,
      value: note.value || null,
    };

    await this.storage.setItem(newNote.id, JSON.stringify(newNote));

    return newNote;
  };
}

export default (Storage = new Storage(notesDb));
