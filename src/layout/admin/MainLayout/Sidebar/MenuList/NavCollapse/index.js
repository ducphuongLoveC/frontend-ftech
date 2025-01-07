import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
// project imports
import NavItem from '../NavItem';
// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //
const NavCollapse = ({ menu, level }) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const handleClick = () => {
        setOpen(!open);
        setSelected(!selected ? menu.id : null);
    };
    const { pathname } = useLocation();
    const checkOpenForParent = (child, id) => {
        child.forEach((item) => {
            if (item.url === pathname) {
                setOpen(true);
                setSelected(id);
            }
        });
    };
    // menu collapse for sub-levels
    useEffect(() => {
        setOpen(false);
        setSelected(null);
        if (menu.children) {
            menu.children.forEach((item) => {
                if (item.children?.length) {
                    checkOpenForParent(item.children, menu.id);
                }
                if (item.url === pathname) {
                    setSelected(menu.id);
                    setOpen(true);
                }
            });
        }
    }, [pathname, menu.children]);
    // menu collapse & item
    const menus = menu.children?.map((item) => {
        switch (item.type) {
            case 'collapse':
                return _jsx(NavCollapse, { menu: item, level: level + 1 }, item.id);
            case 'item':
                return _jsx(NavItem, { item: item, level: level + 1 }, item.id);
            default:
                return (_jsx(Typography, { variant: "h6", color: "error", align: "center", children: "Menu Items Error" }, item.id));
        }
    });
    const Icon = menu.icon;
    const menuIcon = menu.icon ? (_jsx(Icon, { strokeWidth: 1.5, size: "1.3rem", style: {
            marginTop: 'auto',
            marginBottom: 'auto',
            color: theme.palette.text.primary
        } })) : (_jsx(FiberManualRecordIcon, { sx: {
            width: selected === menu.id ? 8 : 6,
            height: selected === menu.id ? 8 : 6,
        } }));
    return (_jsxs(_Fragment, { children: [_jsxs(ListItemButton, { sx: {
                    borderRadius: `${customization.borderRadius}px`,
                    mb: 0.5,
                    alignItems: 'flex-start',
                    backgroundColor: level > 1 ? 'transparent !important' : theme.palette.background.paper,
                    py: level > 1 ? 1 : 1.25,
                    pl: `${level * 24}px`,
                    ':hover': {
                        backgroundColor: theme.palette.background.paper2,
                    },
                    ':focus': {
                        backgroundColor: theme.palette.background.paper2,
                    },
                }, selected: selected === menu.id, onClick: handleClick, children: [_jsx(ListItemIcon, { sx: {
                            my: 'auto',
                            minWidth: !menu.icon ? 18 : 36,
                        }, children: menuIcon }), _jsx(ListItemText, { primary: _jsx(Typography, { variant: selected === menu.id ? 'h5' : 'body1', sx: {
                                my: 'auto',
                            }, children: menu.title }), secondary: menu.caption && (_jsx(Typography, { variant: "caption", display: "block", gutterBottom: true, children: menu.caption })) }), open ? (_jsx(IconChevronUp, { stroke: 1.5, size: "1rem", style: {
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        } })) : (_jsx(IconChevronDown, { stroke: 1.5, size: "1rem", style: {
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        } }))] }), _jsx(Collapse, { in: open, timeout: "auto", unmountOnExit: true, children: _jsx(List, { component: "div", disablePadding: true, sx: {
                        position: 'relative',
                        '&:after': {
                            content: "''",
                            position: 'absolute',
                            left: '32px',
                            top: 0,
                            height: '100%',
                            width: '1px',
                            opacity: 1,
                            background: theme.palette.primary.light,
                        },
                    }, children: menus }) })] }));
};
export default NavCollapse;
