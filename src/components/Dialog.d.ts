interface DialogProps {
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    open: boolean;
}
declare const Dialog: React.FC<DialogProps>;
export default Dialog;
