import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { Grid, Box, Typography, Card, CardContent, CardActions, Button, FormControl, Paper, InputLabel, Select, MenuItem, } from '@mui/material';
import Dialog from '@/components/Dialog';
import { getMedia } from '@/api/mediaApi';
const MediaDisplay = ({ resourceType, secureUrl, alt, }) => {
    switch (resourceType) {
        case 'image':
            return (_jsx("img", { src: secureUrl, alt: alt, style: { width: '100%', height: '150px', borderRadius: '8px', objectFit: 'cover' } }));
        case 'video':
            return (_jsxs("video", { controls: true, style: { width: '100%', height: 'auto', borderRadius: '8px' }, children: [_jsx("source", { src: secureUrl, type: "video/mp4" }), "Your browser does not support the video tag."] }));
        default:
            return null;
    }
};
const Storage = ({ type, onSelectMedia }) => {
    const [open, setOpen] = useState(false);
    const [params, setParams] = useState({
        order: 'asc',
    });
    const { data: media, isPending } = useQuery({
        queryKey: ['media', type, params],
        queryFn: () => getMedia(type, params),
    });
    return (_jsxs(_Fragment, { children: [_jsxs(Dialog, { title: "Kho l\u01B0u tr\u1EEF", open: open, onClose: () => setOpen(false), children: [_jsx(Box, { sx: { mb: 2, p: 2 }, component: Paper, children: _jsxs(FormControl, { sx: { width: '250px' }, children: [_jsx(InputLabel, { children: "S\u1EAFp x\u1EBFp th\u1EDDi gian t\u1EA3i l\u00EAn" }), _jsxs(Select, { value: params.order, onChange: (e) => setParams((pre) => ({ ...pre, order: e.target.value })), fullWidth: true, label: "S\u1EAFp x\u1EBFp theo gi\u00E1 tr\u1ECB gi\u1EA3m", children: [_jsx(MenuItem, { value: "asc", children: "T\u0103ng d\u1EA7n" }), _jsx(MenuItem, { value: "desc", children: "Gi\u1EA3m d\u1EA7n" })] })] }) }), isPending ? ('loading...') : (_jsx(Box, { p: 2, children: _jsx(Grid, { container: true, spacing: 2, children: media?.map((m) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsxs(Card, { onClick: () => {
                                        onSelectMedia(m.secure_url);
                                        setOpen(false);
                                    }, sx: { cursor: 'pointer', maxWidth: 345, borderRadius: 2, boxShadow: 3 }, children: [_jsx(MediaDisplay, { resourceType: m.resource_type, secureUrl: m.secure_url, alt: m.display_name }), _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: m.display_name }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Lo\u1EA1i: ", m.resource_type] }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["K\u00EDch th\u01B0\u1EDBc: ", Math.round(m.bytes / 1024), " KB"] }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["\u0110\u1ECBnh d\u1EA1ng: ", m.format] }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["T\u1EA3i l\u00EAn: ", moment(m.created_at).format('DD/MM/YYYY HH:mm')] })] }), _jsx(CardActions, { children: _jsx(Button, { size: "small", href: m.secure_url, target: "_blank", rel: "noopener noreferrer", children: "Xem chi ti\u1EBFt" }) })] }) }, m.public_id))) }) }))] }), _jsx(Button, { onClick: () => setOpen(true), children: "Ch\u1ECDn t\u1EEB kho l\u01B0u tr\u1EEF" })] }));
};
export default Storage;
