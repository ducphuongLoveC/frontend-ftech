import { jsx as _jsx } from "react/jsx-runtime";
import Box from '@mui/material/Box';
// project import
import MainCard from '@/ui-component/cards/MainCard';
// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //
const AuthCardWrapper = ({ children, ...other }) => (_jsx(MainCard, { sx: {
        maxWidth: {
            xs: 400,
            lg: 475,
        },
        margin: {
            xs: 2.5,
            md: 3,
        },
        '& > *': {
            flexGrow: 1,
            flexBasis: '50%',
        },
    }, content: false, ...other, children: _jsx(Box, { children: children }) }));
export default AuthCardWrapper;
