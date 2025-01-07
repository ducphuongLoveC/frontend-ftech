import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog as MuiDialog, DialogContent, DialogTitle, IconButton, Typography, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const Dialog = ({ onClose, children, title = 'Dialog', open, }) => {
    return (_jsxs(MuiDialog, { component: 'div', open: open, onClose: onClose, maxWidth: "md", fullWidth: true, children: [_jsxs(DialogTitle, { children: [_jsx(Typography, { children: title }), _jsx(IconButton, { onClick: onClose, "aria-label": "close", sx: {
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }, children: _jsx(CloseIcon, {}) })] }), _jsx(DialogContent, { children: children })] }));
};
export default Dialog;
