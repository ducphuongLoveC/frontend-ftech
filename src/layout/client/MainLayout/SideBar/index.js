import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme, styled, useMediaQuery, Box } from '@mui/material';
import s from './SideBar.module.scss';
import menus from '@/menu-items/sidebar-home';
const SideBarStyled = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));
const SideBar = () => {
    const [activeUrl, setActiveUrl] = useState(window.location.pathname);
    const theme = useTheme();
    const handleLinkClick = (url) => {
        if (url !== activeUrl) {
            setActiveUrl(url);
        }
    };
    const downMD = useMediaQuery(theme.breakpoints.down('md'));
    return (_jsx(SideBarStyled, { className: clsx(s['side-bar']), children: _jsx("ul", { className: clsx(s['side-bar-ul'], 'tw-sticky tw-top-20'), children: menus.map((m, index) => {
                const Icon = m.icon;
                const isActive = activeUrl === m.url;
                return (_jsx("li", { children: _jsxs(Link, { onClick: () => handleLinkClick(m.url), style: {
                            color: isActive ? theme.palette.text.secondary : '',
                            backgroundColor: !downMD && isActive ? '#e8ebed' : '',
                        }, className: clsx(s['item-side-bar']), to: m.url, children: [_jsx("i", { className: clsx(s['icon']), children: Icon && _jsx(Icon, {}) }), m.title] }) }, index));
            }) }) }));
};
export default SideBar;
