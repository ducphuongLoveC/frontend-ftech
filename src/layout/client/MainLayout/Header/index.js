import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { Box } from '@mui/material';
import { BiAdjust, BiX } from 'react-icons/bi';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
// import my project
import Logo from '@/ui-component/Logo';
import Wrapper from '@/components/Wrapper';
import s from './Header.module.scss';
import { TOGGLE_THEME_HOME } from '@/store/actions';
import { useTheme, styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import useDebounce from '@/hooks/useDebounce';
import { BeatLoader } from 'react-spinners';
import LoggedIn from './LoggedIn';
import NotLoggedIn from './NotLoggedIn';
import { getCourseSearch } from '@/api/courseApi';
import path from '@/constants/routes';
import SearchIcon from '@mui/icons-material/Search';
// ==============================|| NAVBAR ||============================== //
const ContentSearch = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    margin: '5px 10px',
}));
const ImageContentSearch = styled('img')(() => ({
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginRight: '10px',
}));
const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const homeState = useSelector((state) => state.homeReducer);
    const authState = useSelector((state) => state.authReducer);
    const [isLoading, setIsloading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [dataSearch, setDataSearch] = useState([]);
    const debounced = useDebounce(searchValue, 500);
    useEffect(() => {
        const fetch = async () => {
            try {
                setIsloading(true);
                const { data } = await getCourseSearch(searchValue);
                // await sleep(2000);
                setDataSearch(data);
                setIsloading(false);
            }
            catch (error) {
                console.log(error);
            }
        };
        if (searchValue) {
            fetch();
        }
    }, [debounced]);
    const handleToggleThemeMode = () => {
        const newTheme = homeState.theme === 'light' ? 'dark' : 'light';
        dispatch({
            type: TOGGLE_THEME_HOME,
            theme: newTheme,
        });
    };
    const handleSearchValue = (value) => {
        console.log(value);
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    };
    const clearSearchValue = () => {
        setSearchValue('');
    };
    // media
    const downMD = useMediaQuery(theme.breakpoints.down('md'));
    const downSM = useMediaQuery(theme.breakpoints.down('sm'));
    return (_jsxs("div", { children: [authState.user && authState.user.role === 'admin' && (_jsx("div", { style: {
                    width: '100%',
                    backgroundColor: theme.palette.background.paper2,
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }, children: _jsx("nav", { className: clsx(s['nav']), children: _jsxs("ul", { className: "tw-list-none tw-flex tw-items-center", children: [_jsx("li", { className: "", children: _jsxs(Link, { to: 'to', children: ["Xin ch\u00E0o admin ", authState.user.name, " !"] }) }), _jsx("li", { className: "tw-ml-10", children: _jsx(Link, { to: import.meta.env.VITE_URL_ADMIN +
                                        `?accessToken=${encodeURIComponent(JSON.stringify(authState.accessToken))}&info=${encodeURIComponent(JSON.stringify(authState.user))}`, children: "\u0110\u0103ng nh\u1EADp v\u00E0o qu\u1EA3n tr\u1ECB n\u1ED9i dung" }) })] }) }) })), _jsx("nav", { style: {
                    background: theme.palette.background.paper,
                }, className: clsx(s['nav'], `tw-p-2.5 tw-sticky tw-top-0 tw-z-50`), children: _jsx("div", { className: clsx('tw-mx-auto', !downMD ? s['nav-desk'] : s['nav-mobile']), children: _jsxs("div", { className: "tw-flex tw-justify-between tw-items-center", children: [!downSM && (_jsx("div", { className: "tw-flex tw-items-center", children: _jsxs(Link, { to: "/", className: "tw-flex tw-items-center", children: [_jsx(Logo, {}), _jsx("span", { className: "tw-font-bold", children: "L\u1EADp tr\u00ECnh Ftech" })] }) })), _jsx("div", { className: `tw-flex tw-items-center tw-border-solid ${downSM ? 'tw-w-full' : 'tw-w-1/3'}`, children: _jsxs("div", { className: clsx(s['search'], 'tw-relative tw-w-full'), children: [_jsx("span", { className: "tw-absolute tw-top-2.5 tw-left-4", children: _jsx(SearchIcon, {}) }), _jsx(HeadlessTippy, { visible: searchValue.length > 0, placement: "top-start", interactive: true, render: (attrs) => (_jsxs(Wrapper, { style: {
                                                    background: theme.palette.background.paper,
                                                    width: '400px',
                                                    maxHeight: '70vh',
                                                    overflow: 'auto',
                                                }, ...attrs, children: [dataSearch.length > 0 && (_jsxs(_Fragment, { children: [_jsxs("span", { children: ["K\u1EBFt qu\u1EA3 cho '", searchValue, "'"] }), _jsx("h6", { children: "Kh\u00F3a h\u1ECDc" }), dataSearch.map((c, i) => (_jsx(Link, { to: path.client.learningId(c._id), children: _jsxs(ContentSearch, { children: [_jsx(ImageContentSearch, { src: c.thumbnail }), _jsx("span", { children: c.title })] }, i) })))] })), isLoading && _jsxs("span", { children: ["\u0110ang t\u00ECm '", searchValue, "'"] }), !isLoading && dataSearch.length == 0 && _jsxs("span", { children: ["Kh\u00F4ng t\u00ECm th\u1EA5y k\u1EBFt qu\u1EA3 cho '", searchValue, "'"] })] })), children: _jsxs("div", { children: [_jsx("input", { value: searchValue, className: clsx(`tw-transition tw-w-full tw-text-xm tw-rounded-full tw-p-2.5 tw-pl-12 bg-transparent`), style: {
                                                            border: `2px solid ${theme.palette.border.borderLv2}`,
                                                        }, placeholder: "T\u00ECm ki\u1EBFm kh\u00F3a h\u1ECDc", onChange: (e) => handleSearchValue(e.target.value) }), isLoading && (_jsxs("i", { className: "tw-absolute tw-top-3 tw-right-5", children: [_jsx(BeatLoader, { color: `${theme.palette.text.primary}`, size: 6 }), ' '] })), !isLoading && searchValue.length > 0 && (_jsx("i", { onClick: clearSearchValue, className: "tw-absolute tw-top-2 tw-right-5", children: _jsx(BiX, {}) }))] }) })] }) }), _jsx("div", { className: "tw-flex tw-items-center tw-justify-center tw-space-x-4", children: _jsxs("ul", { className: "tw-list-none tw-flex tw-items-center tw-justify-center", children: [_jsx("li", { className: "tw-relative tw-ml-1", children: _jsx(Link, { to: "#", className: `tw-text-xl ${theme.palette.text.primary}`, children: _jsx(Tippy, { content: "Thay \u0111\u1ED5i theme", children: _jsx("i", { children: _jsx(BiAdjust, { onClick: handleToggleThemeMode }) }) }) }) }), authState?.accessToken ? _jsx(LoggedIn, { user: authState.user }) : _jsx(NotLoggedIn, {})] }) })] }) }) })] }));
};
export default Header;
