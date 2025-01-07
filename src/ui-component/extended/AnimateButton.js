import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { motion, useCycle } from 'framer-motion';
// ==============================|| ANIMATION BUTTON ||============================== //
const AnimateButton = React.forwardRef(({ children, type = 'scale', direction = 'right', offset = 10, scale }, ref) => {
    let offset1;
    let offset2;
    switch (direction) {
        case 'up':
        case 'left':
            offset1 = offset;
            offset2 = 0;
            break;
        case 'right':
        case 'down':
        default:
            offset1 = 0;
            offset2 = offset;
            break;
    }
    const [x, cycleX] = useCycle(offset1, offset2);
    const [y, cycleY] = useCycle(offset1, offset2);
    switch (type) {
        case 'rotate':
            return (_jsx(motion.div, { ref: ref, animate: {
                    rotate: 360,
                }, transition: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 2,
                    repeatDelay: 0,
                }, children: children }));
        case 'slide':
            if (direction === 'up' || direction === 'down') {
                return (_jsx(motion.div, { ref: ref, animate: {
                        y: y !== undefined ? y : '',
                    }, onHoverEnd: () => cycleY(), onHoverStart: () => cycleY(), children: children }));
            }
            return (_jsx(motion.div, { ref: ref, animate: {
                    x: x !== undefined ? x : '',
                }, onHoverEnd: () => cycleX(), onHoverStart: () => cycleX(), children: children }));
        case 'scale':
        default:
            const scaleValue = typeof scale === 'number'
                ? {
                    hover: scale,
                    tap: scale,
                }
                : scale;
            return (_jsx(motion.div, { ref: ref, whileHover: {
                    scale: scaleValue?.hover,
                }, whileTap: {
                    scale: scaleValue?.tap,
                }, children: children }));
    }
});
export default AnimateButton;
