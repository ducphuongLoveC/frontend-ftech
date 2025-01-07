import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, TextField, Grid, MenuItem, Typography, Paper, Box, } from '@mui/material';
const AddPost = () => {
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };
    return (_jsx(Box, { maxWidth: "md", sx: {
            mx: 'auto',
            p: 3,
            minHeight: '100vh',
            minWidth: '100%',
        }, children: _jsxs(Paper, { elevation: 3, sx: { p: 4 }, children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, children: [_jsx(Typography, { variant: "h3", children: "Th\u00EAm b\u00E0i vi\u1EBFt" }), _jsx(Button, { variant: "outlined", children: "B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n" })] }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "subtitle1", children: "Ti\u00EAu \u0111\u1EC1 b\u00E0i vi\u1EBFt" }), _jsx(TextField, { placeholder: "Th\u00EAm ti\u00EAu \u0111\u1EC1...", variant: "outlined", fullWidth: true, margin: "dense" })] }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "subtitle1", children: "N\u1ED9i dung b\u00E0i vi\u1EBFt" }), _jsx(TextField, { placeholder: "vi\u1EBFt n\u1ED9i dung \u1EDF \u0111\u00E2y", variant: "outlined", fullWidth: true, margin: "dense", multiline: true, rows: 10 })] }), _jsxs(Grid, { item: true, xs: 12, sm: 6, children: [_jsx(Typography, { variant: "subtitle1", children: "Danh m\u1EE5c b\u00E0i vi\u1EBFt" }), _jsxs(TextField, { select: true, value: category, onChange: handleCategoryChange, variant: "outlined", fullWidth: true, margin: "dense", placeholder: "Ch\u1ECDn danh m\u1EE5c", children: [_jsx(MenuItem, { value: "", children: _jsx("em", { children: "Ch\u1ECDn danh m\u1EE5c" }) }), _jsx(MenuItem, { value: "category1", children: "Danh m\u1EE5c 1" }), _jsx(MenuItem, { value: "category2", children: "Danh m\u1EE5c 2" })] })] }), _jsxs(Grid, { item: true, xs: 12, sm: 6, children: [_jsx(Typography, { variant: "subtitle1", children: "T\u00E1c gi\u1EA3" }), _jsxs(TextField, { select: true, value: author, onChange: handleAuthorChange, variant: "outlined", fullWidth: true, margin: "dense", placeholder: "Ch\u1ECDn t\u00E1c gi\u1EA3", children: [_jsx(MenuItem, { value: "", children: _jsx("em", { children: "Ch\u1ECDn t\u00E1c gi\u1EA3" }) }), _jsx(MenuItem, { value: "author1", children: "T\u00E1c gi\u1EA3 1" }), _jsx(MenuItem, { value: "author2", children: "T\u00E1c gi\u1EA3 2" })] })] })] }), _jsxs(Box, { mt: 3, display: "flex", justifyContent: "space-between", children: [_jsx(Button, { variant: "contained", color: "inherit", children: "H\u1EE7y" }), _jsx(Button, { variant: "contained", color: "primary", children: "Th\u00EAm b\u00E0i vi\u1EBFt" })] })] }) }));
};
export default AddPost;
