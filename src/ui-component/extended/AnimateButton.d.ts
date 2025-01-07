import React, { ReactNode } from 'react';
interface Scale {
    hover?: number;
    tap?: number;
}
interface AnimateButtonProps {
    children: ReactNode;
    type?: 'slide' | 'scale' | 'rotate';
    direction?: 'up' | 'down' | 'left' | 'right';
    offset?: number;
    scale?: number | Scale;
}
declare const AnimateButton: React.ForwardRefExoticComponent<AnimateButtonProps & React.RefAttributes<HTMLDivElement>>;
export default AnimateButton;
