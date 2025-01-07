import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 },
};
// ==============================|| CUSTOM MAIN CARD ||============================== //
const MainCard = forwardRef(({ border = false, boxShadow, children, content = true, contentClass = '', contentSX = {}, darkTitle, secondary, shadow, sx = {}, title, ...others }, ref) => {
    return (_jsxs(Card, { ref: ref, ...others, sx: {
            border: border ? '1px solid' : 'none',
            borderColor: 'divider',
            ':hover': {
                boxShadow: boxShadow
                    ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)'
                    : 'inherit',
            },
            ...sx,
        }, children: [!darkTitle && title && (_jsx(CardHeader, { sx: headerSX, title: title, action: secondary })), darkTitle && title && (_jsx(CardHeader, { sx: headerSX, title: _jsx(Typography, { variant: "h3", children: title }), action: secondary })), title && _jsx(Divider, {}), content && (_jsx(CardContent, { sx: contentSX, className: contentClass, children: children })), !content && children] }));
});
export default MainCard;
