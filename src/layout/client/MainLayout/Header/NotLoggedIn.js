import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const NotLoggedIn = () => {
    return (_jsxs(_Fragment, { children: [_jsx("li", { children: _jsx(Link, { to: "/auth/register", className: "tw-hidden sm:tw-block tw-px-5 tw-py-2 tw-rounded-md", children: "\u0110\u0103ng k\u00FD" }) }), _jsx("li", { children: _jsx(Link, { to: "/auth/login", className: "tw-bg-gradient-to-r tw-from-[#00C9FF] tw-to-[#92FE9D] tw-text-white tw-px-4 tw-p-2 tw-rounded-full tw-whitespace-nowrap tw-max-w-max", children: "\u0110\u0103ng nh\u1EADp" }) })] }));
};
export default NotLoggedIn;
