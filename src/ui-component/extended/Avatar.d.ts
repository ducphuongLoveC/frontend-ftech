import React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
interface AvatarProps {
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | string;
    outline?: boolean;
    size?: 'badge' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    sx?: SxProps<Theme>;
    [key: string]: any;
}
declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
