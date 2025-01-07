import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
// tippy
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import lodash from 'lodash';
// moment
import moment from 'moment';
// mui
import { Typography } from '@mui/material';
// redux
import { useDispatch } from 'react-redux';
import * as actionTypes from '@/store/actions';
// icon
import { BiBell } from 'react-icons/bi';
// my pj
import Dropdown from '@/components/Dropdown';
import Wrapper from '@/components/Wrapper';
import path from '@/constants/routes';
import Cookies from 'js-cookie';
// socket
import { io } from 'socket.io-client';
// api
import { deleteAllNotificationsByUserId, getNotificationById, markAllAsRead, markAsRead, } from '../../../../api/notification';
const socket = io(import.meta.env.VITE_URL_SERVER);
const LoggedIn = ({ user }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const downSM = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const { data: notifications, isLoading: isLoadingNoti, refetch, } = useQuery({
        queryKey: ['notification'],
        queryFn: () => getNotificationById(user._id),
    });
    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('user');
        dispatch({ type: actionTypes.SET_ACCESS_TOKEN, payload: '' });
        dispatch({ type: actionTypes.SET_USER, payload: '' });
    };
    const handleNotificationClick = async (notification) => {
        await markAsRead(notification._id);
        switch (notification.type) {
            case 'comment':
                const { course_id, resource_id, comment_id } = notification.data;
                navigate(`/learning/${course_id}?id=${resource_id}&comment=${comment_id}`);
                break;
        }
    };
    const handleMarkIsReadUserNotifications = async () => {
        const res = await markAllAsRead(user._id);
        if (res.status === 200) {
            refetch();
        }
    };
    const handleDeleteAllNotificationsByUserId = async () => {
        const res = await deleteAllNotificationsByUserId(user._id);
        if (res.status === 200) {
            refetch();
        }
    };
    const notificationUnReadTotal = () => {
        return notifications.reduce((acc, currentNotification) => acc + (!currentNotification.isRead ? 1 : 0), 0);
    };
    // socket notification
    useEffect(() => {
        console.log(user._id);
        socket.emit('joinNotificationRoom', user._id);
        socket.on('newNotification', (data) => {
            refetch();
            console.log(data);
        });
        return () => {
            socket.emit('leaveNotificationRoom', user._id);
            socket.off('newNotification');
        };
    }, []);
    if (isLoadingNoti)
        return _jsx("div", { children: "Loading..." });
    return (_jsxs(_Fragment, { children: [_jsx("li", { className: `tw-relative ${downSM ? 'tw-ml-1' : 'tw-ml-4'}`, children: _jsxs("div", { className: `tw-text-xl`, children: [notificationUnReadTotal() > 0 && (_jsx("span", { className: "tw-absolute -tw-top-2 tw-bg-red-500 -tw-right-3.5 tw-text-white tw-pl-1.5 tw-text-sm tw-rounded-full tw-h-5 tw-w-5", children: notificationUnReadTotal() })), _jsx(HeadlessTippy, { trigger: "click", placement: "top-end", interactive: true, allowHTML: true, render: (attrs) => (_jsx(Wrapper, { style: {
                                    background: theme.palette.background.paper,
                                    width: '450px',
                                    maxHeight: '70vh',
                                    overflow: 'auto',
                                }, ...attrs, children: _jsxs(Dropdown.Container, { children: [_jsx(Dropdown.Header, { head: "Th\u00F4ng b\u00E1o", hExtend: _jsxs("div", { className: "tw-flex tw-justify-between", children: [_jsx(Button, { onClick: handleMarkIsReadUserNotifications, className: "tw-py-2", children: "\u0110\u00E1nh d\u1EA5u l\u00E0 \u0111\u00E3 \u0111\u1ECDc" }), _jsx(Button, { onClick: handleDeleteAllNotificationsByUserId, className: "tw-text-red-500", children: "x\u00F3a" })] }) }), notifications.length > 0 ? (notifications.map((n, index) => (_jsx(Dropdown.ImageDescription, { isUnRead: !n.isRead, onClick: () => handleNotificationClick(n), hover: true, thumbnail: n.data.thumbnail, bodyHead: _jsx(Typography, { dangerouslySetInnerHTML: { __html: n.data.title } }), bodyContent: _jsx(Typography, { dangerouslySetInnerHTML: {
                                                    __html: lodash.truncate(n.data.content, { length: 40, omission: '...' }),
                                                } }), bExtend: _jsx("p", { style: {
                                                    fontSize: 'var(--mini-font-size)',
                                                }, children: moment(n.createdAt).fromNow() }) }, index)))) : (_jsx(Typography, { textAlign: 'center', children: "Kh\u00F4ng c\u00F3 th\u00F4ng b\u00E1o" }))] }) })), children: _jsx(Tippy, { content: "Th\u00F4ng b\u00E1o", children: _jsx("i", { className: "tw-cursor-pointer tw-select-none", children: _jsx(BiBell, {}) }) }) })] }) }), _jsx("li", { className: `${downSM ? 'tw-ml-1' : 'tw-ml-4'}`, children: _jsx(HeadlessTippy, { trigger: "click", placement: "bottom-end", interactive: true, allowHTML: true, render: (attrs) => (_jsxs(Wrapper, { style: {
                            background: theme.palette.background.paper,
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            padding: '1rem',
                        }, ...attrs, children: [_jsxs("div", { className: "tw-flex tw-items-center tw-mb-4", children: [_jsx("img", { src: user.profile_picture, className: "tw-rounded-full tw-h-12 tw-w-12 tw-object-cover tw-max-w-full tw-max-h-full tw-min-w-[48px] tw-min-h-[48px]", alt: "User Avatar" }), _jsxs("div", { className: "tw-ml-3", children: [_jsx("p", { className: "tw-font-semibold", children: user.name }), _jsx("p", { className: "tw-text-white-500 tw-text-sm", children: user.email })] })] }), _jsx("hr", { className: "tw-my-2" }), _jsxs("ul", { children: [_jsx("li", { className: "tw-py-2 tw-cursor-pointer", children: _jsx(Link, { to: `/profile?id=${user._id}`, children: "Trang c\u00E1 nh\u00E2n" }) }), _jsx("li", { className: "tw-py-2 tw-cursor-pointer", children: _jsx(Link, { to: path.client.myCourses, children: "Kh\u00F3a h\u1ECDc c\u1EE7a t\u00F4i" }) }), _jsx("li", { className: "tw-py-2 tw-cursor-pointer", children: _jsx(Link, { to: path.client.checkCertificate, children: "T\u00ECm ch\u1EE9ng ch\u1EC9" }) }), _jsx("li", { className: "tw-py-2 tw-cursor-pointer", children: _jsx(Link, { to: path.client.setting, children: "C\u00E0i \u0111\u1EB7t" }) }), _jsx("li", { onClick: handleLogout, className: "tw-py-2 tw-text-red-500 tw-cursor-pointer", children: "\u0110\u0103ng xu\u1EA5t" })] })] })), children: _jsx(Tippy, { content: "Trang c\u00E1 nh\u00E2n", children: _jsx(Box, { className: "tw-cursor-pointer", children: _jsx("img", { style: { border: `3px solid ${theme.palette.divider}` }, src: user.profile_picture, className: "tw-rounded-full tw-h-9 tw-w-9 tw-object-cover tw-max-w-full tw-max-h-full tw-min-w-[36px] tw-min-h-[36px]", alt: "User Avatar" }) }) }) }) })] }));
};
export default LoggedIn;
