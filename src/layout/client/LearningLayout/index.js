import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import Header from './Header';
const LearningLayout = ({ children }) => {
    return (_jsxs(Box, { children: [_jsx(Header, {}), children] }));
};
export default LearningLayout;
