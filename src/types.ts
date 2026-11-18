export type Note = {
  id: string;
  title: string;
  category: string | null;
  value: string | null;
};

/** A note that may not be saved yet (no id) or only partially updated. */
export type NoteDraft = Partial<Note>;
