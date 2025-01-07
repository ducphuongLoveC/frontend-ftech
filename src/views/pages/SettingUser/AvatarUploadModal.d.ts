import React from 'react';
interface AvatarUploadModalProps {
    open: boolean;
    onClose: () => void;
    currentAvatarUrl: string;
    onUpload: (file: File) => void;
}
declare const AvatarUploadModal: React.FC<AvatarUploadModalProps>;
export default AvatarUploadModal;
