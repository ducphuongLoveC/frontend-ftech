import React from 'react';
interface PlacementToggleProps {
    placement: 'left' | 'right' | 'top' | 'bottom';
    Connect: (connect: () => void) => React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
}
declare const PlacementToggle: React.FC<PlacementToggleProps>;
export default PlacementToggle;
