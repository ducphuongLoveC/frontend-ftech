import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from '@mui/material';
const WrapperCard = ({ children }) => {
    return (_jsx(Box, { sx: {
            width: '100%',
            transition: 'transform 0.3s ease',
            ':hover': {
                transform: 'translateY(-5px)',
            },
            borderRadius: 'var(--main-border-radius)',
            overflow: 'hidden',
        }, children: children }));
};
export default WrapperCard;
