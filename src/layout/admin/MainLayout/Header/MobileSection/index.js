import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Toolbar from '@mui/material/Toolbar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchSection from '../SearchSection';
import ProfileSection from '../ProfileSection';
import Transitions from '@/ui-component/extended/Transitions';
// ==============================|| HEADER CONTENT - MOBILE ||============================== //
const MobileSection = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current &&
            anchorRef.current.contains(event?.target)) {
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
    return (_jsxs(_Fragment, { children: [_jsx(Box, { sx: {
                    flexShrink: 0,
                    ml: 0.75,
                }, children: _jsx(IconButton, { component: "span", disableRipple: true, sx: {
                        bgcolor: open ? 'grey.300' : 'grey.100',
                    }, ref: anchorRef, "aria-controls": open ? 'menu-list-grow' : undefined, "aria-haspopup": "true", onClick: handleToggle, color: "inherit", children: _jsx(MoreHorizIcon, {}) }) }), _jsx(Popper, { placement: "bottom-end", open: open, anchorEl: anchorRef.current, role: undefined, transition: true, disablePortal: true, style: {
                    width: '100%',
                }, popperOptions: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 9],
                            },
                        },
                    ],
                }, children: ({ TransitionProps }) => (_jsx(Transitions, { type: "fade", in: open, ...TransitionProps, children: _jsx(Paper, { sx: {
                            boxShadow: theme.customShadows.z1,
                        }, children: _jsx(ClickAwayListener, { onClickAway: handleClose, children: _jsx(AppBar, { color: "inherit", children: _jsxs(Toolbar, { children: [_jsx(SearchSection, {}), _jsx(ProfileSection, {})] }) }) }) }) })) })] }));
};
export default MobileSection;
