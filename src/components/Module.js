import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionSummary, Box, Typography, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTheme } from '@mui/material';
import { memo } from 'react';
import moment from 'moment';
import useQueryParams from '@/hooks/useQueryParams';
// icon
import LockIcon from '@mui/icons-material/Lock';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuizIcon from '@mui/icons-material/Quiz';
const Module = ({ isRedirect = false, styleM = 'one', title, items, expanded = false, onClick, }) => {
    const theme = useTheme();
    const query = useQueryParams();
    const renderTitle = () => (_jsx(Box, { children: _jsxs(Box, { fontSize: '16px', children: [styleM === 'two' &&
                    (expanded ? _jsx(RemoveIcon, { sx: { fontSize: '17px' } }) : _jsx(AddIcon, { sx: { fontSize: '17px' } })), ' ', title, styleM === 'two' && (_jsxs(Box, { fontSize: '15px', position: 'absolute', right: 10, top: '50%', sx: { transform: 'translateY(-50%)' }, children: [items.length, " b\u00E0i h\u1ECDc"] }))] }) }));
    const renderSummary = () => {
        const completedResourceTotal = () => {
            return items.reduce((acc, resource) => acc + (resource?.progress?.is_completed ? 1 : 0), 0);
        };
        return (_jsxs(Typography, { variant: "caption", children: [`${completedResourceTotal()}/${items.length} - `, moment.utc(items.reduce((acc, c) => acc + c.duration, 0) * 1000).format('HH:mm:ss')] }));
    };
    const renderItems = () => items.map((item, idx) => (_createElement(Box, { sx: { cursor: isRedirect ? 'pointer' : '' }, ...(item?.progress?.is_unlocked && isRedirect ? { onClick: () => query.set('id', item._id) } : {}), key: idx, style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: isRedirect && item?.progress?.is_unlocked ? 'pointer' : 'default',
            opacity: item?.progress?.is_unlocked ? 1 : 0.5,
        } },
        _jsxs(Box, { mr: 2, pt: 1, children: [_jsx(Typography, { color: query.get('id') == item._id ? '#007bff' : '', children: item.title }), _jsxs(Box, { display: 'flex', alignItems: 'center', children: [(() => {
                            switch (item.resource_type) {
                                case 'Video':
                                    return _jsx(PlayCircleIcon, { sx: { fontSize: '15px' } });
                                case 'Question':
                                    return _jsx(QuizIcon, { sx: { fontSize: '15px' } });
                                case 'Document':
                                    return _jsx(ArticleIcon, { sx: { fontSize: '15px' } });
                                default:
                                    return null;
                            }
                        })(), _jsx(Typography, { variant: "caption", ml: 1, children: moment.utc(item.duration * 1000).format('mm:ss') })] })] }),
        item?.progress?.is_completed && (_jsx(Box, { children: _jsx(CheckCircleIcon, { sx: { color: '#5db85c', fontSize: '18px' } }) })),
        !item?.progress?.is_unlocked && (_jsx(Box, { children: _jsx(LockIcon, { sx: { fontSize: '18px' } }) })))));
    return (_jsxs(Accordion, { onClick: (e) => onClick(e), expanded: expanded, disableGutters: true, sx: {
            mb: styleM === 'two' ? '10px' : '0',
            '&:before': {
                display: 'none',
            },
        }, children: [_jsx(AccordionSummary, { sx: {
                    backgroundColor: styleM === 'two' ? theme.palette.background.paper2 : theme.palette.background.paper,
                    borderBottom: `2px solid ${theme.palette.background.paper2}`,
                }, expandIcon: styleM === 'one' ? _jsx(ExpandMore, { sx: { color: theme.palette.text.primary } }) : null, children: _jsxs(Box, { children: [renderTitle(), " ", styleM === 'one' && renderSummary()] }) }), _jsx(AccordionDetails, { onClick: (event) => event.stopPropagation(), sx: {
                    backgroundColor: styleM === 'two' ? theme.palette.background.paper : theme.palette.background.paper2,
                }, children: renderItems() })] }));
};
export default memo(Module);
