import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
// import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
// cookies
import Cookies from 'js-cookie';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
// project imports
import MainCard from '@/ui-component/cards/MainCard';
import Transitions from '@/ui-component/extended/Transitions';
// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER } from '@/store/actions';
import DrawerSetting from '@/layout/admin/DrawerSetting';
// ==============================|| PROFILE MENU ||============================== //
const ProfileSection = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const theme = useTheme();
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    // const [notification, setNotification] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const [openDrawerSetting, setOpenDrawerSetting] = useState(false);
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        dispatch({ type: SET_USER, payload: null });
        Cookies.remove('user', { domain: 'admin.localhost', path: '/' });
        Cookies.remove('accessToken', { domain: 'admin.localhost', path: '/' });
        window.location.reload();
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);
        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current?.focus();
        }
        prevOpen.current = open;
    }, [open]);
    return (_jsxs(_Fragment, { children: [_jsx(Chip, { sx: {
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light,
                        },
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0,
                    },
                }, icon: _jsx(Avatar, { src: user.profile_picture, sx: {
                        margin: '8px 0 8px 8px !important',
                        cursor: 'pointer',
                    }, ref: anchorRef, "aria-controls": open ? 'menu-list-grow' : undefined, "aria-haspopup": "true", color: "inherit" }), label: _jsx(IconSettings, { stroke: 1.5, size: "1.5rem", color: theme.palette.primary.main }), variant: "outlined", ref: anchorRef, "aria-controls": open ? 'menu-list-grow' : undefined, "aria-haspopup": "true", onClick: handleToggle, color: "primary" }), _jsx(Popper, { placement: "bottom-end", open: open, anchorEl: anchorRef.current, role: undefined, transition: true, disablePortal: true, popperOptions: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14],
                            },
                        },
                    ],
                }, children: ({ TransitionProps }) => (_jsx(Transitions, { in: open, ...TransitionProps, children: _jsx(Paper, { elevation: 16, children: _jsx(ClickAwayListener, { onClickAway: handleClose, children: _jsxs(MainCard, { border: false, content: false, boxShadow: true, shadow: theme.shadows[16], children: [_jsxs(Box, { sx: {
                                            p: 2,
                                            pb: 0,
                                        }, children: [_jsxs(Stack, { children: [_jsxs(Stack, { direction: "row", spacing: 0.5, alignItems: "center", children: [_jsx(Typography, { component: "span", variant: "h4", sx: {
                                                                    fontWeight: 400,
                                                                }, children: "Xin ch\u00E0o," }), _jsx(Typography, { variant: "h4", children: user.name })] }), _jsxs(Typography, { variant: "subtitle2", children: ["Vai tr\u00F2 ", user.role] }), _jsx(Typography, { variant: "subtitle2", children: user.email })] }), _jsx(OutlinedInput, { sx: {
                                                    width: '100%',
                                                    pr: 1,
                                                    pl: 2,
                                                    my: 2,
                                                }, id: "input-search-profile", value: value, onChange: (e) => setValue(e.target.value), placeholder: "T\u00ECm ki\u1EBFm", startAdornment: _jsx(InputAdornment, { position: "start", children: _jsx(IconSearch, { stroke: 1.5, size: "1rem", color: theme.palette.grey[500] }) }), "aria-describedby": "search-helper-text", inputProps: {
                                                    'aria-label': 'weight',
                                                } }), _jsx(Divider, {})] }), _jsx(PerfectScrollbar, { style: {
                                            height: '100%',
                                            maxHeight: 'calc(100vh - 250px)',
                                            overflowX: 'hidden',
                                        }, children: _jsxs(Box, { sx: {
                                                p: 2,
                                                pt: 0,
                                            }, children: [_jsx(Divider, {}), _jsxs(List, { component: "nav", sx: {
                                                        width: '100%',
                                                        maxWidth: 360,
                                                        bgcolor: theme.palette.background.paper,
                                                    }, children: [_jsxs(ListItemButton, { selected: selectedIndex === 0, onClick: (event) => handleListItemClick(event, 0, '/profile'), children: [_jsx(ListItemIcon, { children: _jsx(IconUser, { stroke: 1.5, size: "1.25rem" }) }), _jsx(ListItemText, { primary: "Trang c\u00E1 nh\u00E2n" })] }), _jsxs(ListItemButton, { selected: selectedIndex === 1, onClick: (_event) => {
                                                                setOpenDrawerSetting(true);
                                                            }, children: [_jsx(ListItemIcon, { children: _jsx(IconSettings, { stroke: 1.5, size: "1.25rem" }) }), _jsx(ListItemText, { primary: "C\u00E0i \u0111\u1EB7t" })] }), _jsxs(ListItemButton, { onClick: handleLogout, children: [_jsx(ListItemIcon, { children: _jsx(IconLogout, { stroke: 1.5, size: "1.25rem" }) }), _jsx(ListItemText, { primary: "\u0110\u0103ng xu\u1EA5t" })] })] })] }) })] }) }) }) })) }), _jsx(DrawerSetting, { open: openDrawerSetting, onClose: () => setOpenDrawerSetting(false) })] }));
};
export default ProfileSection;
