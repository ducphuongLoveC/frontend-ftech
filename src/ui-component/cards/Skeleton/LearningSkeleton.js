import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Skeleton, Stack, useTheme } from '@mui/material';
export const ResourceSkeleton = () => {
    const theme = useTheme();
    return (_jsxs(Box, { sx: { flex: 1, p: 2, bgcolor: theme.palette.background.paper }, children: [_jsx(Skeleton, { variant: "rectangular", width: "100%", height: 500, sx: { mb: 2 } }), _jsxs(Stack, { direction: "row", spacing: 2, alignItems: "center", sx: { mb: 4 }, children: [_jsx(Skeleton, { variant: "circular", width: 40, height: 40 }), _jsx(Skeleton, { variant: "text", width: 100 })] }), _jsx(Skeleton, { variant: "text", width: 200, height: 40, sx: { mb: 1 } }), _jsx(Skeleton, { variant: "text", width: 150 })] }));
};
export const ModulesSkeleton = () => {
    const theme = useTheme();
    return (_jsx(Box, { sx: { width: 440, p: 2, bgcolor: theme.palette.background.paper }, children: _jsxs(Stack, { spacing: 2, children: [_jsx(Skeleton, { variant: "text", width: 200, height: 30 }), [...Array(5)].map((_, i) => (_jsxs(Stack, { spacing: 1, children: [_jsx(Skeleton, { variant: "text", width: 280 }), _jsx(Skeleton, { variant: "text", width: 100 })] }, i)))] }) }));
};
