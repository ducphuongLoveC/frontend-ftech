import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const RedirectIfAuthenticated = ({ children }) => {
    const token = useSelector((state) => state.authReducer.accessToken);
    if (token) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx("div", { children: children });
};
export default RedirectIfAuthenticated;
