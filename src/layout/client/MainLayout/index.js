import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import clsx from 'clsx';
import Footer from './Footer';
import Navbar from './Header';
import SideBar from './SideBar';
import Layout from '../Layout.scss.module.scss';
const MainLayout = ({ children }) => {
    const theme = useTheme();
    return (_jsxs("div", { style: {
            background: theme.palette.background.paper,
        }, children: [_jsx(Navbar, {}), _jsxs("div", { style: {
                    background: theme.palette.background.paper,
                }, className: "tw-flex", children: [_jsx(SideBar, {}), _jsx("div", { className: clsx(Layout['content-main']), children: children })] }), _jsx(Footer, {})] }));
};
export default MainLayout;
