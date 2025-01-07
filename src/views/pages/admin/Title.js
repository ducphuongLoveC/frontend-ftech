import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const HeaderTitle = ({ titleButton, des, link, ...props }) => {
    const theme = useTheme();
    return (_jsxs(Box, { sx: {
            backgroundColor: theme.palette.background.paper,
            p: 2,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }, children: [_jsx(Typography, { variant: "body2", children: des }), titleButton && _jsx(Button, { ...(link
                    ? {
                        component: Link,
                        to: link,
                    }
                    : props), variant: "outlined", children: titleButton })] }));
};
export default HeaderTitle;
