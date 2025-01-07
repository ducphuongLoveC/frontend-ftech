import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ButtonBase from '@mui/material/ButtonBase';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
// project imports
import MainCard from '@/ui-component/cards/MainCard';
import Transitions from '@/ui-component/extended/Transitions';
import NotificationList from './NotificationList';
// assets
import { IconBell } from '@tabler/icons-react';
// notification status options
const status = [
    {
        value: 'all',
        label: 'All Notification',
    },
    {
        value: 'new',
        label: 'New',
    },
    {
        value: 'unread',
        label: 'Unread',
    },
    {
        value: 'other',
        label: 'Other',
    },
];
// ==============================|| NOTIFICATION ||============================== //
const NotificationSection = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const anchorRef = useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current?.focus();
        }
        prevOpen.current = open;
    }, [open]);
    const handleChange = (event) => {
        if (event.target.value)
            setValue(event.target.value);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Box, { sx: {
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2,
                    },
                }, children: _jsx(ButtonBase, { sx: {
                        borderRadius: '12px',
                        // boxShadow: theme.shadows[16],
                    }, ref: anchorRef, "aria-controls": open ? 'menu-list-grow' : undefined, "aria-haspopup": "true", onClick: handleToggle, color: "inherit", children: _jsx(IconBell, { stroke: 1.5, size: "1.3rem" }) }) }), _jsx(Popper, { placement: matchesXs ? 'bottom' : 'bottom-end', open: open, anchorEl: anchorRef.current, role: undefined, transition: true, disablePortal: true, popperOptions: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20],
                            },
                        },
                    ],
                }, children: ({ TransitionProps }) => (_jsx(Transitions, { position: matchesXs ? 'top' : 'top-right', in: open, ...TransitionProps, children: _jsx(Paper, { elevation: 16, sx: {
                            boxShadow: theme.shadows[16],
                        }, children: _jsx(ClickAwayListener, { onClickAway: handleClose, children: _jsxs(MainCard, { border: false, content: false, sx: {
                                    boxShadow: theme.shadows[16],
                                }, children: [_jsxs(Grid, { container: true, direction: "column", spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, children: _jsxs(Grid, { container: true, alignItems: "center", justifyContent: "space-between", sx: {
                                                        pt: 2,
                                                        px: 2,
                                                    }, children: [_jsx(Grid, { item: true, children: _jsxs(Stack, { direction: "row", spacing: 2, children: [_jsx(Typography, { variant: "subtitle1", children: "All Notification" }), _jsx(Chip, { size: "small", label: "01", sx: {
                                                                            color: theme.palette.background.default,
                                                                            bgcolor: theme.palette.warning.dark,
                                                                        } })] }) }), _jsx(Grid, { item: true, children: _jsx(Typography, { component: Link, to: "#", variant: "subtitle2", color: "primary", children: "Mark as all read" }) })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(PerfectScrollbar, { style: {
                                                        height: '100%',
                                                        maxHeight: 'calc(100vh - 205px)',
                                                        overflowX: 'hidden',
                                                    }, children: [_jsxs(Grid, { container: true, direction: "column", spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(Box, { sx: {
                                                                            px: 2,
                                                                            pt: 0.25,
                                                                        }, children: _jsx(TextField, { id: "outlined-select-currency-native", select: true, fullWidth: true, value: value, onChange: handleChange, SelectProps: {
                                                                                native: true,
                                                                            }, children: status.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) }) }) }), _jsx(Grid, { item: true, xs: 12, p: 0, children: _jsx(Divider, { sx: {
                                                                            my: 0,
                                                                        } }) })] }), _jsx(NotificationList, {})] }) })] }), _jsx(Divider, {}), _jsx(CardActions, { sx: {
                                            p: 1.25,
                                            justifyContent: 'center',
                                        }, children: _jsx(Button, { size: "small", disableElevation: true, children: "View All" }) })] }) }) }) })) })] }));
};
export default NotificationSection;
