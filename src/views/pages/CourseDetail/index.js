import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
// redux
// ui
import { Box, Grid, Typography, Button, CardMedia, styled, useTheme, Avatar, TextField } from '@mui/material';
//icon
import DoneIcon from '@mui/icons-material/Done';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SpeedIcon from '@mui/icons-material/Speed';
import DvrIcon from '@mui/icons-material/Dvr';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';
// toast
import { toast, ToastContainer } from 'react-toastify';
//my pj
import AverageRating from '@/components/AverageRating';
import Module from '@/components/Module';
import ButtonPrimary from '@/components/ButtonPrimary';
import RatingPreview from '@/components/RatingPreview';
//my pj
import Dialog from '@/components/Dialog';
import { getCourseFull } from '@/api/courseApi';
import { createOrder } from '@/api/OrderApi';
import { createAccess } from '@/api/accessApi';
import sleep from '@/utils/sleep';
import path from '@/constants/routes';
import CourseDetailSkeleton from '../../../ui-component/cards/Skeleton/CourseDetailSkeleton';
import { fetchRatingByCourseId } from '@/api/rating';
import { applyCoupon, getCouponsByCourseId } from '@/api/coupon';
import CouponList from './CouponList';
const BoxCenter = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: 'var(--medium-space)',
}));
const BoxPreviewVideo = styled(Box)(({}) => ({
    position: 'relative',
    cursor: 'pointer',
    '&::after': {
        content: '" "',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 'var(--main-border-radius)',
        zIndex: 1,
    },
}));
const CourseDetail = () => {
    const [isOpenCoupon, setIsOpenCoupon] = useState(false);
    const [code, setCode] = useState('');
    const [discountData, setDiscountData] = useState({});
    const { id } = useParams();
    const authState = useSelector((state) => state.authReducer);
    const [isShowMoreLearningOutCome, setIsShowMoreLearningOutCome] = useState(false);
    const [expandedIndexs, setExpandedIndexs] = useState([0]);
    const navigate = useNavigate();
    const theme = useTheme();
    const mutation = useMutation({
        mutationKey: ['order'],
        mutationFn: createOrder,
        onMutate: () => {
            toast.loading('Vui lòng chờ...');
        },
        onSuccess: (data) => {
            window.location.href = data.payUrl;
            toast.dismiss();
        },
        onError: () => {
            toast.dismiss();
            toast.error('Thanh toán thất bại. Vui lòng thử lại!');
        },
    });
    const mutationAccess = useMutation({
        mutationKey: ['access'],
        mutationFn: createAccess,
        onMutate: () => {
            toast.loading('Đang tạo quyền truy cập!');
        },
        onSuccess: (data) => {
            if (data) {
                navigate(`/learning/${id}`);
            }
            toast.dismiss();
        },
        onError: () => {
            toast.dismiss();
            toast.error('Tạo quyền truy cập khóa học thất bại. Vui lòng thử lại!');
        },
    });
    const mutationCoupon = useMutation({
        mutationKey: ['coupon'],
        mutationFn: applyCoupon,
        onSuccess: (data) => {
            toast.success('Áp dụng khuyến mãi thành công');
            setDiscountData(data);
            refetchCoupons();
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });
    const { data: rating } = useQuery({
        queryKey: ['rating', id],
        queryFn: () => fetchRatingByCourseId(id || ''),
    });
    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ['course'],
        queryFn: () => getCourseFull(id || ''),
    });
    const { data: coupons, isLoading: isLoadingCoupon, refetch: refetchCoupons, } = useQuery({
        queryKey: ['coupons', data?._id],
        queryFn: () => getCouponsByCourseId(data?._id),
        enabled: data?.isFree === false,
    });
    const handleToggleExpanded = (index) => {
        setExpandedIndexs((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
    };
    const handleToggleExpandedAll = () => {
        if (data.modules.length == expandedIndexs.length) {
            setExpandedIndexs([]);
        }
        else {
            setExpandedIndexs(data.modules.map((_, index) => index));
        }
    };
    const handleToggleShowMoreLearningOutCome = () => {
        setIsShowMoreLearningOutCome((prev) => !prev);
    };
    const handleOrder = async () => {
        if (!authState.user || !authState.accessToken) {
            toast.error('Vui lòng đăng nhập trước khi thanh toán!');
            await sleep(2000);
            navigate(path.client.auth.login);
            return;
        }
        mutation.mutate({
            user_id: authState.user?._id,
            course_id: data?._id,
            amount: Math.round(discountData?.discountedPrice) || data?.sale_price,
            payment_method: 'MOMO',
            code: code,
            email: authState.user.email,
        });
    };
    const handleCreateAccess = async () => {
        if (!authState.user || !authState.accessToken || !data?._id) {
            navigate(path.client.auth.login);
            return;
        }
        mutationAccess.mutate({
            user_id: authState.user?._id,
            course_id: data?._id,
        });
    };
    const handleApplyCoupon = () => {
        if (!code)
            return toast.error('Vui lòng nhập code');
        if (!authState?.user?._id)
            return toast.error('Vui lòng đăng nhập');
        if (!data?.sale_price)
            return;
        if (!id)
            return;
        const payload = {
            code,
            course_id: id,
            price: data?.sale_price,
            user_id: authState?.user?._id,
        };
        mutationCoupon.mutate(payload);
    };
    const totalResources = useMemo(() => {
        if (data) {
            return data.modules.reduce((acc, c) => acc + c.resources.length, 0);
        }
    }, [data]);
    const totalhourse = useMemo(() => {
        if (data) {
            const totalSecond = data.modules.reduce((acc, c) => {
                return (acc +
                    c.resources.reduce((acc, m) => {
                        return acc + m.duration;
                    }, 0));
            }, 0);
            const duration = moment.duration(totalSecond, 'seconds');
            const hours = duration.hours();
            const minutes = duration.minutes();
            const second = duration.seconds();
            return `${hours} giờ ${minutes} phút ${second} giây`;
        }
    }, [data]);
    if (isLoading || isFetching)
        return _jsx(CourseDetailSkeleton, {});
    if (isError)
        return _jsx("div", { children: "Error..." });
    return (_jsxs(Box, { mt: 'var(--large-space)', children: [_jsxs(Grid, { container: true, spacing: { xs: 0, sm: 2, lg: 4 }, width: '100%', sx: {
                    flexDirection: {
                        xs: 'column-reverse',
                        md: 'row',
                    },
                    px: {
                        xs: '2px',
                        md: '0',
                    },
                }, children: [_jsxs(Grid, { item: true, xs: 12, md: 8, xl: 8, children: [_jsx(Typography, { variant: "h2", children: data.title }), _jsx(Typography, { variant: "body1", mt: 'var(--medium-space)', dangerouslySetInnerHTML: { __html: data.description } }), _jsx(AverageRating, { totalStars: rating?.stats.totalStars || 0, totalUserRate: rating?.stats.totalRatings || 0, stars: 5 }), _jsxs(Button, { component: Link, to: `/profile?id=${data.user._id}`, sx: {
                                    padding: 0,
                                    my: 'var(--medium-space)',
                                }, children: [_jsx(Avatar, { src: data.user.profile_picture }), _jsx(Typography, { variant: "h4", ml: "var(--medium-space)", children: data.user.name }), _jsx(CheckCircleIcon, { sx: { fontSize: 'var(--small-icon)', ml: '3px' } })] }), _jsx(Typography, { variant: "h3", mt: 'var(--medium-space)', children: "B\u1EA1n s\u1EBD h\u1ECDc \u0111\u01B0\u1EE3c nh\u1EEFng g\u00EC?" }), _jsxs(Box, { sx: {
                                    backgroundColor: theme.palette.background.paper2,
                                }, children: [_jsx(Grid, { container: true, sx: {
                                            overflow: 'hidden',
                                            maxHeight: isShowMoreLearningOutCome ? 'none' : '400px',
                                        }, spacing: 1, mt: 'var(--medium-space)', p: 2, children: data.learning_outcomes.map((l, index) => (_jsxs(Grid, { item: true, xs: 6, display: 'flex', children: [_jsx(DoneIcon, { fontSize: "inherit" }), _jsx(Typography, { ml: 1, children: l })] }, index))) }), _jsx(Button, { onClick: handleToggleShowMoreLearningOutCome, children: isShowMoreLearningOutCome ? 'Ẩn bớt' : 'Xem thêm' })] }), _jsx(Typography, { variant: "h3", mt: 'var(--medium-space)', children: "N\u1ED9i dung kh\u00F3a h\u1ECDc" }), _jsxs(Box, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', children: [_jsxs(Typography, { variant: "body1", mt: 'var(--medium-space)', children: [data.modules.length, " ch\u01B0\u01A1ng \u2022 ", totalResources, " b\u00E0i h\u1ECDc \u2022 Th\u1EDDi l\u01B0\u1EE3ng ", totalhourse] }), _jsx(Button, { onClick: handleToggleExpandedAll, children: expandedIndexs.length == data.modules.length ? 'Đóng tất cả' : 'Mở tất cả' })] }), _jsx(Box, { mt: 'var(--medium-space)', sx: {
                                    border: '1px solid #d1d7dc',
                                }, children: data.modules.map((module, index) => (_jsx(Module, { onClick: () => handleToggleExpanded(index), expanded: expandedIndexs.includes(index), styleM: "two", title: module.title, items: module.resources }, index))) }), _jsx(Typography, { variant: "h3", mt: 'var(--medium-space)', children: "\u0110\u00E1nh gi\u00E1" }), _jsx(RatingPreview, { comments: rating ? rating.ratings : [], mode: 'view', ratingCounts: rating
                                    ? [
                                        rating.stats.oneStar,
                                        rating.stats.twoStars,
                                        rating.stats.threeStars,
                                        rating.stats.fourStars,
                                        rating.stats.fiveStars,
                                    ]
                                    : [0, 0, 0, 0, 0] })] }), _jsx(Grid, { item: true, xs: 12, md: 4, xl: 4, children: _jsxs(Box, { position: 'sticky', top: "97px", mb: 'var(--medium-space)', sx: {
                                backgroundColor: theme.palette.background.paper2,
                                paddingBottom: '20px',
                                minHeight: '80vh',
                            }, children: [_jsxs(BoxPreviewVideo, { children: [_jsx(CardMedia, { component: "img", image: data.thumbnail, sx: {
                                                borderRadius: '14px',
                                                width: '100%',
                                            } }), _jsx(PlayCircleIcon, { sx: {
                                                position: 'absolute',
                                                fontSize: 'var(--large-icon)',
                                                color: 'white',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                zIndex: 2,
                                            } })] }), _jsxs(Grid, { container: true, spacing: 1, sx: {
                                        px: {
                                            sm: 0,
                                            md: 5,
                                        },
                                    }, children: [!data.isFree && (_jsxs(_Fragment, { children: [_jsx(Grid, { item: true, xs: 12, mt: 'var(--medium-space)', children: _jsxs(Grid, { container: true, spacing: 2, alignItems: "center", children: [Object.keys(discountData)?.length > 0 && (_jsx(Grid, { item: true, children: _jsxs(Typography, { variant: "h3", children: [Number(Math.round(discountData?.discountedPrice)).toLocaleString('vi-VN'), " VND"] }) })), _jsx(Grid, { item: true, children: _jsxs(Typography, { sx: { textDecoration: Object.keys(discountData)?.length > 0 ? 'line-through' : '' }, variant: Object.keys(discountData)?.length > 0 ? 'h5' : 'h3', children: [Number(data.sale_price).toLocaleString('vi-VN'), " VND"] }) }), _jsx(Grid, { item: true, children: _jsxs(Typography, { variant: "h5", sx: { textDecoration: 'line-through' }, children: [Number(data.original_price).toLocaleString('vi-VN'), " VND"] }) }), Object.keys(discountData)?.length > 0 && (_jsxs(Grid, { xs: 12, item: true, children: ["B\u1EA1n d\u00F9ng m\u00E3 ", discountData.code, " \u0111\u01B0\u1EE3c gi\u1EA3m", ' ', Number(Math.round(discountData?.discount)).toLocaleString('vi-VN'), " \u0111"] }))] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(Grid, { container: true, spacing: 1, alignItems: "center", children: [_jsx(Grid, { item: true, xs: 6, children: _jsx(TextField, { onChange: (e) => setCode(e.target.value), value: code, placeholder: "nh\u1EADp m\u00E3", variant: "outlined", fullWidth: true, inputProps: { style: { padding: '14px' } } }) }), _jsx(Grid, { item: true, xs: 6, children: _jsx(ButtonPrimary, { onClick: handleApplyCoupon, customVariant: "outlined", fullWidth: true, children: "\u00C1p d\u1EE5ng" }) })] }) })] })), !data.isFree && (_jsx(Grid, { item: true, children: _jsx(Button, { onClick: () => setIsOpenCoupon(true), sx: { p: 0, m: 0 }, size: "small", children: "Khuy\u1EBFn m\u00E3i" }) })), _jsx(Grid, { item: true, xs: 12, children: data.isFree ? (_jsx(ButtonPrimary, { disabled: mutationAccess.isPending, onClick: handleCreateAccess, sx: { mt: 2 }, fullWidth: true, children: "\u0110\u0103ng k\u00FD h\u1ECDc ngay" })) : (_jsxs(ButtonPrimary, { disabled: mutation.isPending, onClick: handleOrder, fullWidth: true, children: ["Thanh to\u00E1n ngay ", _jsx(PaymentIcon, {})] })) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { variant: "h4", fontWeight: 'var(--bold-font-weight)', children: "Kh\u00F3a h\u1ECDc bao g\u1ED3m:" }), _jsxs(BoxCenter, { children: [_jsx(SpeedIcon, {}), _jsxs(Typography, { ml: 2, children: ["Tr\u00ECnh \u0111\u1ED9 h\u1ECDc m\u1EE9c ", data.level] })] }), _jsxs(BoxCenter, { children: [_jsx(DvrIcon, {}), _jsxs(Typography, { ml: 2, children: ["T\u1ED5ng s\u1ED1 b\u00E0i gi\u1EA3ng ", totalResources] })] }), _jsxs(BoxCenter, { children: [_jsx(AccessTimeIcon, {}), _jsxs(Typography, { ml: 2, children: ["T\u1ED5ng th\u1EDDi l\u01B0\u1EE3ng ", totalhourse] })] }), data.has_certificate && (_jsxs(BoxCenter, { children: [_jsx(EmojiEventsIcon, {}), _jsx(Typography, { ml: 2, children: "C\u1EA5p ch\u1EE9ng khi sau khi ho\u00E0n th\u00E0nh" })] }))] })] })] }) })] }), _jsx(ToastContainer, {}), _jsx(Dialog, { title: "M\u00E3 khuy\u1EBFn m\u00E3i", open: isOpenCoupon, onClose: () => setIsOpenCoupon(false), children: isLoadingCoupon ? ('loading...') : coupons?.length > 0 ? (_jsx(CouponList, { coupons: coupons, onChange: (code) => {
                        setCode(code);
                        setIsOpenCoupon(false);
                    } })) : (_jsx(Typography, { children: "Kh\u00F4ng c\u00F3 m\u00E3 gi\u1EA3m gi\u00E1 n\u00E0o cho kh\u00F3a h\u1ECDc n\u00E0y" })) })] }));
};
export default CourseDetail;
