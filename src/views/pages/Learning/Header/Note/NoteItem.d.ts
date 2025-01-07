interface NoteItemProp {
    _id: string;
    title: string;
    content: string;
    markAt: number;
    onEdit: (id: string, newContent: string) => void;
    onDelete: (id: string) => void;
    onSeek: (seek: number) => void;
}
declare const NoteItem: React.FC<NoteItemProp>;
export default NoteItem;
