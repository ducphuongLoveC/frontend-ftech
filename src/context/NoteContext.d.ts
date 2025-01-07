export declare const NoteContext: import("react").Context<{
    onNoteFilter: (_val: string) => void;
    onNoteDate: (_val: string) => void;
    onNoteSave: (_id: string, _newContent: string) => void;
    onNoteDelete: (_id: string) => void;
}>;
