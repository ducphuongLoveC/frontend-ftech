import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';
interface MainCardProps {
    border?: boolean;
    boxShadow?: boolean;
    children?: ReactNode;
    content?: boolean;
    contentClass?: string;
    contentSX?: SxProps<Theme>;
    darkTitle?: boolean;
    secondary?: ReactNode;
    shadow?: string | number;
    sx?: SxProps<Theme>;
    title?: ReactNode | string;
}
declare const MainCard: import("react").ForwardRefExoticComponent<MainCardProps & import("react").RefAttributes<HTMLDivElement>>;
export default MainCard;
