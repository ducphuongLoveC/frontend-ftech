import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { Box, styled, Button } from '@mui/material';
// Icon
import CloseIcon from '@mui/icons-material/Close';
// My project components
import BackgroundOverlay from '../BackgroundOverlay';
// Wrapper with support for 'top', 'bottom', 'left', and 'right' placements
const Wrapper = styled(Box)(({ open, placement, theme, }) => {
    const getPositionStyles = () => {
        switch (placement) {
            case 'left':
                return {
                    width: '100%', // Default width
                    left: '0',
                    right: 'auto',
                    top: '0',
                    bottom: '0',
                    [theme.breakpoints.up('sm')]: {
                        width: '500px',
                    },
                    [theme.breakpoints.up('md')]: {
                        width: '600px',
                    },
                    [theme.breakpoints.up('lg')]: {
                        width: '700px',
                    },
                    height: '100vh',
                    transform: open ? 'translateX(0)' : 'translateX(-100%)',
                };
            case 'right':
                return {
                    width: '100%', // Default width
                    right: '0',
                    left: 'auto',
                    top: '0',
                    bottom: '0',
                    [theme.breakpoints.up('sm')]: {
                        width: '500px',
                    },
                    [theme.breakpoints.up('md')]: {
                        width: '600px',
                    },
                    [theme.breakpoints.up('lg')]: {
                        width: '700px',
                    },
                    height: '100vh',
                    transform: open ? 'translateX(0)' : 'translateX(100%)',
                };
            case 'top':
                return {
                    top: '0',
                    bottom: 'auto',
                    left: '0',
                    right: '0',
                    width: '100vw',
                    height: '500px',
                    transform: open ? 'translateY(0)' : 'translateY(-100%)',
                };
            case 'bottom':
                return {
                    bottom: '0',
                    top: 'auto',
                    left: '0',
                    right: '0',
                    width: '100vw',
                    height: '500px',
                    transform: open ? 'translateY(0)' : 'translateY(100%)',
                };
            default:
                return {};
        }
    };
    return {
        position: 'fixed',
        zIndex: 9999,
        transition: 'transform 0.2s ease-in-out',
        background: theme.palette.background.paper,
        overflow: 'auto',
        ...getPositionStyles(),
    };
});
const PlacementToggle = React.memo(({ placement, Connect, children, defaultOpen = false }) => {
    const [isOpenWrapper, setIsOpenWrapper] = useState(defaultOpen);
    const handleToggleWrapper = () => {
        window.requestAnimationFrame(() => {
            setIsOpenWrapper(!isOpenWrapper);
        });
    };
    useEffect(() => {
        setIsOpenWrapper(defaultOpen);
    }, [defaultOpen]);
    return (_jsxs(Box, { position: "relative", children: [Connect(handleToggleWrapper), _jsx(BackgroundOverlay, { onClick: handleToggleWrapper, open: isOpenWrapper }), _jsxs(Wrapper, { open: isOpenWrapper, placement: placement, children: [children, _jsx(Button, { onClick: handleToggleWrapper, sx: { position: 'absolute', top: '0', right: '0' }, children: _jsx(CloseIcon, {}) })] })] }));
});
export default PlacementToggle;
