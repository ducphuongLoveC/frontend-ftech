import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import Slider from 'react-slick';
const Container = styled('div')(() => ({
    marginTop: '10px',
    marginBottom: '10px',
    overflow: 'hidden',
    borderRadius: 'var(--main-border-radius)',
    height: '270px',
    position: 'relative',
}));
const NextArrow = (props) => {
    const { className, onClick } = props;
    return (_jsx("div", { className: className, onClick: onClick, style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            cursor: 'pointer',
        } }));
};
const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (_jsx("div", { className: className, onClick: onClick, style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            cursor: 'pointer',
        } }));
};
const Carousel = ({ dot = false, time = 4000, auto = false, sliders, ...props }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const settings = {
        dots: dot,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: auto,
        autoplaySpeed: time,
        arrows: true,
        nextArrow: _jsx(NextArrow, {}),
        prevArrow: _jsx(PrevArrow, {}),
        customPaging: (i) => {
            return (_jsx("div", { onClick: () => setActiveIndex(i), style: {
                    borderRadius: 'var(--main-border-radius)',
                    width: '30px',
                    height: '5px',
                    background: i === activeIndex ? '#d3d3d3' : 'white',
                    transition: 'background-color 0.3s',
                    cursor: 'pointer',
                } }));
        },
        beforeChange: (_, next) => {
            setActiveIndex(next);
        },
        appendDots: (dots) => (_jsx("div", { style: {
                width: '400px',
                display: 'flex',
                position: 'absolute',
                left: '10px',
                bottom: '0px',
                gap: '10px', // Tăng khoảng cách giữa các dots
            }, children: dots })),
    };
    return (_jsx(Container, { ...props, children: _jsx(Slider, { ...settings, children: sliders.map((slider) => (_jsx("div", { children: _jsxs(Box, { sx: {
                        height: '270px',
                        background: slider.background,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }, children: [_jsxs(Box, { sx: {
                                flex: 1,
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                                padding: '20px 10px 0 50px',
                            }, children: [_jsxs(Box, { children: [_jsx(Typography, { sx: { color: 'white', marginBottom: '20px', fontWeight: 'bold' }, variant: "h1", component: "h1", children: slider.title }), _jsx(Typography, { sx: { lineHeight: '25px', fontSize: '16px' }, variant: "body1", children: slider.description })] }), _jsx(Box, { children: _jsx(Link, { to: slider.path, children: _jsx(Button, { sx: {
                                                backgroundColor: 'transparent',
                                                color: 'white',
                                                border: `2px solid white`,
                                                marginBottom: '35px',
                                                padding: '3px 30px',
                                                borderRadius: 'var(--main-border-radius)',
                                                fontWeight: '600',
                                                transition: 'background-color 0.3s, color 0.3s',
                                                '&:hover': {
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                },
                                            }, children: "H\u1ECDc ngay n\u00E0o" }) }) })] }), _jsx(Box, { sx: {
                                display: { xs: 'none', sm: 'flex' },
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 0.9
                            }, children: _jsx("img", { src: slider.image, alt: slider.title, style: { height: '100%', objectFit: 'contain' } }) })] }) }, slider._id))) }) }));
};
export default Carousel;
