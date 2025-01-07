import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Box, Toolbar, useMediaQuery, styled, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import { SET_MENU, SET_USER } from '@/store/actions';
import { drawerWidth } from '@/store/constant';
import Breadcrumb from '@/components/Breadcrumb';
import Cookies from 'js-cookie';
// Styled component for main content
const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme',
})(({ theme, open }) => ({
    ...theme.typography.mainContent,
    background: theme.palette.background.paper2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create('margin', open
        ? {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }
        : {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    [theme.breakpoints.up('md')]: {
        marginLeft: open ? 0 : -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginRight: '10px',
    },
}));
const MainLayout = ({ children }) => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const user = useSelector((state) => state.authReducer.user);
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    if (user == null) {
        const user = JSON.parse(Cookies.get('user') || '');
        dispatch({ type: SET_USER, payload: user });
    }
    const handleLeftDrawerToggle = () => {
        dispatch({
            type: SET_MENU,
            opened: !leftDrawerOpened,
        });
    };
    return (_jsxs(Box, { sx: {
            display: 'flex',
            background: theme.palette.background.paper,
        }, children: [_jsx(AppBar, { enableColorOnDark: true, position: "fixed", color: "inherit", elevation: 0, sx: {
                    bgcolor: theme.palette.background.paper,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
                }, children: _jsx(Toolbar, { children: _jsx(Header, { handleLeftDrawerToggle: handleLeftDrawerToggle }) }) }), _jsx(Sidebar, { drawerOpen: !matchDownMd ? leftDrawerOpened : !leftDrawerOpened, drawerToggle: handleLeftDrawerToggle }), _jsxs(Main, { theme: theme, open: leftDrawerOpened, children: [_jsx(Breadcrumb, {}), children] }), _jsx(Customization, {})] }));
};
export default MainLayout;
