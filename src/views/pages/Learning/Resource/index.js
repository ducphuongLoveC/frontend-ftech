import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import HeadlessTippy from '@tippyjs/react/headless';
import { useSelector } from 'react-redux';
import ArtPlayerComponent from '@/components/ArtplayComponent';
import Question from './Question';
// redux
// ui
import { toast, ToastContainer } from 'react-toastify';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme, styled } from '@mui/material';
// api
import { completeResource } from '@/api/progess';
import { createNote } from '@/api/noteApi';
const BoxHeaderAndNote = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));
//  icon
// my pj
import formatLastUpdated from '@/utils/formatLastUpdated';
import Wrapper from '@/components/Wrapper';
import TextEditor from '@/components/TextEditor';
import formatTime from '@/utils/formatTime';
import Certificate from './Cetificate/Cetificate';
import { getSingleCourseById } from '@/api/courseApi';
import { useParams } from 'react-router-dom';
const Resource = ({ resource, refetchResource, refetchNote }) => {
    const { id } = useParams();
    const user = useSelector((state) => state.authReducer.user);
    const [isVisibleNote, setIsVisibleNote] = useState(false);
    const [note, setNote] = useState('');
    const [currentTime, setCurrentTime] = useState(0);
    const artPlayer = useRef();
    const theme = useTheme();
    const { data: course, isLoading: isLoadingCourse } = useQuery({
        queryKey: ['singleCourseById'],
        queryFn: () => getSingleCourseById(id || ''),
    });
    const mutationNote = useMutation({
        mutationKey: ['note'],
        mutationFn: createNote,
        onSuccess: () => {
            toast.success('Thêm mới ghi chú thành công');
            setIsVisibleNote(false);
            refetchNote();
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });
    const handleOpenNote = () => {
        setIsVisibleNote(true);
        artPlayer.current.pause();
    };
    const closeNote = () => {
        setIsVisibleNote(false);
        artPlayer.current.play();
    };
    const saveNote = () => {
        const payload = {
            title: resource.title,
            content: note,
            resource_id: resource._id,
            user_id: user._id,
            markAt: currentTime,
        };
        console.log(payload);
        mutationNote.mutate(payload);
    };
    const handleCompletedResource = useCallback(async () => {
        console.log(resource._id);
        try {
            const res = await completeResource(user._id, resource._id);
            if (res && res.status === 200) {
                console.log('Resource completed successfully');
            }
            else {
                console.error('Failed to complete resource');
            }
        }
        catch (error) {
            console.error('Error completing resource:', error);
        }
        finally {
            refetchResource();
        }
    }, [resource._id, user._id]);
    const handleUpdateTime = useCallback((time) => {
        setCurrentTime(time);
    }, [resource._id, user._id]);
    const isXs = useMediaQuery('(max-width:600px)');
    return (_jsxs(_Fragment, { children: [(() => {
                switch (resource.resource_type) {
                    case 'Video':
                        return (_jsx(ArtPlayerComponent, { ref: artPlayer, finished: resource.progress.is_completed, poster: resource?.thumbnail, videoUrl: resource.url, onCompleted: handleCompletedResource, onTimeUpdate: handleUpdateTime }, resource._id));
                    case 'Question':
                        return _jsx(Question, { questions: resource.questions, onCompleted: handleCompletedResource });
                    case 'Document':
                        setTimeout(handleCompletedResource, 3000);
                        return (_jsx(Typography, { mt: 2, fontSize: 20, textAlign: 'center', children: "T\u00E0i li\u1EC7u" }));
                    case 'Certificate':
                        if (!resource.progress.is_completed) {
                            handleCompletedResource();
                        }
                        return (_jsx(Certificate, { user_id: user._id, course_id: id, description: !isLoadingCourse && course.title, name: user.name }));
                }
            })(), _jsxs(Box, { sx: {
                    marginTop: '20px',
                    minHeight: '300px',
                    padding: resource.resource_type === 'Document' && !isXs ? `0 150px` : '0 20px',
                    background: theme.palette.background.paper,
                }, children: [_jsxs(BoxHeaderAndNote, { children: [_jsxs(Box, { children: [_jsx(Typography, { variant: "h2", fontWeight: 500, children: resource.title }), _jsx(Box, { my: 2, children: _jsx(Typography, { variant: "caption", children: formatLastUpdated(resource.updatedAt) }) })] }), resource.resource_type == 'Video' && (_jsx(Box, { children: _jsx(HeadlessTippy, { zIndex: 999, visible: isVisibleNote, placement: "bottom-end", allowHTML: true, interactive: true, render: (attrs) => (_jsxs(Wrapper, { ...attrs, style: { width: '500px' }, children: [_jsx(TextEditor, { initialHeight: "250px", initialValue: "", onChange: setNote }, isVisibleNote ? 'visible' : 'hidden'), _jsxs(Box, { mt: 2, display: 'flex', justifyContent: 'space-between', children: [_jsx(Button, { variant: "outlined", onClick: closeNote, children: "\u0110\u00F3ng" }), _jsx(Button, { variant: "contained", onClick: saveNote, children: "L\u01B0u ghi ch\u00FA" })] })] })), children: _jsxs(Button, { onClick: handleOpenNote, sx: {
                                            color: theme.palette.text.primary,
                                            backgroundColor: theme.palette.background.paper2,
                                            padding: '10px 30px',
                                            borderRadius: '10px',
                                        }, children: ["Th\u00EAm ghi ch\u00FA t\u1EA1i ", formatTime(currentTime)] }) }) }))] }), _jsx(Typography, { mt: 1, dangerouslySetInnerHTML: { __html: resource.description } })] }), _jsx(ToastContainer, {})] }));
};
export default Resource;
