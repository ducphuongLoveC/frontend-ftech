import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import TextEditor from '@/components/TextEditor';
import { Box, Input, Button, Grid, IconButton, Dialog, DialogContent, } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // Import the camera icon
const NewPost = () => {
    const [post, setPost] = useState({
        title: '',
        content: '',
        thumbnail: null,
    });
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [open, setOpen] = useState(false);
    const handleTitleChange = (event) => {
        setPost((prevPost) => ({
            ...prevPost,
            title: event.target.value,
        }));
    };
    const handleContentChange = (content) => {
        setPost((prevPost) => ({
            ...prevPost,
            content,
        }));
    };
    const handleThumbnailChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const selectedThumbnail = event.target.files[0];
            const previewUrl = URL.createObjectURL(selectedThumbnail);
            setThumbnailPreview(previewUrl);
            setPost((prevPost) => ({
                ...prevPost,
                thumbnail: previewUrl,
            }));
        }
    };
    //   modal handle
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (_jsxs(Box, { p: 3, children: [_jsxs(Grid, { container: true, spacing: 2, alignItems: "center", children: [_jsxs(Grid, { item: true, xs: 7, sm: 10, display: "flex", alignItems: "center", children: [_jsx(Input, { fullWidth: true, placeholder: "Ti\u00EAu \u0111\u1EC1", sx: { fontSize: '24px' }, value: post.title, onChange: handleTitleChange }), _jsx(Grid, { item: true, children: thumbnailPreview && (_jsx(Box, { ml: 2, children: _jsx("img", { src: thumbnailPreview, alt: "Uploaded Thumbnail", onClick: handleOpen, style: {
                                            width: '150px',
                                            height: 'auto',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                        } }) })) }), _jsx("input", { accept: "image/*", style: { display: 'none' }, id: "icon-button-file", type: "file", onChange: handleThumbnailChange }), _jsx("label", { htmlFor: "icon-button-file", children: _jsx(IconButton, { color: "primary", component: "span", children: _jsx(PhotoCameraIcon, { fontSize: "large" }) }) })] }), _jsx(Grid, { item: true, xs: 5, sm: 2, children: _jsx(Button, { sx: {
                                background: 'var(--color-primary)',
                                color: 'white',
                            }, fullWidth: true, onClick: () => console.log(post), children: "Xu\u1EA5t b\u1EA3n" }) })] }), _jsx(Dialog, { open: open, onClose: handleClose, maxWidth: "md", fullWidth: true, children: _jsx(DialogContent, { children: thumbnailPreview && (_jsx("img", { src: thumbnailPreview, alt: "Uploaded Thumbnail", style: {
                            width: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                        } })) }) }), _jsx(TextEditor, { mode: "advanced", preview: true, initialValue: "", initialHeight: "70vh", onChange: handleContentChange })] }));
};
export default NewPost;
