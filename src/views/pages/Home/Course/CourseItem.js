import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled, CardMedia, Box, Typography, useTheme } from '@mui/material';
// pj
import AverageRating from '@/components/AverageRating';
import WrapperCard from '../WrapperCard';
import { Link } from 'react-router-dom';
const CustomCardMedia = styled(CardMedia)({
    height: '160px',
    overflow: 'hidden',
    objectFit: 'cover',
});
const CourseItem = ({ thumbnail, title, postUser, price, salePrice, totalUserRate, totalStars, stars, to, isFree, }) => {
    const theme = useTheme();
    return (_jsx(Link, { to: to, children: _jsxs(WrapperCard, { children: [_jsx(CustomCardMedia, { image: thumbnail }), _jsxs(Box, { sx: {
                        padding: 1,
                        backgroundColor: theme.palette.background.paper2,
                        height: '140px',
                    }, children: [_jsx(Typography, { variant: "h4", mb: 1, children: title }), _jsxs(Typography, { variant: "body1", children: ["\u0110\u0103ng b\u1EDFi ", postUser] }), _jsx(AverageRating, { totalStars: totalStars, totalUserRate: totalUserRate, stars: stars }), isFree ? (_jsx(Typography, { variant: "h3", color: "#980000", children: "Mi\u1EC5n ph\u00ED" })) : (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', marginTop: 1 }, children: [_jsxs(Typography, { variant: "h3", color: "#980000", children: [salePrice.toLocaleString('vi-VN'), " VND"] }), _jsxs(Typography, { variant: "caption", sx: { textDecoration: 'line-through', marginLeft: 1 }, children: [price.toLocaleString('vi-VN'), " VND"] })] }))] })] }) }));
};
export default CourseItem;
