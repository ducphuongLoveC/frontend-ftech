import { createContext } from 'react';
export const NoteContext = createContext({
    onNoteFilter: (_val) => { },
    onNoteDate: (_val) => { },
    onNoteSave: (_id, _newContent) => { },
    onNoteDelete: (_id) => { },
});
