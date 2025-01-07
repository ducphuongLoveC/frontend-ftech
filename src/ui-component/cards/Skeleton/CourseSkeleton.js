import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Grid, Skeleton } from '@mui/material';
const CourseSkeleton = () => {
    return (_jsx(Box, { sx: { width: '100%' }, mt: 2, children: _jsx(Grid, { container: true, spacing: 3, children: Array.from({ length: 8 }).map((_, index) => (_jsxs(Grid, { item: true, xs: 12, sm: 6, md: 4, lg: 3, children: [_jsx(Skeleton, { variant: "rectangular", height: 200 }), _jsx(Skeleton, { variant: "text", sx: { mt: 1 } }), _jsx(Skeleton, { variant: "text", width: "60%" })] }, index))) }) }));
};
export default CourseSkeleton;
