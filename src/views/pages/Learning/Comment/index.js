import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { Link as MUILink } from '@mui/material';
import { Link } from 'react-router-dom';
// soket
import { io } from 'socket.io-client';
// redux
import { useSelector } from 'react-redux';
// mui
import { Avatar, Box, Button, Typography, IconButton, Stack, useTheme } from '@mui/material';
// healessTippy
import HeadlessTippy from '@tippyjs/react/headless';
// icon
import { ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon, Reply as ReplyIcon } from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
//custom hook
import useQueryParams from '@/hooks/useQueryParams';
import { getCommentByResourceId, createComment, deleteComment } from '@/api/CommentApi';
// text
import TextEditor from '@/components/TextEditor';
// my pj
import Wrapper from '@/components/Wrapper';
import { BeatLoader } from 'react-spinners';
import path from '@/constants/routes';
const socket = io(import.meta.env.VITE_URL_SERVER);
export default function Comment() {
    const { get } = useQueryParams();
    const resource_id = get('id');
    const comment_id = get('comment');
    const user = useSelector((state) => state.authReducer.user);
    const { data: comments = [], isLoading, refetch, } = useQuery({
        queryKey: ['comment', resource_id],
        queryFn: ({ queryKey }) => {
            const [, id] = queryKey;
            return getCommentByResourceId(id);
        },
    });
    const mutation = useMutation({
        mutationKey: ['comment'],
        mutationFn: createComment,
    });
    // socket
    useEffect(() => {
        if (resource_id) {
            // Tham gia vào phòng dựa trên `resource_id`
            socket.emit('joinCommentRoom', resource_id);
        }
        socket.on('newComment', (data) => {
            console.log(data);
            refetch();
        });
        socket.on('deleteComment', (data) => {
            console.log(data);
            refetch();
        });
        return () => {
            if (resource_id) {
                socket.emit('leaveCommentRoom', resource_id); // Thoát phòng khi rời
            }
            socket.off('newComment'); // Hủy lắng nghe sự kiện
            socket.off('deleteComment'); // Hủy lắng nghe sự kiện
        };
    }, [resource_id]);
    const handleComment = (content) => {
        if (resource_id && user?._id) {
            const payloadData = {
                resource_id: resource_id,
                user_id: user._id,
                content,
            };
            mutation.mutate(payloadData);
        }
    };
    useEffect(() => {
        const comments = document.querySelectorAll('.comments');
        comments.forEach((comment) => {
            const id = comment.getAttribute('data-id'); // Ép kiểu comment thành HTMLElement
            if (id === comment_id) {
                // Ép kiểu lại để sử dụng `style`
                const element = comment;
                element.scrollIntoView({
                    behavior: 'instant',
                    block: 'start',
                    inline: 'nearest',
                });
                // Thay đổi style của phần tử
                element.style.border = '2px solid red';
                element.style.transition = 'border 0.5s ease-in-out';
                // Xóa border sau 2 giây
                setTimeout(() => {
                    element.style.border = 'none';
                }, 2000);
            }
        });
    }, [comment_id]);
    if (isLoading)
        return _jsx("div", { children: "Loading comments..." });
    return (_jsxs(Box, { maxWidth: "md", margin: "auto", padding: 2, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, fontWeight: "bold", children: "B\u00ECnh lu\u1EADn" }), _jsx(CommentInput, { mutation: mutation, user: user, onSubmit: handleComment, buttonText: "B\u00ECnh lu\u1EADn" }), _jsx(Stack, { spacing: 3, children: comments.length ? (comments.map((c) => (_jsx(CommentItem, { user: user, comment: c, parent_id: c._id, deep: 1 }, c._id)))) : (_jsx(Box, { textAlign: 'center', children: "Kh\u00F4ng c\u00F3 n\u1ED9i dung comment" })) })] }));
}
function CommentInput({ user, onSubmit, buttonText = 'Bình luận', init = '', mutation }) {
    const [comment, setComment] = useState(init);
    const theme = useTheme();
    const handleSubmit = () => {
        if (comment.trim()) {
            onSubmit && onSubmit(comment);
            setComment(''); // Clear comment input after submit
        }
    };
    return (_jsxs(Box, { display: "flex", alignItems: "flex-start", children: [_jsx(Avatar, { src: user?.profile_picture, sx: {
                    marginRight: 2,
                    width: 40,
                    height: 40,
                    backgroundColor: theme.palette.background.paper2,
                    color: theme.palette.text.primary,
                } }), _jsxs(Box, { flexGrow: 1, children: [_jsx(TextEditor, { mode: "basic", value: comment, onChange: (data) => setComment(data) }), _jsx(Box, { display: "flex", justifyContent: "flex-end", marginTop: 1, children: _jsx(Button, { sx: {
                                backgroundColor: theme.palette.background.paper2,
                                color: theme.palette.text.primary,
                            }, disableElevation: true, onClick: handleSubmit, children: mutation.isPending ? _jsx(BeatLoader, { style: { marginLeft: '3px' }, size: 10 }) : buttonText }) })] })] }));
}
function CommentItem({ user, fatherCommentUser = null, comment, deep = 1 }) {
    const [isReplying, setIsReplying] = useState(false);
    const theme = useTheme();
    const mutation = useMutation({
        mutationKey: ['comment'],
        mutationFn: createComment,
        onSuccess: () => {
            setIsReplying(false);
        },
    });
    const handleReply = async (content) => {
        console.log(`Reply to ${comment.user.name}:`, content);
        if (comment.resource_id && user?._id && comment._id && content) {
            const payloadData = {
                resource_id: comment.resource_id,
                user_id: user._id,
                parent_id: comment._id,
                content,
            };
            mutation.mutate(payloadData);
        }
    };
    const handleDeleteComment = async (id) => {
        if (confirm('Bạn có muốn xóa comment này không?')) {
            await deleteComment(id);
        }
    };
    return (_jsxs(Box, { className: "comments", "data-id": comment._id, children: [_jsxs(Box, { display: "flex", children: [_jsx(Avatar, { target: '_blank', to: path.client.profile(`?id=${comment.user._id}`), component: Link, src: comment.user.profile_picture, alt: comment.user.name, sx: {
                            marginRight: 2,
                            width: 40,
                            height: 40,
                            background: theme.palette.background.paper2,
                            color: theme.palette.text.primary,
                        } }), _jsxs(Box, { flexGrow: 1, children: [_jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(Typography, { variant: "subtitle2", component: "span", fontWeight: "bold", color: "text.primary", children: comment.user.name }), _jsx(Typography, { variant: "caption", component: "span", color: "text.secondary", sx: { marginLeft: 1 }, children: moment(comment.createdAt).fromNow() }), user._id === comment.user._id && (_jsx(HeadlessTippy, { trigger: "click", placement: "bottom-start", interactive: true, allowHTML: true, render: (attrs) => (_jsx(Wrapper, { ...attrs, style: { padding: 0 }, children: _jsx(Button, { onClick: () => handleDeleteComment(comment._id), children: "X\u00F3a b\u00ECnh lu\u1EADn" }) })), children: _jsx(Button, { children: _jsx(MoreHorizIcon, { sx: { fontSize: '20px' } }) }) }))] }), _jsx(Typography, { variant: "body2", paragraph: true, sx: { mt: 0.5, color: 'text.primary' }, children: _jsxs(Box, { display: 'flex', children: [fatherCommentUser && (_jsxs(MUILink, { mr: 1, target: "_blank", to: path.client.profile(`?id=${fatherCommentUser._id}`), component: Link, children: ["@", fatherCommentUser.name] })), _jsx("span", { dangerouslySetInnerHTML: { __html: comment.content } })] }) }), _jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(IconButton, { size: "small", "aria-label": "like", children: _jsx(ThumbUpIcon, { sx: { color: theme.palette.text.primary }, fontSize: "small" }) }), _jsx(Typography, { variant: "caption", sx: { marginRight: 1, color: 'text.secondary' }, children: comment.likes }), _jsx(IconButton, { size: "small", "aria-label": "dislike", children: _jsx(ThumbDownIcon, { sx: { color: theme.palette.text.primary }, fontSize: "small" }) }), _jsx(Button, { startIcon: _jsx(ReplyIcon, {}), size: "small", sx: {
                                            marginLeft: 2,
                                            color: theme.palette.text.primary,
                                        }, variant: "text", onClick: () => setIsReplying(!isReplying), children: "Tr\u1EA3 l\u1EDDi" })] })] })] }), isReplying && (_jsx(Box, { ml: 7, mt: 2, children: _jsx(CommentInput, { mutation: mutation, user: user, onSubmit: handleReply, placeholder: "Add a reply...", buttonText: "Tr\u1EA3 l\u1EDDi" }) })), comment.replies.length > 0 && (_jsx(Box, { ml: deep === 1 ? 7 : 0, mt: 2, children: _jsx(Stack, { spacing: 2, children: comment.replies.map((reply, index) => (_jsx(CommentItem, { parent_id: comment._id, user: user, fatherCommentUser: comment.user, comment: reply, deep: deep + 1 }, index))) }) }))] }));
}
