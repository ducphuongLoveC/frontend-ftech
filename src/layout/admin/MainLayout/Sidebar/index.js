import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
// Project imports
import MenuList from './MenuList';
import Chip from '@/ui-component/extended/Chip';
import { drawerWidth } from '@/store/constant';
import Logo from '@/ui-component/Logo';
// ==============================|| SIDEBAR DRAWER ||============================== //
const Sidebar = ({ drawerOpen, drawerToggle, window, }) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const drawer = (_jsxs(Box, { sx: {
            background: theme.palette.background.paper,
        }, children: [_jsx(Box, { sx: {
                    display: {
                        xs: 'block',
                        md: 'none',
                    },
                }, children: _jsx(Box, { sx: {
                        display: 'flex',
                        p: 2,
                        mx: 'auto',
                    }, children: _jsx(Logo, {}) }) }), _jsx(BrowserView, { children: _jsx(PerfectScrollbar, { component: "div", style: {
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                    }, children: _jsx(MenuList, {}) }) }), _jsx(MobileView, { children: _jsxs(Box, { sx: {
                        px: 2,
                    }, children: [_jsx(MenuList, {}), _jsx(Stack, { direction: "row", justifyContent: "center", sx: {
                                mb: 2,
                            }, children: _jsx(Chip, { label: import.meta.env.VITE_APP_VERSION, disabled: true, chipcolor: "secondary", size: "small", sx: {
                                    cursor: 'pointer',
                                } }) })] }) })] }));
    const container = window ? () => window.document.body : undefined;
    return (_jsx(Box, { component: "nav", sx: {
            flexShrink: {
                md: 0,
            },
            width: matchUpMd ? drawerWidth : 'auto',
        }, "aria-label": "mailbox folders", children: _jsx(Drawer, { container: container, variant: matchUpMd ? 'persistent' : 'temporary', anchor: "left", open: drawerOpen, onClose: drawerToggle, sx: {
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    background: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    borderRight: 'none',
                    [theme.breakpoints.up('md')]: {
                        top: '88px',
                    },
                },
            }, ModalProps: {
                keepMounted: true,
            }, color: "inherit", children: drawer }) }));
};
export default Sidebar;
