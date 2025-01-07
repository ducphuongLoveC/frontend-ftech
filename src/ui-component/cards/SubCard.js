import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// ==============================|| CUSTOM SUB CARD ||============================== //
const SubCard = React.forwardRef(({ children, content = true, contentClass, darkTitle, secondary, sx = {}, contentSX = {}, title, ...others }, ref) => {
    const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';
    return (_jsxs(Card, { ref: ref, sx: {
            border: '1px solid',
            borderColor: 'divider',
            ':hover': {
                boxShadow: defaultShadow,
            },
            ...sx,
        }, ...others, children: [!darkTitle && title && (_jsx(CardHeader, { sx: {
                    p: 2.5,
                }, title: _jsx(Typography, { variant: "h5", children: title }), action: secondary })), darkTitle && title && (_jsx(CardHeader, { sx: {
                    p: 2.5,
                }, title: _jsx(Typography, { variant: "h4", children: title }), action: secondary })), title && _jsx(Divider, {}), content && (_jsx(CardContent, { sx: {
                    p: 2.5,
                    ...contentSX,
                }, className: contentClass || '', children: children })), !content && children] }));
});
SubCard.displayName = 'SubCard';
export default SubCard;
