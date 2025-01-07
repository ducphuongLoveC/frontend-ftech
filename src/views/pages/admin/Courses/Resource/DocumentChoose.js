import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { Box, Typography, Grid, Paper, FormControl, Select, MenuItem } from '@mui/material';
import VideoUpload from './VideoUpload';
import QuizCreation from './Questions';
import QuizIcon from '@mui/icons-material/Quiz';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
// import CodeIcon from '@mui/icons-material/Code';
// import CreateCodePractice from './CreateCodePractice';
const contentTypes = [
    { name: 'Upload video', resource_type: 'Video', Component: VideoUpload, icon: PlayCircleIcon },
    { name: 'Upload question', resource_type: 'Question', Component: QuizCreation, icon: QuizIcon },
    {
        name: 'Upload tài liệu',
        resource_type: 'Document',
        Component: forwardRef(({ defaultValue }, ref) => {
            const getData = () => ({ _id: defaultValue._id, resource_type: 'Document', duration: 0 });
            useImperativeHandle(ref, () => ({
                getData,
            }));
            return _jsx(Typography, { children: "B\u1EADt sang tab m\u00F4 t\u1EA3 \u0111\u1EC3 vi\u1EBFt t\u00E0i li\u1EC7u" });
        }),
        icon: DescriptionIcon,
    },
    {
        name: 'Upload chứng chỉ',
        resource_type: 'Certificate',
        Component: forwardRef(({ defaultValue }, ref) => {
            const getData = () => ({ _id: defaultValue._id, resource_type: 'Certificate', duration: 0 });
            useImperativeHandle(ref, () => ({
                getData,
            }));
            return _jsx(Typography, { children: "Ch\u1EE9ng ch\u1EC9 s\u1EBD \u0111\u01B0\u1EE3c t\u1EA1o t\u1EF1 \u0111\u1ED9ng b\u00EAn ng\u01B0\u1EDDi d\u00F9ng" });
        }),
        icon: CardMembershipIcon,
    },
];
const ChooseDocument = forwardRef(({ defaultValue }, ref) => {
    const [selectedContent, setSelectedContent] = useState(null);
    const documentRef = useRef(null);
    useImperativeHandle(ref, () => ({
        getData: () => {
            return { ...documentRef.current.getData(), isActive: defaultValue?.isActive };
        },
    }));
    useEffect(() => {
        if (defaultValue?.resource_type) {
            const content = contentTypes.find((c) => c.resource_type === defaultValue.resource_type);
            setSelectedContent(content);
        }
        else {
            setSelectedContent(contentTypes[0]);
        }
    }, [defaultValue]);
    const handleContentChange = (event) => {
        const content = contentTypes.find((c) => c.resource_type === event.target.value);
        setSelectedContent(content);
    };
    return (_jsx(Box, { sx: { flexGrow: 1 }, children: _jsx(Grid, { container: true, spacing: 3, children: _jsxs(Grid, { item: true, xs: 12, children: [_jsxs(Paper, { elevation: 3, sx: { p: 2, mb: 3 }, children: [_jsx(Typography, { variant: "h5", mb: 2, children: "Ch\u1ECDn lo\u1EA1i n\u1ED9i dung" }), _jsx(FormControl, { fullWidth: true, children: _jsx(Select, { value: selectedContent?.resource_type || '', onChange: handleContentChange, children: contentTypes.map((item) => (_jsxs(MenuItem, { value: item.resource_type, children: [_jsx(item.icon, { sx: { mr: 1 } }), item.name] }, item.name))) }) })] }), selectedContent && _jsx(selectedContent.Component, { ref: documentRef, defaultValue: defaultValue })] }) }) }));
});
export default ChooseDocument;
