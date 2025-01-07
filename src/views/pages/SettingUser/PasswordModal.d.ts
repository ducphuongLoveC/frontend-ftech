declare const PasswordModal: React.FC<{
    open: boolean;
    onClose: () => void;
    onSave: (newPassword: string) => void;
}>;
export default PasswordModal;
