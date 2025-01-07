import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from '@mui/material';
const Header = ({ head, hExtend }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Typography, { sx: {
                    fontWeight: 'bold',
                    fontSize: 'var(--head-font-size)',
                    marginBottom: '10px',
                }, children: head }), hExtend] }));
};
export default Header;
