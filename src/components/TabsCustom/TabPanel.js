import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from '@mui/material';
const TabPanel = ({ children, index, value }) => {
    return (_jsx("div", { role: "tabpanel", id: `tabpanel-${index}`, "aria-labelledby": `tab-${index}`, children: _jsx(Box, { p: 2, hidden: value !== index, children: children }) }));
};
export default TabPanel;
