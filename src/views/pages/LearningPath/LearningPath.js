import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import imgCard from '@/assets/images/course/iimg-langage.png';
import imgCard1 from '@/assets/images/course/image-3.png';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Card, CardMedia, Button, Grid, List, ListItem, ListItemText, } from '@mui/material';
const LearningPath = () => {
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:3000/routes');
            const data = await response.json();
            setPosts(data);
        }
        catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    return (_jsx(Container, { sx: { paddingY: 4 }, children: _jsxs(Grid, { container: true, spacing: 3, children: [_jsxs(Grid, { item: true, xs: 12, md: 8, children: [_jsxs(Box, { sx: { marginBottom: 4, width: '100%' }, children: [_jsx(Typography, { variant: "h2", fontWeight: "700", fontSize: 30, gutterBottom: true, children: "L\u1ED9 tr\u00ECnh h\u1ECDc" }), _jsxs(Typography, { variant: "body1", color: "textSecondary", sx: { fontSize: '1rem', maxWidth: '600px' }, children: ["\u0110\u1EC3 b\u1EAFt \u0111\u1EA7u m\u1ED9t c\u00E1ch thu\u1EADn l\u1EE3i, b\u1EA1n n\u00EAn t\u1EADp trung v\u00E0o m\u1ED9t l\u1ED9 tr\u00ECnh h\u1ECDc. V\u00ED d\u1EE5:", _jsx("br", {}), "\u0110\u1EC3 \u0111i l\u00E0m v\u1EDBi v\u1ECB tr\u00ED \"L\u1EADp tr\u00ECnh vi\u00EAn Front-end\" b\u1EA1n n\u00EAn t\u1EADp trung v\u00E0o l\u1ED9 tr\u00ECnh", _jsx("br", {}), "\"Front-end\"."] })] }), _jsx(Typography, { variant: "h4", fontWeight: "600", gutterBottom: true, children: "H\u00E3y ch\u1ECDn h\u01B0\u1EDBng \u0111i m\u00E0 b\u1EA1n mong mu\u1ED1n:" }), _jsx(Grid, { container: true, spacing: 3, children: posts.map((item) => (_jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsxs(Card, { sx: {
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: 2,
                                        '&:hover .overlay': {
                                            bottom: 0,
                                        },
                                    }, children: [_jsx(CardMedia, { component: "img", image: imgCard, alt: item.title, sx: {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'filter 0.3s ease',
                                                '&:hover': {
                                                    filter: 'blur(8px)',
                                                },
                                            }, className: "card-image" }), _jsxs(Box, { className: "overlay", sx: {
                                                position: 'absolute',
                                                bottom: '-100%',
                                                left: 0,
                                                right: 0,
                                                height: '100%',
                                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                color: '#fff',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                transition: 'bottom 0.5s ease',
                                                padding: 2,
                                            }, children: [_jsx(Typography, { variant: "h6", fontSize: 18, color: '#fff', fontWeight: "600", gutterBottom: true, children: item.title }), _jsx(Typography, { variant: "body2", textAlign: "center", sx: { width: '100%' }, children: item.description }), _jsx(Button, { variant: "contained", color: "primary", component: Link, to: `/${item.path}`, sx: { marginTop: 2 }, children: "Xem ngay" })] })] }) }, item.id))) })] }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsxs(Box, { sx: { position: 'sticky', top: 0, height: '100%' }, children: [_jsx(Typography, { variant: "h3", fontWeight: "600", gutterBottom: true, children: "Tin t\u1EE9c" }), _jsx(List, { children: [
                                    'Lập trình là gì?',
                                    'Kiến thức cần có cho người mới',
                                    'Học thế nào cho hiệu quả',
                                    'Ngôn ngữ lập trình là gì?',
                                    'Cách thức vận hành 1 trang web'
                                ].map((text, index) => (_jsx(ListItem, { sx: { borderBottom: '1px solid #ddd' }, children: _jsx(ListItemText, { primary: text }) }, index))) }), _jsx(Card, { sx: { marginTop: 2 }, children: _jsx(CardMedia, { component: "img", image: imgCard1, alt: "Tin t\u1EE9c" }) })] }) })] }) }));
};
export default LearningPath;
