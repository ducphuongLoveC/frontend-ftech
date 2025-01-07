import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const HasUser = ({ children }) => {
    const user = useSelector((state) => state.authReducer.user);
    if (!user)
        return _jsx(Navigate, { to: '/auth/login' });
    return _jsx(_Fragment, { children: children });
};
export default HasUser;
