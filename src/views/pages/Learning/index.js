import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, styled, useMediaQuery, Button, Hidden } from '@mui/material';
import { useTheme } from '@mui/material';
// context
import { SeekContext } from '@/context/SeekContext';
import { NoteContext } from '@/context/NoteContext';
//icon mui
import MessageIcon from '@mui/icons-material/Message';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PerfectScrollbar from 'react-perfect-scrollbar';
// my pj
import BackgroundOverlay from '../../../components/BackgroundOverlay';
import PlacementToggle from '@/components/PlacementToggle';
import { findModuleByCourseId } from '@/api/moduleApi';
import useQueryParams from '@/hooks/useQueryParams';
import { getAdjacentResourceId, getResource } from '@/api/Resource';
import { ModulesSkeleton, ResourceSkeleton } from '@/ui-component/cards/Skeleton/LearningSkeleton';
import { deleteNote, getNotes, updateNote } from '@/api/noteApi';
// thành phần con
import Comment from './Comment';
import Resource from './Resource';
import TrackList from './TrackList';
import Header from './Header/Header';
import { SET_EXPANDED_INDEXS } from '@/store/actions';
const LessonNavigation = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: theme.palette.background.paper2,
    height: '50px',
    zIndex: 888,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px',
}));
const ButtonStyle = styled(Button)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary,
    padding: '4px 30px',
    borderRadius: '20px',
    background: theme.palette.background.paper,
    marginRight: '10px',
    [theme.breakpoints.down('sm')]: {
        padding: '5px 8px',
    },
}));
const Learning = () => {
    const dispatch = useDispatch();
    const storedExpandedIndexs = useSelector((state) => state.homeReducer.expandedIndexs);
    const user = useSelector((state) => state.authReducer.user);
    const [seek, setSeek] = useState(0);
    const [queryNote, setQueryNote] = useState([
        {
            key: 'type',
            value: 'in_chapter',
        },
        {
            key: 'sort',
            value: 'ASC',
        },
    ]);
    const { id } = useParams();
    const query = useQueryParams();
    const idResource = query.get('id') || '';
    const [openTrackList, setOpenTrackList] = useState(true);
    const queryClient = useQueryClient();
    const moduleQuery = useQuery({
        queryKey: ['module', id],
        queryFn: () => findModuleByCourseId(id || '', user._id),
    });
    const resourceQuery = useQuery({
        queryKey: ['resource', idResource],
        queryFn: () => getResource(id || '', user._id, idResource ? idResource : ''),
    });
    const { data: notes, 
    // isLoading: isLoadingNote,
    refetch: refetchNote, } = useQuery({
        queryKey: ['note', idResource, queryNote],
        queryFn: () => getNotes(idResource, user._id, queryNote),
    });
    const mutateDelete = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            refetchNote();
        },
    });
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));
    const handleOpenModuleByCurrentModuleId = (module_id) => {
        const findIndexModule = moduleQuery.data?.findIndex((module) => module._id === module_id);
        console.log('Find Index Module:', findIndexModule);
        console.log('Stored Expanded Indexs:', storedExpandedIndexs);
        if (findIndexModule !== undefined && !storedExpandedIndexs.includes(findIndexModule)) {
            dispatch({
                type: SET_EXPANDED_INDEXS,
                payload: [...storedExpandedIndexs, findIndexModule],
            });
        }
    };
    const toggleLearningList = () => {
        setOpenTrackList((prev) => !prev);
    };
    const handleAdjacentResourceId = async (direction) => {
        try {
            const res = await getAdjacentResourceId(idResource, direction, user._id);
            if (res?.progress?.is_unlocked) {
                query.set('id', res._id);
                handleOpenModuleByCurrentModuleId(res.module_id);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    // seek
    const handleSeek = (seek, currentIdResource) => {
        setSeek(seek);
        if (currentIdResource !== idResource) {
            query.set('id', currentIdResource);
        }
    };
    // filter Note
    const handleNoteFilter = (value) => {
        setQueryNote((pre) => [...pre, { key: 'type', value: value }]);
    };
    const hanldeNoteDate = (value) => {
        setQueryNote((pre) => [...pre, { key: 'sort', value: value }]);
    };
    // note action
    const handleUpdateNote = async (id, newContent) => {
        await updateNote(id, newContent);
        refetchNote();
    };
    const handleDeleteNote = async (id) => {
        mutateDelete.mutate(id);
    };
    useEffect(() => {
        return () => {
            const keysToRemove = ['resource', 'module', 'note'];
            keysToRemove.forEach((key) => {
                queryClient.removeQueries({ queryKey: [key] });
            });
        };
    }, [queryClient]);
    useEffect(() => {
        setSeek(undefined);
    }, [idResource]);
    // mở ra module mà resource đang nằm trong nó
    useEffect(() => {
        if (resourceQuery?.data && moduleQuery?.data) {
            handleOpenModuleByCurrentModuleId(resourceQuery.data.module_id);
        }
    }, [resourceQuery?.data, moduleQuery?.data]);
    if (moduleQuery.isError || resourceQuery.isError)
        return _jsx("div", { children: "Error" });
    if (!resourceQuery.isLoading && !idResource) {
        query.set('id', resourceQuery.data._id);
    }
    return (_jsx(NoteContext.Provider, { value: {
            onNoteFilter: handleNoteFilter,
            onNoteDate: hanldeNoteDate,
            onNoteSave: handleUpdateNote,
            onNoteDelete: handleDeleteNote,
        }, children: _jsx(SeekContext.Provider, { value: { value: seek, onSeek: handleSeek }, children: _jsxs(Box, { position: 'relative', children: [!moduleQuery.isLoading && _jsx(Header, { notes: notes || [], data: moduleQuery.data }), _jsxs(Box, { sx: {
                            display: 'flex',
                        }, children: [_jsx(PerfectScrollbar, { style: {
                                    width: '100%',
                                    height: '87vh',
                                    overflow: 'auto',
                                    background: theme.palette.background.paper,
                                }, children: resourceQuery.isLoading ? (_jsx(ResourceSkeleton, {})) : (_jsx(Resource, { resource: resourceQuery.data, refetchResource: moduleQuery.refetch, refetchNote: refetchNote })) }), moduleQuery.isLoading ? (_jsx(ModulesSkeleton, {})) : (_jsx(TrackList, { modules: moduleQuery.data, open: openTrackList, onClose: toggleLearningList }))] }), _jsxs(LessonNavigation, { children: [_jsx(PlacementToggle, { defaultOpen: query.get('comment') ? true : false, placement: "left", Connect: (connect) => (_jsxs(Button, { onClick: connect, sx: { color: theme.palette.text.primary, height: '50px' }, children: [_jsx(MessageIcon, {}), _jsx(Hidden, { smDown: true, children: _jsx(Typography, { ml: 1, variant: "h4", children: "B\u00ECnh lu\u1EADn" }) })] })), children: _jsx(Comment, {}) }), _jsxs(Box, { display: 'flex', alignItems: 'center', children: [_jsx(Box, { children: _jsxs(ButtonStyle, { sx: {
                                                px: {
                                                    xs: '50px',
                                                },
                                            }, onClick: () => handleAdjacentResourceId('previous'), children: [_jsx(ArrowBackIosNewIcon, { sx: { fontSize: '20px' } }), _jsx(Typography, { mr: 1, variant: "h4", sx: {
                                                        display: {
                                                            xs: 'none',
                                                            sm: 'inline',
                                                        },
                                                    }, children: "B\u00C0I TR\u01AF\u1EDAC" })] }) }), _jsx(Box, { children: _jsxs(ButtonStyle, { sx: {
                                                background: 'var(--color-primary)',
                                                px: {
                                                    xs: '50px',
                                                },
                                            }, onClick: () => handleAdjacentResourceId('next'), children: [_jsx(Typography, { mr: 1, variant: "h4", color: "white", sx: {
                                                        display: {
                                                            xs: 'none',
                                                            sm: 'inline',
                                                        },
                                                    }, children: "B\u00C0I TI\u1EBEP THEO" }), _jsx(ArrowForwardIosIcon, { sx: { fontSize: '20px', color: 'white' } })] }) })] }), _jsxs(Button, { sx: { color: theme.palette.text.primary, height: '50px' }, onClick: toggleLearningList, children: [_jsx(Hidden, { mdDown: true, children: _jsx(Typography, { mr: 1, variant: "h4", sx: {
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                maxWidth: '25ch',
                                            }, children: !resourceQuery.isLoading && resourceQuery.data.module.title }) }), openTrackList ? (_jsx(ArrowForwardIcon, { sx: { fontSize: '25px' } })) : (_jsx(MenuOpenIcon, { sx: { fontSize: '25px' } }))] })] }), _jsx(BackgroundOverlay, { onClick: toggleLearningList, open: downMD && openTrackList })] }) }) }));
};
export default Learning;
