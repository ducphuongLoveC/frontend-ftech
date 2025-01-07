import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AnimateButton from '@/ui-component/extended/AnimateButton';
// assets
import { IconSettings } from '@tabler/icons-react';
import DrawerSetting from '../DrawerSetting';
// ==============================|| LIVE CUSTOMIZATION ||============================== //
const Customization = () => {
    const theme = useTheme();
    // drawer on/off
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Tooltip, { title: "Live Customize", children: _jsx(Fab, { component: "div", onClick: handleToggle, size: "medium", variant: "circular", color: "secondary", sx: {
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '4px',
                        bottom: '0',
                        position: 'fixed',
                        right: 10,
                        zIndex: theme.zIndex.speedDial,
                    }, children: _jsx(AnimateButton, { type: "rotate", children: _jsx(IconButton, { color: "inherit", size: "large", disableRipple: true, children: _jsx(IconSettings, {}) }) }) }) }), _jsx(DrawerSetting, { onClose: () => setOpen(false), open: open })] }));
};
export default Customization;
