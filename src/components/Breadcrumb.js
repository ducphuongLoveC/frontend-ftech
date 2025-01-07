import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    return (_jsxs(Breadcrumbs, { sx: { mb: 1 }, "aria-label": "breadcrumb", separator: '/', children: [_jsx(Link, { underline: "hover", color: "inherit", component: RouterLink, to: "/", children: "Home" }), pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                return isLast ? (_jsx(Typography, { color: "text.primary", children: value.charAt(0).toUpperCase() + value.slice(1) }, to)) : (_jsx(Link, { underline: "hover", color: "inherit", component: RouterLink, to: to, children: value.charAt(0).toUpperCase() + value.slice(1) }, to));
            })] }));
};
export default Breadcrumb;
