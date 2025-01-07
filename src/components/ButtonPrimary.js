import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@mui/material';
import { useTheme } from '@mui/material';
const ButtonPrimary = ({ children, customVariant = 'primary', ...props }) => {
    const theme = useTheme();
    let sxes = {
        padding: 'var(--medium-p) 50px',
        ...(props.sx || {}),
    };
    switch (customVariant) {
        case 'outlined':
            sxes = {
                ...sxes,
                color: 'var(--color-primary)',
                border: `1px solid ${theme.palette.text.primary}`,
                background: 'transparent',
            };
            break;
        case 'primary':
            sxes = {
                ...sxes,
                color: 'white',
                background: 'var(--color-primary)',
            };
            break;
        default:
            sxes = { ...sxes };
    }
    return (_jsx(Button, { ...props, sx: sxes, children: children }));
};
export default ButtonPrimary;
