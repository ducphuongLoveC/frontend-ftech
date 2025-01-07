import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Box, styled, useTheme, Button, Typography, useMediaQuery } from '@mui/material';
import { BiChevronLeft } from 'react-icons/bi';
import DescriptionIcon from '@mui/icons-material/Description';
import ContrastIcon from '@mui/icons-material/Contrast';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_THEME_HOME } from '@/store/actions';
import StarsIcon from '@mui/icons-material/Stars';
// pj
import Dialog from '@/components/Dialog';
import Progress from '@/components/Progress';
import Note from './Note';
import PlacementToggle from '@/components/PlacementToggle';
import { getSingleCourseById } from '@/api/courseApi';
const BoxHeader = styled('header')(({ theme, isMobile }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.background.paper === '#ffffff' ? '#29303b' : theme.palette.background.paper,
    height: isMobile ? '40px' : '50px',
    alignItems: 'center',
    paddingRight: '20px',
}));
const StyledButton = styled(Button)({
    height: '50px',
});
const BoxCenter = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
});
const StyledDescriptionBox = styled(BoxCenter)({
    cursor: 'pointer',
});
import RatingPreview from '@/components/RatingPreview';
import { createRating, fetchRatingByCourseId } from '@/api/rating';
const Header = ({ data, notes }) => {
    console.log(notes);
    const { id } = useParams();
    const theme = useTheme();
    const dispatch = useDispatch();
    const homeState = useSelector((state) => state.homeReducer);
    const user = useSelector((state) => state.authReducer.user);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [openRate, setOpenRate] = useState(false);
    const { data: course, isLoading: isLoadingCourse } = useQuery({
        queryKey: ['singleCourseById'],
        queryFn: () => getSingleCourseById(id || ''),
    });
    const { data: rating, refetch: refetchRating } = useQuery({
        queryKey: ['rating', id],
        queryFn: () => fetchRatingByCourseId(id || ''),
    });
    const mutationRating = useMutation({
        mutationKey: ['rating'],
        mutationFn: createRating,
        onSuccess: () => {
            refetchRating();
        },
    });
    const handleToggleTheme = () => {
        const newTheme = homeState.theme === 'light' ? 'dark' : 'light';
        dispatch({
            type: TOGGLE_THEME_HOME,
            theme: newTheme,
        });
    };
    const handleCreateRating = (stars, comment) => {
        if (user?._id && id && stars && comment) {
            const payload = {
                course_id: id,
                user_id: user._id,
                stars: stars,
                comment: comment,
            };
            mutationRating.mutate(payload);
        }
    };
    const isRated = useMemo(() => {
        return rating?.ratings.some((r) => r.user_id === user._id);
    }, [data, rating]);
    const totalResource = useMemo(() => {
        return data.reduce((acc, m) => acc + m.resources.length, 0);
    }, [data]);
    const totalResourceCompleted = useMemo(() => {
        return data.reduce((acc, m) => {
            return acc + m.resources.filter((r) => r?.progress?.is_completed).length;
        }, 0);
    }, [data]);
    return (_jsxs(BoxHeader, { isMobile: isMobile, children: [_jsxs(Box, { color: "white", display: "flex", alignItems: "center", children: [_jsx(Link, { to: '/', children: _jsx(StyledButton, { children: _jsx(BiChevronLeft, { color: "white" }) }) }), _jsx(Typography, { variant: isMobile ? 'h6' : 'h5', color: "white", children: isLoadingCourse ? 'loading...' : course.title })] }), _jsxs(BoxCenter, { children: [_jsxs(BoxCenter, { children: [_jsx(Progress, { sx: { width: '100px' }, value: (100 / totalResource) * totalResourceCompleted }), !isMobile && (_jsxs(Typography, { variant: "caption", color: "white", children: [totalResourceCompleted, "/", totalResource, " b\u00E0i h\u1ECDc"] }))] }), _jsx(PlacementToggle, { placement: "right", Connect: (connect) => (_jsxs(StyledDescriptionBox, { onClick: connect, children: [_jsx(DescriptionIcon, { sx: { color: 'white', fontSize: '20px', marginRight: '5px' } }), !isMobile && (_jsx(Typography, { color: "white", variant: "body2", children: "Ghi ch\u00FA" }))] })), children: _jsx(Note, { notes: notes }) }), _jsxs(BoxCenter, { sx: { cursor: 'pointer' }, onClick: handleToggleTheme, children: [_jsx(ContrastIcon, { sx: { fontSize: '20px', color: 'white', mr: 1 } }), !isMobile && (_jsx(Typography, { color: "white", variant: "body2", children: "Theme" }))] }), _jsxs(BoxCenter, { sx: { cursor: 'pointer' }, onClick: () => setOpenRate(true), children: [_jsx(StarsIcon, { sx: { fontSize: '20px', color: 'white', mr: 1 } }), !isMobile && (_jsx(Typography, { color: "white", variant: "body2", children: "\u0110\u00E1nh gi\u00E1" }))] })] }), _jsx(Dialog, { open: openRate, title: "\u0110\u00E1nh gi\u00E1", onClose: () => setOpenRate(false), children: _jsx(RatingPreview, { user_id: user._id, comments: rating ? rating.ratings : [], onChange: handleCreateRating, mode: isRated ? 'view' : 'edit', ratingCounts: rating
                        ? [
                            rating.stats.oneStar,
                            rating.stats.twoStars,
                            rating.stats.threeStars,
                            rating.stats.fourStars,
                            rating.stats.fiveStars,
                        ]
                        : [0, 0, 0, 0, 0] }) })] }));
};
export default Header;
