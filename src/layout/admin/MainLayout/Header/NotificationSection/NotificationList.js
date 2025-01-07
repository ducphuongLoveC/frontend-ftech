import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
// project-import
import Chip from '@/ui-component/extended/Chip';
// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto, } from '@tabler/icons-react';
import User1 from '@/assets/images/users/user-round.svg';
const ListItemWrapper = ({ children }) => {
    return (_jsx(Box, { sx: {
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            cursor: 'pointer',
            '&:hover': {
                bgcolor: 'primary.light',
            },
        }, children: children }));
};
ListItemWrapper.propTypes = {
    children: PropTypes.node,
};
// ==============================|| NOTIFICATION LIST ITEM ||============================== //
const NotificationList = () => {
    const theme = useTheme();
    const chipSX = {
        height: 24,
        padding: '0 6px',
    };
    const chipErrorSX = {
        ...chipSX,
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        marginRight: '5px',
    };
    const chipWarningSX = {
        ...chipSX,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light,
    };
    const chipSuccessSX = {
        ...chipSX,
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: 28,
    };
    return (_jsxs(List, { sx: {
            width: '100%',
            maxWidth: 330,
            py: 0,
            borderRadius: '10px',
            [theme.breakpoints.down('md')]: {
                maxWidth: 300,
            },
            '& .MuiListItemSecondaryAction-root': {
                top: 22,
            },
            '& .MuiDivider-root': {
                my: 0,
            },
            '& .list-container': {
                pl: 7,
            },
        }, children: [_jsxs(ListItemWrapper, { children: [_jsxs(ListItem, { alignItems: "center", children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { alt: "John Doe", src: User1 }) }), _jsx(ListItemText, { primary: "John Doe" }), _jsx(ListItemSecondaryAction, { children: _jsx(Grid, { container: true, justifyContent: "flex-end", children: _jsx(Grid, { item: true, xs: 12, children: _jsx(Typography, { variant: "caption", display: "block", gutterBottom: true, children: "2 min ago" }) }) }) })] }), _jsxs(Grid, { container: true, direction: "column", className: "list-container", children: [_jsx(Grid, { item: true, xs: 12, sx: {
                                    pb: 2,
                                }, children: _jsx(Typography, { variant: "subtitle2", children: "It is a long established fact that a reader will be distracted" }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(Grid, { container: true, children: [_jsx(Grid, { item: true, children: _jsx(Chip, { label: "Unread", sx: chipErrorSX }) }), _jsx(Grid, { item: true, children: _jsx(Chip, { label: "New", sx: chipWarningSX }) })] }) })] })] }), _jsx(Divider, {}), _jsxs(ListItemWrapper, { children: [_jsxs(ListItem, { alignItems: "center", children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { sx: {
                                        color: theme.palette.success.dark,
                                        backgroundColor: theme.palette.success.light,
                                        border: 'none',
                                        borderColor: theme.palette.success.main,
                                    }, children: _jsx(IconBuildingStore, { stroke: 1.5, size: "1.3rem" }) }) }), _jsx(ListItemText, { primary: _jsx(Typography, { variant: "subtitle1", children: "Store Verification Done" }) }), _jsx(ListItemSecondaryAction, { children: _jsx(Grid, { container: true, justifyContent: "flex-end", children: _jsx(Grid, { item: true, xs: 12, children: _jsx(Typography, { variant: "caption", display: "block", gutterBottom: true, children: "2 min ago" }) }) }) })] }), _jsxs(Grid, { container: true, direction: "column", className: "list-container", children: [_jsx(Grid, { item: true, xs: 12, sx: {
                                    pb: 2,
                                }, children: _jsx(Typography, { variant: "subtitle2", children: "We have successfully received your request." }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Grid, { container: true, children: _jsx(Grid, { item: true, children: _jsx(Chip, { label: "Unread", sx: chipErrorSX }) }) }) })] })] }), _jsx(Divider, {}), _jsxs(ListItemWrapper, { children: [_jsxs(ListItem, { alignItems: "center", children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { sx: {
                                        color: theme.palette.primary.dark,
                                        backgroundColor: theme.palette.primary.light,
                                        border: 'none',
                                        borderColor: theme.palette.primary.main,
                                    }, children: _jsx(IconMailbox, { stroke: 1.5, size: "1.3rem" }) }) }), _jsx(ListItemText, { primary: _jsx(Typography, { variant: "subtitle1", children: "Check Your Mail." }) }), _jsx(ListItemSecondaryAction, { children: _jsx(Grid, { container: true, justifyContent: "flex-end", children: _jsx(Grid, { item: true, children: _jsx(Typography, { variant: "caption", display: "block", gutterBottom: true, children: "2 min ago" }) }) }) })] }), _jsxs(Grid, { container: true, direction: "column", className: "list-container", children: [_jsx(Grid, { item: true, xs: 12, sx: {
                                    pb: 2,
                                }, children: _jsx(Typography, { variant: "subtitle2", children: "All done! Now check your inbox as you're in for a sweet treat!" }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Grid, { container: true, children: _jsx(Grid, { item: true, children: _jsx(Button, { variant: "contained", disableElevation: true, endIcon: _jsx(IconBrandTelegram, { stroke: 1.5, size: "1.3rem" }), children: "Mail" }) }) }) })] })] }), _jsx(Divider, {}), _jsxs(ListItemWrapper, { children: [_jsxs(ListItem, { alignItems: "center", children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { alt: "John Doe", src: User1 }) }), _jsx(ListItemText, { primary: _jsx(Typography, { variant: "subtitle1", children: "John Doe" }) }), _jsx(ListItemSecondaryAction, { children: _jsx(Grid, { container: true, justifyContent: "flex-end", children: _jsx(Grid, { item: true, xs: 12, children: _jsx(Typography, { variant: "caption", display: "block", gutterBottom: true, children: "2 min ago" }) }) }) })] }), _jsxs(Grid, { container: true, direction: "column", className: "list-container", children: [_jsx(Grid, { item: true, xs: 12, sx: {
                                    pb: 2,
                                }, children: _jsxs(Typography, { component: "span", variant: "subtitle2", children: ["Uploaded two file on \u00A0", _jsx(Typography, { component: "span", variant: "h6", children: "21 Jan 2020" })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Grid, { container: true, children: _jsx(Grid, { item: true, xs: 12, children: _jsx(Card, { sx: {
                                                backgroundColor: theme.palette.secondary.light,
                                            }, children: _jsx(CardContent, { children: _jsx(Grid, { container: true, direction: "column", children: _jsx(Grid, { item: true, xs: 12, children: _jsxs(Stack, { direction: "row", spacing: 2, children: [_jsx(IconPhoto, { stroke: 1.5, size: "1.3rem" }), _jsx(Typography, { variant: "subtitle1", children: "demo.jpg" })] }) }) }) }) }) }) }) })] })] }), _jsx(Divider, {}), _jsxs(ListItemWrapper, { children: [_jsxs(ListItem, { alignItems: "center", children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { alt: "John Doe", src: User1 }) }), _jsx(ListItemText, { primary: _jsx(Typography, { variant: "subtitle1", children: "John Doe" }) }), _jsx(ListItemSecondaryAction, { children: _jsx(Grid, { container: true, justifyContent: "flex-end", children: _jsx(Grid, { item: true, xs: 12, children: _jsx(Typography, { variant: "caption", display: "block", gutterBottom: true, children: "2 min ago" }) }) }) })] }), _jsxs(Grid, { container: true, direction: "column", className: "list-container", children: [_jsx(Grid, { item: true, xs: 12, sx: {
                                    pb: 2,
                                }, children: _jsx(Typography, { variant: "subtitle2", children: "It is a long established fact that a reader will be distracted" }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Grid, { container: true, children: _jsx(Grid, { item: true, children: _jsx(Chip, { label: "Confirmation of Account.", sx: chipSuccessSX }) }) }) })] })] })] }));
};
export default NotificationList;
