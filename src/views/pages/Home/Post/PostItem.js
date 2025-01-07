import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, styled, useTheme, CardMedia } from '@mui/material';
import WrapperCard from '../WrapperCard';
const CustomCardMedia = styled(CardMedia)({
    width: '100%',
    height: '160px',
    overflow: 'hidden',
    objectFit: 'cover',
});
const PostItem = ({ thumbnail, title, postUser }) => {
    const theme = useTheme();
    return (_jsxs(WrapperCard, { children: [_jsx(CustomCardMedia, { image: thumbnail }), _jsxs(Box, { sx: { padding: 3, backgroundColor: theme.palette.background.paper2 }, children: [_jsxs(Typography, { mb: 1, variant: "body1", children: ["\u0110\u0103ng b\u1EDFi ", postUser] }), _jsx(Typography, { variant: "h4", children: title })] })] }));
};
export default PostItem;
