import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Grid, Skeleton, useTheme } from '@mui/material';
// Skeleton loading component
const CourseListSkl = () => {
    const theme = useTheme();
    return (_jsxs(_Fragment, { children: [_jsx(Box, { width: '100%', height: '50px', sx: { backgroundColor: theme.palette.background.paper }, mb: 1 }), _jsx(Grid, { container: true, spacing: 2, children: Array(4)
                    .fill('')
                    .map(() => (_jsx(Grid, { item: true, sm: 12, md: 6, children: _jsxs(Box, { sx: { backgroundColor: theme.palette.background.paper }, p: 2, children: [_jsxs(Box, { sx: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '25px',
                                }, children: [_jsx(Skeleton, { variant: "text", width: 200, height: 40 }), _jsx(Skeleton, { variant: "circular", width: 40, height: 40 })] }), _jsxs(Grid, { container: true, spacing: 10, children: [_jsx(Grid, { item: true, lg: 6, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, children: _jsx(Skeleton, { variant: "rectangular", width: 300, height: 60 }) }), _jsx(Grid, { item: true, children: _jsx(Skeleton, { variant: "rectangular", width: 120, height: 40 }) })] }) }), _jsxs(Grid, { item: true, lg: 6, children: [_jsxs(Box, { sx: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '10px',
                                                }, children: [_jsx(Skeleton, { variant: "text", width: 100 }), _jsx(Skeleton, { variant: "text", width: 80 })] }), _jsxs(Box, { sx: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '10px',
                                                }, children: [_jsx(Skeleton, { variant: "text", width: 100 }), _jsx(Skeleton, { variant: "text", width: 80 })] }), _jsxs(Box, { sx: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '10px',
                                                }, children: [_jsx(Skeleton, { variant: "text", width: 100 }), _jsx(Skeleton, { variant: "text", width: 80 })] })] })] })] }) }))) })] }));
};
export default CourseListSkl;
