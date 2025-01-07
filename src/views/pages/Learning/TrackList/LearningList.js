import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { Typography, Box, useTheme, IconButton } from '@mui/material';
// redux
import { useSelector, useDispatch } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Module from '@/components/Module';
import CloseIcon from '@mui/icons-material/Close';
import { SET_EXPANDED_INDEXS } from '@/store/actions';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
const LearningList = memo(({ onClose, modules }) => {
    const dispatch = useDispatch();
    const storedExpandedIndexs = useSelector((state) => state.homeReducer.expandedIndexs);
    const handleToggleExpanded = (index) => {
        dispatch({
            type: SET_EXPANDED_INDEXS,
            payload: storedExpandedIndexs.includes(index)
                ? storedExpandedIndexs.filter((i) => i !== index)
                : [...storedExpandedIndexs, index],
        });
    };
    const handleToggleExpandedAll = () => {
        dispatch({
            type: SET_EXPANDED_INDEXS,
            payload: storedExpandedIndexs.length > 0
                ? []
                : Array(modules.length)
                    .fill(0)
                    .map((_, index) => index),
        });
    };
    const theme = useTheme();
    return (_jsxs(PerfectScrollbar, { style: {
            borderLeft: `3px solid ${theme.palette.background.paper2}`,
            overflow: 'auto',
            height: '87vh',
            backgroundColor: theme.palette.background.paper,
        }, children: [_jsx(Box, { sx: {
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    backgroundColor: theme.palette.background.paper,
                    borderBottom: `1px solid ${theme.palette.background.paper2}`,
                }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', py: 1, justifyContent: 'space-between' }, children: [_jsxs(Box, { display: { display: 'flex', alignItems: 'center' }, children: [_jsx(IconButton, { onClick: handleToggleExpandedAll, children: storedExpandedIndexs.length > 0 ? _jsx(ArrowUpward, {}) : _jsx(ArrowDownward, {}) }), _jsx(Typography, { fontSize: "15px", variant: "body1", fontWeight: "500", children: "N\u1ED9i dung kh\u00F3a h\u1ECDc c\u1EE7a b\u1EA1n" })] }), _jsx(Box, { onClick: onClose, mr: 1, children: _jsx(IconButton, { children: _jsx(CloseIcon, {}) }) })] }) }), _jsx(Box, { children: modules.map((module, index) => (_jsx(Module, { isRedirect: true, onClick: () => handleToggleExpanded(index), expanded: storedExpandedIndexs.includes(index), title: module.title, items: module.resources }, index))) })] }));
});
export default LearningList;
