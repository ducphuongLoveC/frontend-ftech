import { jsx as _jsx } from "react/jsx-runtime";
import Header from './Header';
import ImageDescription from './imageDescription';
import { Box } from '@mui/material';
const Container = ({ children }) => {
    return _jsx(Box, { children: children });
};
const Dropdown = {
    Container,
    Header,
    ImageDescription,
};
export default Dropdown;
