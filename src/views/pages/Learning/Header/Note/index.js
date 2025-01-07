import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, styled, Typography, Grid } from '@mui/material';
import { useContext } from 'react';
import { NoteContext } from '@/context/NoteContext';
import { useDispatch } from 'react-redux';
import useQueryParams from '@/hooks/useQueryParams';
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
import NoteItem from './NoteItem';
import { SET_SEEK } from '@/store/actions';
const Note = ({ notes }) => {
    const query = useQueryParams();
    const dispatch = useDispatch();
    console.log(notes);
    const handleSeek = (seek, idCurrentResource) => {
        const idResource = query.get('id');
        if (idResource !== idCurrentResource) {
            query.set('id', idCurrentResource);
        }
        dispatch({ type: SET_SEEK, payload: seek });
    };
    const { onNoteFilter, onNoteDate, onNoteSave, onNoteDelete } = useContext(NoteContext);
    return (_jsxs(BoxMain, { children: [_jsxs(Box, { p: 3, children: [_jsxs(Grid, { container: true, alignItems: "center", spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(Typography, { variant: 'h3', children: "Ghi ch\u00FA c\u1EE7a t\u00F4i" }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(Box, { children: _jsxs("select", { onChange: (e) => onNoteFilter(e.target.value), id: "filter-notes", className: "mr-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500", children: [_jsx("option", { value: "in_chapter", children: "Trong t\u00E0i li\u1EC7u n\u00E0y" }), _jsx("option", { value: "all_chapters", children: "T\u1EA5t c\u1EA3 t\u00E0i li\u1EC7u " })] }) }) }), _jsx(Grid, { item: true, xs: 12, sm: 4, children: _jsx(Box, { children: _jsxs("select", { onChange: (e) => onNoteDate(e.target.value), id: "filter-date", className: "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500", children: [_jsx("option", { value: "ASC", children: "C\u0169 \u0111\u1EBFn m\u1EDBi" }), _jsx("option", { value: "DESC", children: "M\u1EDBi \u0111\u1EBFn c\u0169" })] }) }) })] }), _jsx(Box, { mt: 5, children: notes.map((n) => (_jsx(NoteItem, { _id: n._id, title: n.title, content: n.content, markAt: n.markAt, onEdit: onNoteSave, onDelete: (id) => {
                                if (confirm('Bạn có muốn xóa không?')) {
                                    onNoteDelete(id);
                                }
                            }, onSeek: (seek) => handleSeek(seek, n.resource_id) }))) })] }), !notes?.length && (_jsxs(NotNoteBox, { children: [_jsx(Typography, { variant: "h4", children: "B\u1EA1n ch\u01B0a c\u00F3 ghi ch\u00FA n\u00E0o" }), _jsx(Typography, { variant: "body1", children: "H\u00E3y ghi ch\u00E9p \u0111\u1EC3 nh\u1EDB nh\u1EEFng g\u00EC b\u1EA1n \u0111\u00E3 h\u1ECDc!" })] }))] }));
};
export default Note;
