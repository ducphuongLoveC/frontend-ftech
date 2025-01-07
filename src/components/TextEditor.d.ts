interface TextEditorProps {
    onChange: (content: string) => void;
    initialValue?: string;
    preview?: boolean;
    value?: string;
    initialHeight?: string;
    mode?: 'basic' | 'advanced';
    disabled?: boolean;
}
declare const TextEditor: React.FC<TextEditorProps>;
export default TextEditor;
