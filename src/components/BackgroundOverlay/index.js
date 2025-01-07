import { jsx as _jsx } from "react/jsx-runtime";
import { styled, Box } from '@mui/material';
const BackgroundOverlayStyle = styled(Box)(({ open }) => ({
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    opacity: open ? 1 : 0,
    transition: 'opacity 0.2s ease-in-out',
    pointerEvents: open ? 'auto' : 'none',
    willChange: 'opacity',
}));
const BackgroundOverlay = ({ open, ...otherProps }) => {
    return _jsx(BackgroundOverlayStyle, { open: open, ...otherProps });
};
export default BackgroundOverlay;
