import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Box, Collapse, Fade, Grow, Slide, Zoom, } from '@mui/material';
// ==============================|| TRANSITIONS ||============================== //
const Transitions = React.forwardRef(({ children, position = 'top-left', type = 'grow', direction = 'up', ...others }, ref) => {
    let positionSX = {
        transformOrigin: '0 0 0',
    };
    switch (position) {
        case 'top-right':
            positionSX = {
                transformOrigin: 'top right',
            };
            break;
        case 'top':
            positionSX = {
                transformOrigin: 'top',
            };
            break;
        case 'bottom-left':
            positionSX = {
                transformOrigin: 'bottom left',
            };
            break;
        case 'bottom-right':
            positionSX = {
                transformOrigin: 'bottom right',
            };
            break;
        case 'bottom':
            positionSX = {
                transformOrigin: 'bottom',
            };
            break;
        case 'top-left':
        default:
            positionSX = {
                transformOrigin: '0 0 0',
            };
            break;
    }
    return (_jsxs(Box, { ref: ref, children: [type === 'grow' && (_jsx(Grow, { ...others, children: _jsx(Box, { sx: positionSX, children: children }) })), type === 'collapse' && (_jsx(Collapse, { ...others, sx: positionSX, children: children })), type === 'fade' && (_jsx(Fade, { ...others, timeout: {
                    appear: 500,
                    enter: 600,
                    exit: 400,
                }, children: _jsx(Box, { sx: positionSX, children: children }) })), type === 'slide' && (_jsx(Slide, { ...others, timeout: {
                    appear: 0,
                    enter: 400,
                    exit: 200,
                }, direction: direction, children: _jsx(Box, { sx: positionSX, children: children }) })), type === 'zoom' && (_jsx(Zoom, { ...others, children: _jsx(Box, { sx: positionSX, children: children }) }))] }));
});
export default Transitions;
