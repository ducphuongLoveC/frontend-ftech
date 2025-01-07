import React from 'react';
import { BoxProps } from '@mui/material';
interface BackgroundOverlayProps extends BoxProps {
    open: boolean;
}
declare const BackgroundOverlay: React.FC<BackgroundOverlayProps>;
export default BackgroundOverlay;
