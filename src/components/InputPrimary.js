import { jsx as _jsx } from "react/jsx-runtime";
import { TextField } from '@mui/material';
import { useTheme } from '@mui/material';
const InputPrimary = ({ ...props }) => {
    const theme = useTheme();
    const sxes = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.text.primary,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.text.primary,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.text.primary,
            },
            backgroundColor: theme.palette.background.paper,
        },
        '& .MuiInputLabel-root': {
            color: theme.palette.text.primary,
            '&.Mui-focused': {
                color: theme.palette.text.primary,
            },
        },
        ...(props.sx || {}),
    };
    return (_jsx(TextField, { fullWidth: true, variant: "outlined", ...props, sx: sxes }));
};
export default InputPrimary;
