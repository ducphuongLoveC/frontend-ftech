import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
// project import
import navigation from '@/menu-items';
// assets
import { IconChevronRight, IconTallymark1 } from '@tabler/icons-react';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
// ==============================|| BREADCRUMBS TITLE ||============================== //
const BTitle = ({ title }) => (_jsx(Grid, { item: true, children: _jsx(Typography, { variant: "h3", sx: {
            fontWeight: 500,
        }, children: title }) }));
// ==============================|| BREADCRUMBS ||============================== //
const Breadcrumbs = ({ card = true, custom = false, divider = true, heading, icon = true, icons, links, maxItems, rightAlign = true, separator = IconChevronRight, title = true, titleBottom, sx, ...others }) => {
    const theme = useTheme();
    const location = useLocation();
    const [main, setMain] = useState();
    const [item, setItem] = useState();
    const iconSX = {
        marginRight: 6,
        marginTop: -2,
        width: '1rem',
        height: '1rem',
        color: theme.palette.secondary.main,
    };
    const linkSX = {
        display: 'flex',
        color: 'grey.900',
        textDecoration: 'none',
        alignContent: 'center',
        alignItems: 'center',
    };
    const customLocation = location.pathname;
    useEffect(() => {
        navigation?.items?.map((menu) => {
            if (menu.type && menu.type === 'group') {
                if (menu?.url && menu.url === customLocation) {
                    setMain(menu);
                    setItem(menu);
                }
                else {
                    getCollapse(menu);
                }
            }
            return false;
        });
    });
    // set active item state
    const getCollapse = (menu) => {
        if (!custom && menu.children) {
            menu.children.filter((collapse) => {
                if (collapse.type && collapse.type === 'collapse') {
                    getCollapse(collapse);
                    if (collapse.url === customLocation) {
                        setMain(collapse);
                        setItem(collapse);
                    }
                }
                else if (collapse.type && collapse.type === 'item') {
                    if (customLocation === collapse.url) {
                        setMain(menu);
                        setItem(collapse);
                    }
                }
                return false;
            });
        }
    };
    // item separator
    const SeparatorIcon = separator;
    const separatorIcon = separator ? (_jsx(SeparatorIcon, {})) : (_jsx(IconTallymark1, { stroke: 1.5, size: "16px" }));
    let mainContent;
    let itemContent;
    let breadcrumbContent = _jsx(Typography, {});
    let itemTitle = '';
    let CollapseIcon;
    let ItemIcon;
    // collapse item
    if (main && main.type === 'collapse') {
        CollapseIcon = main.icon ? main.icon : AccountTreeTwoToneIcon;
        mainContent = (_jsxs(Typography, { ...(main.url && {
                component: Link,
                to: main.url,
            }), variant: "subtitle1", sx: linkSX, color: window.location.pathname === main.url
                ? 'text.primary'
                : 'text.secondary', children: [icons && _jsx(CollapseIcon, { style: iconSX }), main.title] }));
    }
    if (!custom &&
        main &&
        main.type === 'collapse' &&
        main.breadcrumbs === true) {
        breadcrumbContent = (_jsxs(Card, { sx: card === false
                ? {
                    mb: 3,
                    bgcolor: 'transparent',
                    ...sx,
                }
                : {
                    mb: 3,
                    bgcolor: 'background.default',
                    ...sx,
                }, ...others, children: [_jsx(Box, { sx: {
                        p: 2,
                        pl: card === false ? 0 : 2,
                    }, children: _jsxs(Grid, { container: true, direction: rightAlign ? 'row' : 'column', justifyContent: rightAlign ? 'space-between' : 'flex-start', alignItems: rightAlign ? 'center' : 'flex-start', spacing: 1, children: [title && !titleBottom && _jsx(BTitle, { title: main.title }), _jsx(Grid, { item: true, children: _jsxs(MuiBreadcrumbs, { "aria-label": "breadcrumb", maxItems: maxItems || 8, separator: separatorIcon, sx: {
                                        '& .MuiBreadcrumbs-separator': {
                                            width: 16,
                                            ml: 1.25,
                                            mr: 1.25,
                                        },
                                    }, children: [_jsxs(Typography, { component: Link, to: "/", color: "textSecondary", variant: "subtitle1", sx: linkSX, children: [icons && _jsx(HomeTwoToneIcon, { style: iconSX }), icon && !icons && (_jsx(HomeIcon, { style: {
                                                        ...iconSX,
                                                        marginRight: 0,
                                                    } })), (!icon || icons) && 'Dashboard'] }), mainContent] }) }), title && titleBottom && _jsx(BTitle, { title: main.title })] }) }), card === false && divider !== false && (_jsx(Divider, { sx: {
                        mt: 2,
                    } }))] }));
    }
    // items
    if ((item && item.type === 'item') ||
        (item?.type === 'group' && item?.url) ||
        custom) {
        itemTitle = item?.title;
        ItemIcon = item?.icon ? item.icon : AccountTreeTwoToneIcon;
        itemContent = (_jsxs(Typography, { variant: "subtitle1", sx: {
                ...linkSX,
                color: 'text.secondary',
            }, children: [icons && _jsx(ItemIcon, { style: iconSX }), itemTitle] }));
        let tempContent = (_jsxs(MuiBreadcrumbs, { "aria-label": "breadcrumb", maxItems: maxItems || 8, separator: separatorIcon, sx: {
                '& .MuiBreadcrumbs-separator': {
                    width: 16,
                    ml: 1.25,
                    mr: 1.25,
                },
            }, children: [_jsxs(Typography, { component: Link, to: "/", color: "textSecondary", variant: "subtitle1", sx: linkSX, children: [icons && _jsx(HomeTwoToneIcon, { style: iconSX }), icon && !icons && (_jsx(HomeIcon, { style: {
                                ...iconSX,
                                marginRight: 0,
                            } })), (!icon || icons) && 'Dashboard'] }), mainContent, itemContent] }));
        if (custom && links && links?.length > 0) {
            tempContent = (_jsx(MuiBreadcrumbs, { "aria-label": "breadcrumb", maxItems: maxItems || 8, separator: separatorIcon, sx: {
                    '& .MuiBreadcrumbs-separator': {
                        width: 16,
                        ml: 1.25,
                        mr: 1.25,
                    },
                }, children: links?.map((link, index) => {
                    CollapseIcon = link.icon ? link.icon : AccountTreeTwoToneIcon;
                    return (_jsxs(Typography, { ...(link.to && {
                            component: Link,
                            to: link.to,
                        }), variant: "subtitle1", sx: linkSX, color: !link.to ? 'text.primary' : 'text.secondary', children: [link.icon && _jsx(CollapseIcon, { style: iconSX }), link.title] }, index));
                }) }));
        }
        // main
        if (item?.breadcrumbs !== false || custom) {
            breadcrumbContent = (_jsxs(Card, { sx: card === false
                    ? {
                        mb: 3,
                        bgcolor: 'transparent',
                        ...sx,
                    }
                    : {
                        mb: 3,
                        bgcolor: 'background.default',
                        ...sx,
                    }, ...others, children: [_jsx(Box, { sx: {
                            p: 2,
                            pl: card === false ? 0 : 2,
                        }, children: _jsxs(Grid, { container: true, direction: rightAlign ? 'row' : 'column', justifyContent: rightAlign ? 'space-between' : 'flex-start', alignItems: rightAlign ? 'center' : 'flex-start', spacing: 1, children: [title && !titleBottom && (_jsx(BTitle, { title: custom ? heading : item?.title })), _jsx(Grid, { item: true, children: tempContent }), title && titleBottom && (_jsx(BTitle, { title: custom ? heading : item?.title }))] }) }), card === false && divider !== false && (_jsx(Divider, { sx: {
                            mt: 2,
                        } }))] }));
        }
    }
    return breadcrumbContent;
};
export default Breadcrumbs;
