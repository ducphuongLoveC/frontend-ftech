import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from '../MainLayout/Header';
import { Box } from '@mui/material';
import Footer from '../MainLayout/Footer';
import { useTheme } from '@mui/material';
const BasicLayout = ({ children }) => {
    const theme = useTheme();
    return (_jsxs(Box, { sx: {
            backgroundColor: theme.palette.background.paper,
        }, children: [_jsx(Header, {}), _jsx(Box, { sx: {
                    margin: 'auto',
                    width: {
                        sm: '100%',
                        md: '90%',
                    },
                }, children: children }), _jsx(Footer, {})] }));
};
export default BasicLayout;
