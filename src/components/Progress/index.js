import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const Progress = ({ colorText, textProgress = true, value, sx, ...rest }) => {
    return (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', ...sx }, children: [_jsx(Box, { sx: { flexGrow: 1, mr: 1 }, children: _jsx(LinearProgress, { variant: "determinate", value: value, ...rest, sx: {
                        height: '5px',
                        borderRadius: '5px',
                        backgroundColor: '#ffffff',
                        '& .MuiLinearProgress-bar': {
                            background: 'var(--color-primary)',
                            borderRadius: '5px',
                        },
                    } }) }), textProgress && (_jsx(Typography, { variant: "caption", color: colorText || 'white', mr: 1, children: `${Math.round(value)}%` }))] }));
};
export default Progress;
