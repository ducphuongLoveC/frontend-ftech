import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Grid, Typography, styled, useTheme } from '@mui/material';
const Thumbnail = styled('img')(() => ({
    width: '100px',
    objectFit: 'cover',
}));
const ImageDescription = ({ thumbnail, bodyHead, bodyContent, bExtend, isUnRead, ...rest }) => {
    const theme = useTheme();
    return (_jsx(Box, { ...rest, children: _jsxs(Grid, { container: true, alignItems: "center", sx: {
                padding: '5px 0',
                cursor: 'pointer',
                userSelect: 'none',
                '&:hover': {
                    backgroundColor: theme.palette.background.paper2,
                },
            }, children: [_jsx(Grid, { item: true, sx: { marginRight: '10px' }, children: _jsxs(Box, { sx: { display: 'flex' }, children: [_jsx(Box, { sx: { width: '7px', height: '7px', borderRadius: '50%', backgroundColor: `${isUnRead && 'red'}` } }), _jsx(Thumbnail, { sx: { width: 120, borderRadius: 'var(--mini-border-radius)' }, src: thumbnail, alt: "img" })] }) }), _jsxs(Grid, { item: true, xs: true, children: [_jsx(Typography, { variant: "h6", sx: { fontSize: 'var(--main-font-size)' }, children: bodyHead }), _jsx(Typography, { variant: "body1", children: bodyContent }), bExtend] })] }) }));
};
export default ImageDescription;
