import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import mainRoutes from './mainRoutes';
import privateRoutes from './privateRoutes';
import subDomainRouter from '../helpers/subDomainRouter';
import getMainDomain from '@/utils/getMainDoumain';
import NotFound from '@/views/pages/NotFound';
import ResetScroll from '@/components/ResetScroll';
import Cookies from 'js-cookie';
const createRoutes = (routes) => {
    return (_jsxs(Router, { children: [_jsx(ResetScroll, {}), _jsxs(Routes, { children: [routes.map((route, index) => {
                        const Middleware = route.middleware || Fragment;
                        const Layout = route.layout || Fragment;
                        const Page = route.page;
                        return (_jsx(Route, { path: route.path, element: _jsx(Middleware, { children: _jsx(Layout, { children: _jsx(Page, {}) }) }) }, index));
                    }), !getMainDomain().url.hostname.includes('admin') && _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] })] }));
};
const subRouter = [
    {
        sub: 'admin',
        routes: privateRoutes,
        isAuthentication: true,
        handleAuthentication: () => {
            const params = new URLSearchParams(window.location.search);
            const info = params.get('info');
            const accessToken = params.get('accessToken');
            let user;
            if (info) {
                user = JSON.parse(decodeURIComponent(info));
            }
            if (Cookies.get('user') && Cookies.get('accessToken')) {
                return true;
            }
            if (user && accessToken && user.role === 'admin') {
                Cookies.set('user', info || '', { domain: 'admin.localhost', expires: 7 });
                Cookies.set('accessToken', accessToken || '', { domain: 'admin.localhost', expires: 7 });
                return true;
            }
            window.location.href = import.meta.env.VITE_URL_MAIN + 'log-auth';
            return false;
        },
    },
];
const router = createRoutes(subDomainRouter(subRouter, mainRoutes));
export { router };
