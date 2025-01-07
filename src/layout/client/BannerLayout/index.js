import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme, useMediaQuery, Box } from '@mui/material';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import SideBar from '../MainLayout/SideBar';
import Carousel from '@/components/Carousel';
import Header from '../MainLayout/Header';
import Footer from '../MainLayout/Footer';
import Layout from '../Layout.scss.module.scss';
import axiosInstance from '@/api/axiosInstance';
import CarouselSkeleton from '@/ui-component/cards/Skeleton/CarouselSkeleton';
const BannerLayout = ({ children }) => {
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));
    const [carousels, setCarousels] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Call API to fetch carousels
        const fetchCarousels = async () => {
            try {
                const response = await axiosInstance.get('/api/carousel');
                setCarousels(response.data.data); // Assume API returns { success, data }
            }
            catch (error) {
                console.error('Failed to fetch carousels:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchCarousels();
    }, []);
    return (_jsxs("div", { style: {
            background: theme.palette.background.paper,
        }, children: [_jsx(Header, {}), _jsxs("div", { style: {
                    background: theme.palette.background.paper,
                }, className: "tw-flex", children: [_jsx(SideBar, {}), _jsxs("div", { className: clsx(Layout['content-main'], downMD ? 'tw-px-2' : ''), children: [loading ? _jsx(CarouselSkeleton, {}) : _jsx(Carousel, { dot: true, auto: true, time: 15000, sliders: carousels }), _jsx(Box, { mt: "var(--large-space)", children: children })] })] }), _jsx(Footer, {})] }));
};
export default BannerLayout;
