import { jsx as _jsx } from "react/jsx-runtime";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
// ==============================|| LOADER ||============================== //
const Loader = () => {
    return (_jsx(Box, { sx: {
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            width: '100%',
        }, children: _jsx(LinearProgress, { color: 'primary' }) }));
};
export default Loader;
