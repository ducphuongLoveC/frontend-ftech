import React from 'react';
interface ChipProps {
    color: 'default' | 'primary' | 'secondary';
    variant: 'filled' | 'outlined';
    size: 'small' | 'medium';
    label: string;
    avatar?: React.ReactElement;
}
interface NavItemProps {
    item: {
        id: string;
        title: string;
        caption?: string;
        url?: string;
        target?: boolean;
        external?: boolean;
        disabled?: boolean;
        icon?: React.ComponentType<{
            stroke?: number;
            size?: string;
        }>;
        chip?: ChipProps;
    };
    level: number;
}
declare const NavItem: React.FC<NavItemProps>;
export default NavItem;
