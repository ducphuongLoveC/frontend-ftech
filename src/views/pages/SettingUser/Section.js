import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import { useState } from 'react';
const Section = ({ data, onChange }) => {
    const [currentSection, setCurrentSection] = useState(data[0]);
    const theme = useTheme();
    const handleChange = (s) => {
        setCurrentSection(s);
        onChange(s);
    };
    return (_jsxs("div", { className: "tw-w-full md:tw-w-2/4 tw-p-4 md:tw-p-20  tw-border-r-2", style: { background: theme.palette.background.paper }, children: [_jsx("h2", { className: "tw-text-2xl  tw-font-bold tw-mb-3", children: "C\u00E0i \u0111\u1EB7t t\u00E0i kho\u1EA3n" }), _jsx("p", { className: "tw-mb-3 tw-text-xs ", children: "Qu\u1EA3n l\u00FD c\u00E0i \u0111\u1EB7t t\u00E0i kho\u1EA3n c\u1EE7a b\u1EA1n nh\u01B0 th\u00F4ng tin c\u00E1 nh\u00E2n, c\u00E0i \u0111\u1EB7t b\u1EA3o m\u1EADt, qu\u1EA3n l\u00FD th\u00F4ng b\u00E1o, v.v." }), _jsx("div", { className: "tw-space-y-4", children: data.map((s) => (_jsx("button", { className: `tw-w-full tw-py-2 tw-px-4 tw-rounded-md ${currentSection.field === s.field ? 'tw-bg-[#36404D] tw-text-white' : 'tw-bg-transparent tw-hover:bg-gray-100 '}`, onClick: () => handleChange(s), children: _jsx("span", { className: "tw-font-semibold", children: s.field }) }))) })] }));
};
export default Section;
