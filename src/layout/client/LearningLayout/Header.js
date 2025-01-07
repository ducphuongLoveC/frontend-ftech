import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Box, styled, useTheme, Button, Typography, useMediaQuery } from '@mui/material';
import { BiChevronLeft } from 'react-icons/bi';
import DescriptionIcon from '@mui/icons-material/Description';
import ContrastIcon from '@mui/icons-material/Contrast';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_THEME_HOME } from '@/store/actions';
import Progress from '@/components/Progress';
import Note from './Note';
import PlacementToggle from '@/components/PlacementToggle';
const BoxHeader = styled('header')(({ theme, isMobile }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.background.paper === '#ffffff' ? '#29303b' : theme.palette.background.paper,
    height: isMobile ? '40px' : '50px',
    alignItems: 'center',
    paddingRight: '20px',
}));
const StyledButton = styled(Button)({
    height: '50px',
});
const BoxCenter = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
});
const StyledDescriptionBox = styled(BoxCenter)({
    cursor: 'pointer',
});
const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const homeState = useSelector((state) => state.homeReducer);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleToggleTheme = () => {
        const newTheme = homeState.theme === 'light' ? 'dark' : 'light';
        dispatch({
            type: TOGGLE_THEME_HOME,
            theme: newTheme,
        });
    };
    return (_jsxs(BoxHeader, { isMobile: isMobile, children: [_jsxs(Box, { color: "white", display: "flex", alignItems: "center", children: [_jsx(Link, { to: '/', children: _jsx(StyledButton, { children: _jsx(BiChevronLeft, { color: "white" }) }) }), _jsx(Typography, { variant: isMobile ? 'h5' : 'h4', color: "white", children: "HTML CSS t\u1EEB Zero \u0111\u1EBFn Hero" })] }), _jsxs(BoxCenter, { children: [_jsxs(BoxCenter, { children: [_jsx(Progress, { value: 88 }), !isMobile && (_jsx(Typography, { variant: "caption", color: "white", children: "1/100 b\u00E0i h\u1ECDc" }))] }), _jsx(PlacementToggle, { placement: "right", Connect: (connect) => (_jsxs(StyledDescriptionBox, { onClick: connect, children: [_jsx(DescriptionIcon, { sx: { color: 'white', fontSize: '20px', marginRight: '5px' } }), !isMobile && (_jsx(Typography, { color: "white", variant: "body2", children: "Ghi ch\u00FA" }))] })), children: _jsx(Note, {}) }), _jsxs(BoxCenter, { sx: { cursor: 'pointer' }, onClick: handleToggleTheme, children: [_jsx(ContrastIcon, { sx: { fontSize: '20px', color: 'white', mr: 1 } }), !isMobile && (_jsx(Typography, { color: "white", variant: "body2", children: "Theme" }))] })] })] }));
};
export default Header;
