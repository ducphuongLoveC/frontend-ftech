import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { CssBaseline, Box, Typography } from '@mui/material';
export default function LoadingPage() {
    const [dots, setDots] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
        }, 500);
        return () => clearInterval(interval);
    }, []);
    return (_jsxs(Box, { children: [_jsx(CssBaseline, {}), _jsxs(Box, { sx: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 99999,
                }, children: [_jsx(Box, { sx: {
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 4,
                        }, children: [0, 1, 2].map((index) => (_jsx(Box, { sx: {
                                width: 16,
                                height: 16,
                                backgroundColor: 'primary.main',
                                borderRadius: '50%',
                                mx: 0.5,
                                opacity: 0.8,
                                animation: `bounce 1s ease-in-out ${index * 0.2}s infinite`,
                                '@keyframes bounce': {
                                    '0%, 100%': { transform: 'translateY(0)' },
                                    '50%': { transform: 'translateY(-10px)' },
                                },
                            } }, index))) }), _jsxs(Typography, { variant: "h6", component: "h1", sx: {
                            color: 'primary.main',
                            textAlign: 'center',
                            fontWeight: 500,
                            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                            '@keyframes pulse': {
                                '0%, 100%': { opacity: 1 },
                                '50%': { opacity: 0.6 },
                            },
                        }, children: ["Vui l\u00F2ng \u0111\u1EE3i, c\u00E1c t\u00E0i li\u1EC7u \u0111ang \u0111\u01B0\u1EE3c upload", _jsx(Box, { component: "span", sx: {
                                    display: 'inline-block',
                                    width: '1em',
                                    ml: 0.5,
                                    fontWeight: 'bold',
                                }, children: dots })] })] })] }));
}