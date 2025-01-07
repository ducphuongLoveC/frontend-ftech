import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
// project imports
import Customization from '../Customization';
// ==============================|| MINIMAL LAYOUT ||============================== //
const MinimalLayout = () => (_jsxs(_Fragment, { children: [_jsx(Outlet, {}), _jsx(Customization, {})] }));
export default MinimalLayout;
