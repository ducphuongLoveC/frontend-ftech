import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, forwardRef, useImperativeHandle, memo, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Collapse, IconButton, Typography, Button, TextField, Switch, } from '@mui/material';
import Tippy from '@tippyjs/react';
import moment from 'moment';
// Icons
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TuneIcon from '@mui/icons-material/Tune';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PublicIcon from '@mui/icons-material/Public';
import CardCourse from './CardCourse';
import TextEditor from '@/components/TextEditor';
// my pj
import Dialog from '@/components/Dialog';
import documentChoose from './Resource/DocumentChoose';
import OptionOther from './OptionOther';
import DescriptionResource from './Resource/DescriptionResource';
const CourseForm = ({ datas, onSubmit }) => {
    const Description = memo(forwardRef(({ defaultValue }, ref) => {
        const [description, setDescription] = useState(datas ? datas.description : defaultValue?.description || '');
        useEffect(() => {
            if (defaultValue?.description) {
                setDescription(defaultValue.description);
            }
        }, [defaultValue]);
        const handleSetDes = (content) => {
            setDescription(content);
        };
        const getData = () => {
            return { description };
        };
        useImperativeHandle(ref, () => ({
            getData,
        }));
        return (_jsx(TextEditor, { value: description, onChange: handleSetDes }));
    }));
    const TableResource = memo(forwardRef(({ Resources, resourceOpenIndexes, index }, ref) => {
        const [resources, setResources] = useState(Resources || []);
        const [idResourceEdit, setIdResourceEdit] = useState(null);
        const [isOpenModalDocument, setIsOpenModalDocument] = useState(false);
        const [dataEdit, setDataEdit] = useState({});
        // Handle resource actions
        const handleAddResource = (resource) => {
            console.log(resource);
            setResources((prev) => [...prev, { ...resource, isActive: true }]);
            setIsOpenModalDocument(false);
        };
        const handleEditResource = (resource) => {
            console.log(resource);
            if (idResourceEdit !== null) {
                const updatedResources = [...resources];
                updatedResources[idResourceEdit] = resource;
                setResources(updatedResources);
                resetEditState();
                setIsOpenModalDocument(false);
            }
        };
        const handleDeleteResource = (index) => {
            if (confirm('Xác nhận xóa tài liệu')) {
                const updatedResources = resources.filter((_, idx) => idx !== index);
                setResources(updatedResources);
            }
        };
        const handleToggleActiveResource = (index, checked) => {
            const updatedResources = [...resources];
            updatedResources[index].isActive = checked;
            setResources(updatedResources);
        };
        const toggleModalAddDocuments = () => {
            setIsOpenModalDocument((prev) => !prev);
        };
        const resetEditState = () => {
            setIdResourceEdit(null);
            setDataEdit({});
        };
        // Expose getData to parent via ref
        const getData = () => {
            return resources;
        };
        useImperativeHandle(ref, () => ({ getData }));
        return (_jsxs(_Fragment, { children: [_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 7, style: { paddingBottom: 0, paddingTop: 0 }, children: _jsx(Collapse, { in: resourceOpenIndexes.includes(index), timeout: 300, unmountOnExit: true, children: _jsxs(Box, { sx: { margin: 1 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, component: "div", children: "C\u00E1c t\u00E0i li\u1EC7u con" }), _jsxs(Table, { size: "small", "aria-label": "resource", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "T\u00EAn n\u1ED9i dung" }), _jsx(TableCell, { children: "Lo\u1EA1i" }), _jsx(TableCell, { children: "M\u00F4 t\u1EA3" }), _jsx(TableCell, { align: "right", children: "Th\u1EDDi gian" }), _jsx(TableCell, { align: "right", children: "C\u00F4ng khai" }), _jsx(TableCell, { align: "right", colSpan: 2, children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsx(TableBody, { children: resources.map((resource, idx) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: resource.title }), _jsx(TableCell, { children: resource.resource_type }), _jsx(TableCell, { children: _jsx(Typography, { dangerouslySetInnerHTML: { __html: resource.description } }) }), _jsx(TableCell, { align: "right", children: moment.utc(resource.duration * 1000).format('mm:ss') }), _jsx(TableCell, { align: "right", children: _jsx(Switch, { onChange: (e) => handleToggleActiveResource(idx, e.target.checked), checked: resource.isActive }) }), _jsxs(TableCell, { align: "right", children: [_jsx(Tippy, { arrow: true, content: "S\u1EEDa", children: _jsx(Button, { onClick: () => {
                                                                            toggleModalAddDocuments();
                                                                            setDataEdit(resource);
                                                                            setIdResourceEdit(idx);
                                                                        }, children: _jsx(EditIcon, {}) }) }), _jsx(Button, { onClick: () => handleDeleteResource(idx), children: _jsx(DeleteOutlineIcon, { sx: { color: 'red' } }) })] })] }, resource.title))) })] }), _jsx(Button, { onClick: toggleModalAddDocuments, children: "Th\u00EAm t\u00E0i li\u1EC7u" })] }) }) }) }), _jsx(Dialog, { title: `${Object.keys(dataEdit).length ? 'Sửa' : 'Thêm'} tài liệu`, open: isOpenModalDocument, onClose: () => {
                        toggleModalAddDocuments();
                        resetEditState();
                    }, children: _jsx(CardCourse, { defaultValue: dataEdit || {}, onSubmit: (data) => dataEdit && Object.keys(dataEdit).length > 0 ? handleEditResource(data) : handleAddResource(data), widthIconImage: "50px", labels: ['Tài liệu', 'Mô tả'], contents: [documentChoose, DescriptionResource] }) })] }));
    }));
    const TableModule = memo(forwardRef(({ defaultValue }, ref) => {
        const [resourceOpenIndexes, setResourceOpenIndexes] = useState([]);
        const [modules, setModules] = useState(defaultValue?.modules || []);
        const [saveOrUpdateModule, setSaveOrUpdateModule] = useState({});
        // Create a ref array to handle multiple TableResource refs
        const refResources = useRef([]); // Initialize as an array
        const { control, handleSubmit, formState: { errors }, reset, } = useForm({
            defaultValues: { title: '' },
        });
        const getData = () => {
            const resources = refResources.current.map((r) => r?.getData());
            const updatedModules = modules.map((module, index) => ({
                ...module,
                resources: resources[index] || [],
            }));
            console.log(modules);
            return { modules: updatedModules };
        };
        useImperativeHandle(ref, () => ({ getData }));
        // Handle module actions
        const handleAddModule = (title) => {
            setModules((prev) => [...prev, { title, resources: [], isActive: true }]);
        };
        const handleEditTitleModule = (index, title) => {
            const updatedModules = [...modules];
            updatedModules[index].title = title;
            setModules(updatedModules);
        };
        const handleToggleActiveModule = (index, checked) => {
            const updatedModules = [...modules];
            updatedModules[index].isActive = checked;
            setModules(updatedModules);
        };
        const handleDeleteModules = (index) => {
            if (confirm('Bạn có muốn xóa chương này không?')) {
                const updatedModules = modules.filter((_, idx) => idx !== index);
                setModules(updatedModules);
            }
        };
        const handleTogglerResouceOpenIndex = (index) => {
            const updatedIndexes = resourceOpenIndexes.includes(index)
                ? resourceOpenIndexes.filter((idx) => idx !== index)
                : [...resourceOpenIndexes, index];
            setResourceOpenIndexes(updatedIndexes);
        };
        const handleQuickAddCertificate = () => {
            const resources = [
                {
                    title: 'Cấp chứng chỉ',
                    resource_type: 'Certificate',
                    duration: 0,
                    description: '<header class="wrapper"> <p><strong>Nhận chứng chỉ kh&oacute;a học</strong></p> </header> <div class="_wrapper_fl251_1"> <p><strong>Xin ch&uacute;c mừng 🎉</strong></p> <p>Ch&uacute;c mừng bạn đ&atilde; ho&agrave;n th&agrave;nh kh&oacute;a học! Bạn đ&atilde; l&agrave;m được một điều thật tuyệt vời!</p> </div>',
                    isActive: true,
                },
            ];
            setModules((prev) => [...prev, { title: 'Hoàn thành khóa học', resources: resources, isActive: true }]);
        };
        const onSubmit = (data) => {
            if (saveOrUpdateModule.type === 'update') {
                handleEditTitleModule(saveOrUpdateModule.index, data.title);
            }
            if (saveOrUpdateModule.type === 'add') {
                handleAddModule(data.title);
            }
            setSaveOrUpdateModule({});
            reset({ title: '' });
        };
        return (_jsxs(TableContainer, { component: Paper, sx: { mt: 2 }, children: [_jsxs(Table, { sx: { minWidth: 650 }, "aria-label": "collapsible table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, {}), _jsxs(TableCell, { children: ["Ti\u00EAu \u0111\u1EC1 ", _jsx(ListAltIcon, {})] }), _jsxs(TableCell, { align: "right", children: ["B\u00E0i h\u1ECDc con ", _jsx(_Fragment, {})] }), _jsxs(TableCell, { align: "right", children: ["T\u1ED5ng th\u1EDDi gian ", _jsx(AccessTimeIcon, {}), ' '] }), _jsxs(TableCell, { align: "right", children: ["C\u00F4ng khai ", _jsx(PublicIcon, {})] }), _jsxs(TableCell, { align: "right", colSpan: 2, children: ["H\u00E0nh \u0111\u1ED9ng ", _jsx(TuneIcon, {})] })] }) }), _jsx(TableBody, { children: modules.map((module, index) => (_jsxs(_Fragment, { children: [_jsxs(TableRow, { sx: { boxShadow: 'var(--main-box-shadow)' }, children: [_jsx(TableCell, { children: _jsx(IconButton, { size: "small", onClick: () => handleTogglerResouceOpenIndex(index), children: resourceOpenIndexes.includes(index) ? _jsx(KeyboardArrowUpIcon, {}) : _jsx(KeyboardArrowDownIcon, {}) }) }), _jsx(TableCell, { children: module.title }), _jsx(TableCell, { align: "right", children: module.resources.length }), _jsx(TableCell, { align: "right", children: moment
                                                    .utc(module.resources.reduce((acc, resource) => acc + resource.duration, 0) * 1000)
                                                    .format('mm:ss') }), _jsx(TableCell, { align: "right", children: _jsx(Switch, { checked: module.isActive, onChange: (e) => handleToggleActiveModule(index, e.target.checked) }) }), _jsxs(TableCell, { align: "right", children: [_jsx(Tippy, { content: "S\u1EEDa ti\u00EAu \u0111\u1EC1", children: _jsx(Button, { onClick: () => {
                                                                setSaveOrUpdateModule({ index, type: 'update' });
                                                                reset({ title: module.title });
                                                            }, children: _jsx(EditIcon, {}) }) }), _jsx(Button, { onClick: () => handleDeleteModules(index), children: _jsx(DeleteOutlineIcon, { sx: { color: 'red' } }) })] })] }), _jsx(TableResource, { Resources: module.resources, index: index, resourceOpenIndexes: resourceOpenIndexes, ref: (el) => (refResources.current[index] = el) })] }))) })] }), _jsx(Dialog, { open: Object.keys(saveOrUpdateModule).length > 0, onClose: () => {
                        setSaveOrUpdateModule({});
                        reset({ title: '' });
                    }, title: saveOrUpdateModule?.type === 'update' ? 'Sửa chương' : 'Thêm chương', children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(Controller, { name: "title", control: control, rules: { required: 'Nhập tên chương' }, render: ({ field }) => (_jsx(TextField, { ...field, placeholder: "Nh\u1EADp t\u00EAn ch\u01B0\u01A1ng", fullWidth: true, error: !!errors.title, helperText: errors.title ? errors.title.message : '' })) }), _jsx(Button, { type: "submit", variant: "outlined", sx: { mt: 2 }, children: saveOrUpdateModule?.type === 'update' ? 'Sửa chương' : 'Thêm chương' })] }) }), _jsx(Button, { onClick: () => setSaveOrUpdateModule({ type: 'add' }), children: "Th\u00EAm ch\u01B0\u01A1ng" }), _jsx(Button, { onClick: handleQuickAddCertificate, children: "Th\u00EAm nhanh ch\u1EE9ng ch\u1EC9" })] }));
    }));
    return (_jsx(Box, { children: _jsx(CardCourse, { defaultValue: datas ? datas : {}, onSubmit: onSubmit, labels: ['Chương học', 'Mô tả', 'Cài đặt'], contents: [TableModule, Description, OptionOther] }) }));
};
export default CourseForm;
