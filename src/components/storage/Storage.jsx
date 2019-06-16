import uuidv4 from 'uuid/v4';

class Storage {
  constructor(store) {
    this.storage = store;
  }

  getAllNotes = () => {
    const values = [];
    const keys = Object.keys(this.storage);

    for (var id in keys) {
      values.push(this.getNote(keys[id]));
    }

    return values;
  };

  getNote = id => {
    return JSON.parse(this.storage.getItem(id)) || {};
  };

  saveNote = note => {
    const newNote = {
      id: note.id || uuidv4(),
      title: note.title || 'Untitled Note',
      category: note.category || null,
      value: note.value || null,
    };

    this.storage.setItem(newNote.id, JSON.stringify(newNote));

    return newNote;
  };
}

export default (Storage = new Storage(window.localStorage));
