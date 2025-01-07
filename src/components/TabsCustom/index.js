import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Tabs, Tab, Box, useTheme } from '@mui/material';
import TabPanel from './TabPanel';
const TabsCustom = ({ labels, contents, onChange }) => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const handleChange = (_event, newValue) => {
        setValue(newValue);
        onChange();
    };
    return (_jsxs(Box, { sx: {
            boxShadow: 'var(--main-box-shadow)',
        }, children: [_jsx(Tabs, { value: value, onChange: handleChange, "aria-label": "customized tabs example", sx: {
                    '& .MuiTabs-indicator': {
                        backgroundColor: theme.palette.text.primary,
                    },
                    boxShadow: "var(--main-box-shadow)"
                }, children: labels.map((label, index) => (_jsx(Tab, { label: label, sx: {
                        color: value === index ? '' : 'gray',
                        '&.Mui-selected': {
                            color: theme.palette.text.primary,
                        },
                        '&:hover': {
                            color: 'darkgray',
                        },
                    } }, index))) }), _jsx(Box, { children: contents.map((content, index) => (_jsxs(TabPanel, { value: value, index: index, children: [content, " "] }, index))) })] }));
};
export default TabsCustom;
