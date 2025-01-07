import React from 'react';
import { LinearProgressProps } from '@mui/material/LinearProgress';
interface ProgressProps extends LinearProgressProps {
    colorText?: string;
    value: number;
    sx?: object;
    textProgress?: boolean;
}
declare const Progress: React.FC<ProgressProps>;
export default Progress;
