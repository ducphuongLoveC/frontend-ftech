import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import moment from 'moment';
const CouponList = ({ coupons, onChange }) => {
    const theme = useTheme();
    return (_jsx(Grid, { container: true, spacing: 2, children: coupons?.map((c) => (_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Box, { sx: {
                    height: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    mt: 1,
                }, children: [_jsx(Box, { width: '30%', sx: {
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: theme.palette.background.paper2,
                            height: '100%',
                            justifyContent: 'center',
                        }, children: _jsxs(Typography, { variant: "h2", children: [c.discount_value, ' ', (() => {
                                    switch (c.discount_type) {
                                        case 'percentage':
                                            return '%';
                                    }
                                })()] }) }), _jsxs(Box, { sx: { ml: 2 }, display: 'flex', justifyContent: 'center', alignItems: 'center', children: [_jsxs(Box, { children: [_jsx(Typography, { my: 1, variant: "h4", children: c.code }), _jsxs(Typography, { children: ["gi\u00E1 tr\u1ECB gi\u1EA3m ", c.discount_value, (() => {
                                                switch (c.discount_type) {
                                                    case 'percentage':
                                                        return '%';
                                                }
                                            })()] }), _jsxs(Typography, { children: [" s\u1ED1 l\u01B0\u1EE3ng c\u00F2n ", c.max_uses - c.used_count] }), _jsxs(Typography, { variant: "caption", children: ["h\u1EA1n s\u1EED d\u1EE5ng: ", moment(c.end_date).format('HH:mm DD-MM-YYYY')] })] }), _jsx(Box, { children: _jsx(Button, { onClick: () => onChange(c.code), sx: { ml: 2 }, variant: "outlined", children: "D\u00F9ng" }) })] })] }) }))) }));
};
export default CouponList;
