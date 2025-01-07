import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import s from './PostOverview.module.scss';
import { Link } from 'react-router-dom';
const PostOverview = () => {
    const articles = [
        {
            imgSrc: 'images/baiviet-img3.jpg',
            title: 'Mình đã làm thế nào để hoàn thành một website chỉ trong 15 ngày',
            date: '23/02/24',
            comments: '3 bình luận',
            description: 'Trong quá trình mình code thì mình đã nảy sinh ra những ý tưởng...',
            tags: ['Web Development', 'React'],
        },
        {
            imgSrc: 'images/baiviet-img3.jpg',
            title: 'Làm thế nào để xây dựng ứng dụng React hiệu quả',
            date: '25/03/24',
            comments: '5 bình luận',
            description: 'Xây dựng một ứng dụng React hiệu quả cần chú ý đến các yếu tố như...',
            tags: ['React', 'JavaScript'],
        },
        {
            imgSrc: 'images/baiviet-img3.jpg',
            title: 'Các mẹo tăng tốc phát triển front-end',
            date: '10/04/24',
            comments: '2 bình luận',
            description: 'Để tăng tốc phát triển front-end, bạn cần tập trung vào những điều sau...',
            tags: ['Frontend', 'CSS'],
        },
        {
            imgSrc: 'images/baiviet-img3.jpg',
            title: 'Hiểu sâu hơn về quản lý trạng thái trong React',
            date: '15/05/24',
            comments: '7 bình luận',
            description: 'Quản lý trạng thái là một trong những yếu tố quan trọng trong ứng dụng React...',
            tags: ['React', 'State Management'],
        },
        {
            imgSrc: 'images/baiviet-img3.jpg',
            title: 'Làm việc với APIs trong ứng dụng JavaScript',
            date: '20/06/24',
            comments: '10 bình luận',
            description: 'Tương tác với APIs là một kỹ năng quan trọng cho bất kỳ nhà phát triển front-end...',
            tags: ['API', 'JavaScript'],
        },
    ];
    return (_jsxs("div", { className: clsx(s['main-baiviet']), children: [_jsx("div", { className: clsx(s['main-baiviet-banner']), children: _jsx("img", { src: "images/banner-baiviet.png", alt: "" }) }), _jsxs("div", { className: clsx(s['main-baiviet-boxs']), children: [_jsxs("div", { className: clsx(s['main-baiviet-box1']), children: [_jsx("div", { className: clsx(s['main-baiviet-boxcon1']), children: _jsx("h3", { className: clsx(s['main-baiviet-h3']), children: "FTECH" }) }), _jsxs("div", { className: clsx(s['main-baiviet-href']), children: [_jsx("a", { href: "", children: "NEWS" }), _jsx("a", { href: "", children: "KHUY\u1EBEN M\u00C3I" }), _jsx("a", { href: "", children: "\u01AFU \u0110\u00C3I KHI MUA KH\u00D3A H\u1ECCC" }), _jsx("a", { href: "", children: "CHI TI\u1EBET L\u1ED8 TR\u00CCNH H\u1ECCC" })] })] }), _jsx("div", { className: clsx(s['main-baiviet-box2']), children: articles.map((article, index) => (_jsxs("div", { className: clsx(s['main-baiviet-item-wrapper']), children: [_jsx("img", { className: clsx(s['main-baiviet-item']), src: article.imgSrc, alt: "" }), _jsxs("div", { className: clsx(s['main-baiviet-content']), children: [_jsxs(Link, { to: "/news-detail", children: [' ', _jsx("h4", { children: article.title })] }), _jsxs("p", { children: [_jsxs("span", { children: ["\uD83D\uDCC5 ", article.date] }), _jsxs("span", { children: [" \uD83D\uDCAC ", article.comments] })] }), _jsx("a", { href: "", children: article.description }), _jsx("div", { className: clsx(s['tags']), children: article.tags.map((tag, i) => (_jsx("span", { className: clsx(s['tag']), children: tag }, i))) })] })] }, index))) })] })] }));
};
export default PostOverview;
