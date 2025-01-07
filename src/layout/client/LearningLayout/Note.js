import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, styled, Typography, Grid } from '@mui/material';
const BoxMain = styled(Box)(() => ({
    width: '100%',
    height: '100vh',
}));
const NotNoteBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '80%',
}));
const Note = () => {
    return (_jsxs(BoxMain, { children: [_jsx(Box, { p: 3, children: _jsxs(Grid, { container: true, alignItems: "center", spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(Typography, { variant: 'h3', children: "Ghi ch\u00FA c\u1EE7a t\u00F4i" }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(Box, { children: _jsxs("select", { id: "filter-notes", className: "mr-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500", children: [_jsx("option", { value: '', children: "L\u1ECDc theo ch\u01B0\u01A1ng" }), _jsx("option", { value: 2, children: "Trong ch\u01B0\u01A1ng n\u00E0y" }), _jsx("option", { value: 3, children: "T\u1EA5t c\u1EA3 tr\u01B0\u01A1ng" })] }) }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(Box, { children: _jsxs("select", { id: "filter-date", className: "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500", children: [_jsx("option", { value: 1, children: "l\u1ECDc theo th\u1EDDi gian" }), _jsx("option", { value: 1, children: "C\u0169 \u0111\u1EBFn m\u1EDBi" }), _jsx("option", { value: 2, children: "M\u1EDBi \u0111\u1EBFn c\u0169" })] }) }) })] }) }), _jsxs(NotNoteBox, { children: [_jsx(Typography, { variant: "h4", children: "B\u1EA1n ch\u01B0a c\u00F3 ghi ch\u00FA n\u00E0o" }), _jsx(Typography, { variant: "body1", children: "H\u00E3y ghi ch\u00E9p \u0111\u1EC3 nh\u1EDB nh\u1EEFng g\u00EC b\u1EA1n \u0111\u00E3 h\u1ECDc!" })] })] }));
};
export default Note;
