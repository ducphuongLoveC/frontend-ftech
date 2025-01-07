import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //
const NavGroup = ({ item }) => {
    const theme = useTheme();
    // menu list collapse & items
    const items = item.children?.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return _jsx(NavCollapse, { menu: menu, level: 1 }, menu.id);
            case 'item':
                return _jsx(NavItem, { item: menu, level: 1 }, menu.id);
            default:
                return (_jsx(Typography, { variant: "h6", color: "error", align: "center", children: "Menu Items Error" }, menu.id));
        }
    });
    return (_jsxs(_Fragment, { children: [_jsx(List, { subheader: item.title && (_jsxs(Typography, { variant: "caption", sx: {
                        ...theme.typography.menuCaption,
                    }, display: "block", gutterBottom: true, children: [item.title, item.caption && (_jsx(Typography, { variant: "caption", sx: {
                                ...theme.typography.subMenuCaption,
                            }, display: "block", gutterBottom: true, children: item.caption }))] })), children: items }), _jsx(Divider, { sx: {
                    mt: 0.25,
                    mb: 1.25,
                } })] }));
};
export default NavGroup;
