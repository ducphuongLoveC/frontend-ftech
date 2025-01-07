import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import Logo from '@/ui-component/Logo';
// ===============================|| FOOTER ||=============================== //
const Footer = () => {
    const theme = useTheme();
    return (_jsx("footer", { style: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            marginTop: '20px',
        }, children: _jsxs("div", { className: "tw-container tw-mx-auto tw-px-5 tw-py-16", children: [_jsxs("div", { className: "tw-flex tw-flex-col md:tw-flex-row", children: [_jsx("div", { className: "tw-basis-2/6", children: _jsxs("div", { className: "tw-p-5", children: [_jsx(Logo, {}), _jsxs("div", { children: [_jsx("h5", { className: "tw-font-medium tw-mt-4 tw-mb-3", style: {
                                                    color: theme.palette.text.secondary,
                                                }, children: "Li\u00EAn h\u1EC7 v\u1EDBi ch\u00FAng t\u00F4i" }), _jsxs("div", { className: "tw-text-sm", children: [_jsx("div", { className: "tw-mb-2", children: "+0123456789" }), _jsx("div", { className: "tw-mb-2", children: "email.com" }), _jsx("div", { className: "tw-mb-2", children: "9AM- 5PM, Monday - Friday" }), _jsx("div", { className: "tw-mb-2", children: "Nh\u00E0 s\u1ED1 10, 379 Xu\u00E2n Ph\u01B0\u01A1ng, Nam T\u1EEB Li\u00EAm, H\u00E0 N\u1ED9i" })] })] })] }) }), _jsx("div", { className: "tw-basis-1/6", children: _jsxs("div", { className: "tw-p-4", children: [_jsx("h5", { className: "tw-font-medium tw-mt-4 tw-mb-3", style: {
                                            color: theme.palette.text.secondary,
                                        }, children: "C\u00E1c li\u00EAn k\u1EBFt kh\u00E1c" }), _jsx("ul", { className: "tw-list-none tw-mt-4", children: [
                                            'Start here',
                                            'Blogs',
                                            'About us',
                                            'Contact Us',
                                            'Career',
                                            'Courses',
                                        ].map((link, index) => (_jsx("li", { children: _jsxs(Link, { to: "/", className: "tw-text-sm", style: {
                                                    color: theme.palette.text.primary,
                                                }, children: [_jsx("i", { className: "fa-solid fa-chevron-right tw-text-xs tw-mr-3" }), link] }) }, index))) })] }) }), _jsx("div", { className: "tw-basis-1/6", children: _jsxs("div", { className: "tw-p-4", children: [_jsx("h5", { className: "tw-font-medium tw-mt-4 tw-mb-3", style: {
                                            color: theme.palette.text.secondary,
                                        }, children: "S\u1EA3n ph\u1EA9m" }), _jsx("ul", { className: "tw-list-none tw-mt-4", children: [
                                            'Start here',
                                            'Blogs',
                                            'About us',
                                            'Contact Us',
                                            'Career',
                                            'Courses',
                                        ].map((info, index) => (_jsx("li", { children: _jsxs(Link, { to: "/", className: "tw-text-sm", style: {
                                                    color: theme.palette.text.primary,
                                                }, children: [_jsx("i", { className: "fa-solid fa-chevron-right tw-text-xs tw-mr-3" }), info] }) }, index))) })] }) }), _jsx("div", { className: "tw-basis-2/6", children: _jsxs("div", { className: "tw-p-4", children: [_jsx("h5", { className: "tw-font-medium tw-mt-4 tw-mb-3", style: {
                                            color: theme.palette.text.secondary,
                                        }, children: "M\u1EA1ng x\u00E3 h\u1ED9i" }), _jsx("p", { className: "tw-text-sm", children: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut odit magnam officia sequi aliquid facere corporis dolorem beatae? Dolore pariatur illo odio nulla atque quibusdam dicta ut tempore, suscipit est." }), _jsxs("p", { className: "tw-mt-4 tw-relative", children: [_jsx("input", { style: {
                                                    border: `1px solid ${theme.palette.background.paper2}`,
                                                }, type: "email", placeholder: "Email c\u1EE7a b\u1EA1n", className: "tw-w-full tw-p-3 tw-pl-5 tw-rounded-full  tw-placeholder:text-gray-700" }), _jsx("span", { className: "tw-cursor-pointer tw-absolute tw-top-1 tw-right-2 tw-text-white tw-px-5 tw-p-2 tw-rounded-full tw-uppercase", style: {
                                                    background: 'var(--color-primary)',
                                                }, children: "G\u1EEDi ngay" })] })] }) })] }), _jsx("div", { className: "tw-text-center tw-mt-4" }), _jsx("div", { children: _jsx(Link, { id: "scroll-to-top", to: "#top", className: "tw-transition tw-hidden tw-shadow tw-bottom-1 tw-right-1 tw-w-14 tw-h-14 tw-rounded-[50%] tw-bg-red-600 tw-hover:opacity-80 tw-z-50 tw-border tw-group", style: {
                            backgroundColor: theme.palette.primary.main,
                        }, children: _jsx("i", { className: "fa-solid fa-arrow-up tw-transition tw-pt-5 tw-pl-5 tw-text-white tw-group-hover:-translate-y-2" }) }) })] }) }));
};
export default Footer;
