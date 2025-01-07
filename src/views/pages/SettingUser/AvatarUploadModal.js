import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Avatar, Typography, Box, CircularProgress, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
const AvatarUploadModal = ({ open, onClose, currentAvatarUrl, onUpload, }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(currentAvatarUrl);
    const [isUploading, setIsUploading] = useState(false);
    // Hiển thị preview khi chọn ảnh mới
    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [selectedFile]);
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            // Kiểm tra loại file hợp lệ
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                alert('Chỉ chấp nhận các định dạng JPG, PNG.');
                return;
            }
            setSelectedFile(file);
        }
    };
    const handleUpload = async () => {
        if (!selectedFile)
            return;
        setIsUploading(true);
        try {
            await onUpload(selectedFile);
            setSelectedFile(null);
            setPreview(currentAvatarUrl);
            onClose();
        }
        catch (error) {
            console.error('Upload failed:', error);
        }
        finally {
            setIsUploading(false);
        }
    };
    return (_jsxs(Dialog, { open: open, onClose: onClose, maxWidth: "xs", fullWidth: true, children: [_jsxs(DialogTitle, { children: ["\u1EA2nh \u0111\u1EA1i di\u1EC7n", _jsx(IconButton, { "aria-label": "close", onClick: onClose, sx: { position: 'absolute', right: 8, top: 8 }, children: _jsx(CloseIcon, {}) })] }), _jsxs(DialogContent, { children: [_jsx(Typography, { variant: "body2", sx: { marginBottom: 2 }, children: "\u1EA2nh \u0111\u1EA1i di\u1EC7n gi\u00FAp m\u1ECDi ng\u01B0\u1EDDi nh\u1EADn bi\u1EBFt b\u1EA1n d\u1EC5 d\u00E0ng h\u01A1n qua c\u00E1c b\u00E0i vi\u1EBFt, b\u00ECnh lu\u1EADn, tin nh\u1EAFn..." }), _jsx(Box, { sx: { display: 'flex', justifyContent: 'center', mb: 3 }, children: _jsx(Avatar, { alt: "Current Avatar", src: preview || currentAvatarUrl || 'fallback-image-url', sx: { width: 100, height: 100 } }) }), _jsx(Box, { sx: { textAlign: 'center' }, children: _jsxs(Button, { variant: "outlined", component: "label", startIcon: _jsx(AddPhotoAlternateIcon, {}), sx: {
                                borderColor: '#6fe0dc',
                                color: '#6fe0dc',
                                '&:hover': {
                                    borderColor: '#58bcb9',
                                    backgroundColor: '#f0fafa',
                                },
                            }, children: ["T\u1EA3i \u1EA3nh m\u1EDBi l\u00EAn", _jsx("input", { type: "file", hidden: true, accept: "image/*", onChange: handleFileChange })] }) })] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: onClose, sx: { color: '#757575' }, disabled: isUploading, children: "H\u1EE7y" }), _jsx(Button, { onClick: handleUpload, variant: "contained", disabled: !selectedFile || isUploading, sx: {
                            backgroundColor: '#36404D',
                            '&:hover': {
                                backgroundColor: '#38364d',
                            },
                        }, children: isUploading ? _jsx(CircularProgress, { size: 24, color: "inherit" }) : 'Lưu' })] })] }));
};
export default AvatarUploadModal;
