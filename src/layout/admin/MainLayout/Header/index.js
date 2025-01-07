import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
// project imports
import SearchSection from './SearchSection';
// import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';
// assets
import { IconMenu2 } from '@tabler/icons-react';
import Logo from '@/ui-component/Logo';
// ==============================|| MAIN NAVBAR / HEADER ||============================== //
const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    return (_jsxs(_Fragment, { children: [_jsxs(Box, { sx: {
                    width: 258,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto',
                    },
                }, children: [_jsx(Box, { component: "span", sx: {
                            display: {
                                xs: 'none',
                                md: 'block',
                            },
                            flexGrow: 1,
                        }, children: _jsx(Logo, {}) }), _jsx(ButtonBase, { sx: {
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }, children: _jsx(Avatar, { variant: "rounded", sx: {
                                transition: 'all .2s ease-in-out',
                                background: 'none',
                                color: theme.palette.text.primary,
                                '&:hover': {
                                    background: theme.palette.background.paper2,
                                },
                            }, onClick: handleLeftDrawerToggle, color: "inherit", children: _jsx(IconMenu2, { stroke: 1.5, size: "1.3rem" }) }) })] }), _jsx(SearchSection, {}), _jsx(Box, { sx: {
                    flexGrow: 1,
                } }), _jsx(Box, { sx: {
                    flexGrow: 1,
                } }), _jsx(ProfileSection, {})] }));
};
export default Header;
