import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
const PostManagement = () => {
    const theme = useTheme();
    const [page, setPage] = useState(1);
    const postsPerPage = 6;
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày.',
            description: 'Khi chưa có kinh nghiệm xây dựng và chỉ có 15 ngày, mình đã hoàn thành dự án với rất nhiều thử thách.',
            author: 'Admin',
            authorAvatar: '/path/to/avatar.jpg',
            category: 'Bài viết mới',
            date: '27-09-2024',
            views: 157,
        },
        // Additional posts can go here
    ]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const handleConfirmClick = (post) => {
        setSelectedPost(post);
        setOpenConfirm(true);
    };
    const handleDeleteClick = (post) => {
        setSelectedPost(post);
        setOpenDelete(true);
    };
    const handleClose = () => {
        setOpenConfirm(false);
        setOpenDelete(false);
        setSelectedPost(null);
    };
    const handleConfirm = () => {
        setOpenConfirm(false);
        alert(`Bạn đã xác nhận bài viết: ${selectedPost?.title}`);
    };
    const handleDelete = () => {
        if (selectedPost) {
            setPosts(posts.filter((post) => post.id !== selectedPost.id));
        }
        setOpenDelete(false);
        alert(`Bài viết ${selectedPost?.title} đã bị xóa.`);
    };
    return (_jsxs("div", { className: "tw-max-w-7xl tw-mx-auto tw-p-6 tw-min-h-screen", children: [_jsxs("div", { className: "tw-flex tw-justify-between tw-items-center tw-mb-6", children: [_jsx("h1", { className: "tw-text-xl tw-font-semibold", children: "Qu\u1EA3n l\u00FD b\u00E0i vi\u1EBFt" }), _jsx(Button, { variant: "contained", color: "primary", className: "tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4", children: "B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n" })] }), _jsxs("div", { style: { background: theme.palette.background.default }, className: "tw-py-4 tw-px-6 tw-flex tw-justify-between tw-items-center tw-mb-6 tw-shadow-md", children: [_jsx("p", { children: "Ch\u1EE9c n\u0103ng \"Th\u00EAm b\u00E0i vi\u1EBFt\" cho ph\u00E9p ng\u01B0\u1EDDi d\u00F9ng qu\u1EA3n l\u00FD h\u1EC7 th\u1ED1ng danh m\u1EE5c v\u00E0 th\u00EAm m\u1EDBi b\u00E0i vi\u1EBFt v\u00E0o c\u01A1 s\u1EDF d\u1EEF li\u1EC7u." }), _jsx(Button, { variant: "contained", color: "primary", className: "tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4", children: "Th\u00EAm b\u00E0i vi\u1EBFt" })] }), _jsx("div", { className: "tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4", children: posts.slice((page - 1) * postsPerPage, page * postsPerPage).map((post) => (_jsx("div", { className: "tw-bg-white tw-p-4 tw-shadow-md tw-border tw-flex", children: _jsxs("div", { className: "tw-flex-grow", children: [_jsx("h2", { className: "tw-font-semibold tw-text-base tw-mb-1", children: post.title }), _jsx("p", { className: "tw-text-gray-600 tw-text-xs tw-w-[80%] tw-mb-2", children: post.description }), _jsxs("div", { className: "tw-flex tw-items-center tw-mb-2", children: [_jsx("img", { src: post.authorAvatar, alt: post.author, className: "tw-w-10 tw-h-10 tw-rounded-full tw-mr-2" }), _jsx("span", { className: "tw-text-gray-600", children: post.author })] }), _jsxs("div", { className: "tw-flex tw-justify-between", children: [_jsx("div", { className: "tw-grid tw-grid-flow-row tw-row-span-2 tw-items-center tw-w-[50%] tw-pr-4", children: post.author === 'Admin' ? (_jsx(Button, { variant: "contained", color: "primary", className: "tw-bg-purple-500 tw-my-4 hover:tw-bg-purple-600 tw-w-full tw-text-white tw-mb-2", children: "Xem b\u00E0i vi\u1EBFt" })) : (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "contained", color: "secondary", className: "tw-bg-blue-500 hover:tw-bg-blue-600 tw-text-white tw-mr-2", onClick: () => handleConfirmClick(post), children: "X\u00E1c nh\u1EADn b\u00E0i vi\u1EBFt" }), _jsx(Button, { variant: "contained", color: "error", className: "tw-bg-red-500 tw-my-4 hover:tw-bg-red-600 tw-text-white", onClick: () => handleDeleteClick(post), children: "X\u00F3a b\u00E0i vi\u1EBFt" })] })) }), _jsxs("div", { className: "tw-mt-4 tw-text-sm tw-flex tw-w-[30%] tw-flex-col tw-text-gray-600", children: [_jsxs("p", { children: [_jsx("span", { className: "tw-font-bold tw-py-2", children: "L\u01B0\u1EE3t xem:" }), " ", post.views] }), _jsxs("p", { children: [_jsx("span", { className: "tw-font-bold tw-py-2", children: "Danh m\u1EE5c:" }), " ", post.category] }), _jsxs("p", { children: [_jsx("span", { className: "tw-font-bold tw-py-2", children: "Ng\u00E0y t\u1EA1o:" }), " ", post.date] })] })] })] }) }, post.id))) }), _jsxs("div", { className: "tw-flex tw-justify-between tw-mt-6", children: [_jsx(Button, { variant: "contained", className: "tw-via-violet-500 tw-text-white tw-py-2 tw-px-4", onClick: () => setPage((prev) => Math.max(prev - 1, 1)), children: "Trang tr\u01B0\u1EDBc" }), _jsx(Button, { variant: "contained", className: "tw-via-violet-500 tw-text-white tw-py-2 tw-px-4 tw-ml-4", onClick: () => setPage((prev) => prev + 1), children: "Trang sau" })] }), openConfirm && (_jsx("div", { className: "tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-justify-center tw-items-center", children: _jsxs("div", { className: "tw-bg-white tw-p-4 tw-rounded tw-shadow-lg", children: [_jsx("h2", { className: "tw-text-lg tw-font-semibold", children: "X\u00E1c nh\u1EADn b\u00E0i vi\u1EBFt" }), _jsx("p", { children: "B\u1EA1n c\u00F3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\u00E1c nh\u1EADn b\u00E0i vi\u1EBFt n\u00E0y?" }), _jsxs("div", { className: "tw-flex tw-justify-end tw-mt-4", children: [_jsx(Button, { onClick: handleClose, className: "tw-text-gray-500 tw-mr-4", children: "H\u1EE7y" }), _jsx(Button, { variant: "contained", className: "tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4", onClick: handleConfirm, children: "X\u00E1c nh\u1EADn" })] })] }) })), openDelete && (_jsx("div", { className: "tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-justify-center tw-items-center", children: _jsxs("div", { className: "tw-bg-white tw-p-4 tw-rounded tw-shadow-lg", children: [_jsx("h2", { className: "tw-text-lg tw-font-semibold", children: "X\u00F3a b\u00E0i vi\u1EBFt" }), _jsxs("p", { children: ["B\u1EA1n c\u00F3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\u00F3a b\u00E0i vi\u1EBFt \"", selectedPost?.title, "\" kh\u00F4ng?"] }), _jsxs("div", { className: "tw-flex tw-justify-end tw-mt-4", children: [_jsx(Button, { onClick: handleClose, className: "tw-text-gray-500 tw-mr-4", children: "H\u1EE7y" }), _jsx(Button, { variant: "contained", className: "tw-bg-red-500 tw-text-white tw-py-2 tw-px-4", onClick: handleDelete, children: "X\u00F3a" })] })] }) }))] }));
};
export default PostManagement;
