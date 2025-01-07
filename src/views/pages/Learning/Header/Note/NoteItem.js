import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, styled, Button, Typography, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import TextEditor from '@/components/TextEditor';
import formatTime from '@/utils/formatTime';
import { useState, useCallback } from 'react';
const NoteHeader = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));
const NoteBody = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper2,
    borderRadius: theme.shape.borderRadius,
}));
const NoteItem = ({ _id, title, content, markAt, onEdit, onDelete, onSeek }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newContent, setNewContent] = useState(content);
    const handleEdit = useCallback(() => {
        if (isEdit) {
            onEdit(_id, newContent);
        }
        setIsEdit((prev) => !prev);
    }, [isEdit, _id, newContent, onEdit]);
    const handleDelete = useCallback(() => {
        onDelete(_id);
    }, [_id, onDelete]);
    const handleSeek = () => {
        onSeek(markAt);
    };
    return (_jsxs(Box, { mb: 3, children: [_jsxs(NoteHeader, { children: [_jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(Button, { onClick: handleSeek, variant: "outlined", size: "small", sx: { mr: 2 }, children: formatTime(markAt) }), _jsx(Typography, { variant: "h5", children: title })] }), _jsxs(Box, { display: "flex", children: [_jsx(Tooltip, { title: isEdit ? 'Hoàn tất chỉnh sửa' : 'Chỉnh sửa', children: _jsx(Button, { onClick: handleEdit, children: isEdit ? _jsx(DoneIcon, {}) : _jsx(EditIcon, {}) }) }), _jsx(Tooltip, { title: "X\u00F3a ghi ch\u00FA", children: _jsx(Button, { onClick: handleDelete, color: "error", children: _jsx(DeleteIcon, {}) }) })] })] }), _jsx(NoteBody, { children: isEdit ? (_jsx(TextEditor, { value: newContent, onChange: setNewContent })) : (_jsx(Typography, { variant: "body1", dangerouslySetInnerHTML: { __html: content } })) })] }));
};
export default NoteItem;
