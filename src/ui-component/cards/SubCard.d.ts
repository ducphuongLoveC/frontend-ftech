import React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
interface SubCardProps {
    children?: React.ReactNode;
    content?: boolean;
    contentClass?: string;
    darkTitle?: boolean;
    secondary?: React.ReactNode;
    sx?: SxProps<Theme>;
    contentSX?: SxProps<Theme>;
    title?: React.ReactNode;
}
declare const SubCard: React.ForwardRefExoticComponent<SubCardProps & React.RefAttributes<HTMLDivElement>>;
export default SubCard;
