import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Grid, styled, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import { Star, School, AccessTime, People, Timeline } from '@mui/icons-material';
// Styled components
const CourseThumbnail = styled('img')({
    width: '100%',
    height: 'auto',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
});
const BoxCenter = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
        borderBottom: 'none',
    },
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.text.primary,
}));
const DetailValue = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 700,
    color: theme.palette.primary.main,
}));
const HighlightBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    boxShadow: `0 4px 12px ${theme.palette.action.hover}`,
    padding: theme.spacing(3),
}));
const CourseDetail = ({ course }) => {
    const theme = useTheme();
    const calculateTotalDuration = (course) => {
        const totalDuration = course?.modules.reduce((moduleAcc, module) => moduleAcc + module.resources.reduce((resourceAcc, resource) => resourceAcc + resource.duration, 0), 0);
        return moment.utc(totalDuration * 1000).format('HH:mm:ss');
    };
    const calculateTotalResources = (course) => {
        return course?.modules.reduce((moduleAcc, module) => moduleAcc + module.resources.length, 0);
    };
    return (_jsxs(Grid, { container: true, spacing: 4, children: [_jsx(Grid, { item: true, xs: 12, md: 4.8, children: _jsxs(HighlightBox, { children: [_jsx(CourseThumbnail, { src: typeof course?.thumbnail === 'string' ? course.thumbnail : '' }), _jsxs(Box, { p: 2, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: 700, color: theme.palette.text.primary }, children: course?.title }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mt: 1 }, dangerouslySetInnerHTML: { __html: course?.description } }), _jsxs(Typography, { variant: "body1", sx: { mt: 2 }, children: [_jsx("strong", { children: "Gi\u00E1 g\u1ED1c:" }), " ", course?.original_price, " \u0111"] }), _jsxs(Typography, { variant: "body1", color: "primary", sx: { mt: 1, fontWeight: 700 }, children: [_jsx("strong", { children: "Gi\u00E1 khuy\u1EBFn m\u00E3i:" }), " ", course?.sale_price, " \u0111"] }), _jsxs(Typography, { variant: "body1", sx: { mt: 2 }, children: [_jsx("strong", { children: "Lo\u1EA1i: " }), course?.isFree ? 'Miễn phí' : 'Tính phí'] }), _jsxs(Typography, { variant: "body1", sx: { mt: 2 }, children: [_jsx("strong", { children: "Cung c\u1EA5p ch\u1EE9ng ch\u1EC9: " }), course?.has_certificate ? 'Có' : 'Không'] }), _jsxs(Typography, { variant: "body1", sx: { mt: 2 }, children: [_jsx("strong", { children: "Tr\u00ECnh \u0111\u1ED9: " }), course?.level] })] })] }) }), _jsx(Grid, { item: true, xs: 12, md: 7.2, children: _jsxs(HighlightBox, { children: [_jsxs(BoxCenter, { children: [_jsxs(StyledTypography, { children: [_jsx(AccessTime, { sx: { mr: 1, color: theme.palette.primary.main } }), "T\u1ED5ng th\u1EDDi gian c\u1EE7a kh\u00F3a h\u1ECDc:"] }), _jsx(DetailValue, { children: calculateTotalDuration(course) })] }), _jsxs(BoxCenter, { children: [_jsxs(StyledTypography, { children: [_jsx(School, { sx: { mr: 1, color: theme.palette.secondary.main } }), "S\u1ED1 l\u01B0\u1EE3ng ch\u01B0\u01A1ng h\u1ECDc:"] }), _jsx(DetailValue, { children: course?.modules.length })] }), _jsxs(BoxCenter, { children: [_jsxs(StyledTypography, { children: [_jsx(Star, { sx: { mr: 1, color: '#fbc02d' } }), "S\u1ED1 l\u01B0\u1EE3ng t\u00E0i li\u1EC7u h\u1ECDc:"] }), _jsx(DetailValue, { children: calculateTotalResources(course) })] }), _jsxs(BoxCenter, { children: [_jsxs(StyledTypography, { children: [_jsx(People, { sx: { mr: 1, color: theme.palette.info.main } }), "T\u1ED5ng s\u1ED1 h\u1ECDc vi\u00EAn tham gia:"] }), _jsx(DetailValue, { children: course?.enrollment_count })] }), _jsxs(BoxCenter, { children: [_jsxs(StyledTypography, { children: [_jsx(Timeline, { sx: { mr: 1, color: theme.palette.primary.main } }), "T\u1ED5ng s\u1ED1 gi\u1EDD h\u1ECDc vi\u00EAn \u0111\u00E3 h\u1ECDc:"] }), _jsx(DetailValue, { children: moment.utc(course?.total_learning_seconds * 1000).format('HH:mm:ss') })] })] }) })] }));
};
export default CourseDetail;
