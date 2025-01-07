import React from 'react';
interface TransitionsProps {
    children?: React.ReactNode;
    type?: 'grow' | 'fade' | 'collapse' | 'slide' | 'zoom';
    position?: 'top-left' | 'top-right' | 'top' | 'bottom-left' | 'bottom-right' | 'bottom';
    direction?: 'up' | 'down' | 'left' | 'right';
    [key: string]: any;
}
declare const Transitions: React.FC<TransitionsProps>;
export default Transitions;
