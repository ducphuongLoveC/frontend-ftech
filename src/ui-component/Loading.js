import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, Typography } from '@mui/material';
import { BeatLoader } from 'react-spinners';
export default function Loading() {
    return (_jsx(Dialog, { open: true, disableEscapeKeyDown: true, children: _jsxs(DialogContent, { sx: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                px: 5,
            }, children: [_jsx(BeatLoader, {}), _jsx(Typography, { mt: 2, variant: "body1", gutterBottom: true, children: "Vui l\u00F2ng \u0111\u1EE3i..." })] }) }));
}
