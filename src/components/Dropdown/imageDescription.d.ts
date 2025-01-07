import { BoxProps } from '@mui/material';
import React from 'react';
interface ImageDescriptionProps extends BoxProps {
    thumbnail?: string;
    bodyHead?: string | React.ReactNode;
    bodyContent?: string | React.ReactNode;
    bExtend?: React.ReactNode;
    hover: boolean;
    isUnRead?: boolean;
}
declare const ImageDescription: React.FC<ImageDescriptionProps>;
export default ImageDescription;
