import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Box, TextField, Select, MenuItem, FormControl, Typography, Paper, Chip, Grid, Tooltip, IconButton, FormLabel, RadioGroup, FormControlLabel, Radio, useTheme, Autocomplete, } from '@mui/material';
import { useSelector } from 'react-redux';
import { TrendingUp, Add } from '@mui/icons-material';
// icon
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
// api
import { fetchLearningPaths } from '@/api/learningPathApi';
const OptionOther = forwardRef(({ defaultValue }, ref) => {
    const user = useSelector((state) => state.authReducer.user);
    const { control, handleSubmit, formState: { errors }, setValue, getValues, watch, } = useForm({
        defaultValues: {
            learning_path_ids: defaultValue?.learning_path_ids || [],
            user_id: user._id,
            original_price: parseInt(defaultValue?.original_price || '0'),
            sale_price: parseInt(defaultValue?.sale_price || '0'),
            learning_outcomes: defaultValue?.learning_outcomes || [],
            level: defaultValue?.level || 'easy',
            has_certificate: defaultValue?.has_certificate !== undefined ? defaultValue.has_certificate : false,
            isFree: defaultValue?.isFree !== undefined ? defaultValue.isFree : true,
            isActive: defaultValue?.isActive !== undefined ? defaultValue.isActive : false,
        },
    });
    const getData = () => ({ ...getValues() });
    useImperativeHandle(ref, () => ({
        getData,
    }));
    const isFree = watch('isFree');
    const theme = useTheme();
    const [newOutcome, setNewOutcome] = useState('');
    const { data, isLoading, isError } = useQuery({
        queryKey: ['learning_path'],
        queryFn: fetchLearningPaths,
    });
    const handleAddOutcome = () => {
        if (newOutcome.trim() !== '') {
            setValue('learning_outcomes', [...watch('learning_outcomes'), ...newOutcome.split('\n')]);
            setNewOutcome('');
        }
    };
    const handleRemoveOutcome = (index) => {
        const outcomes = watch('learning_outcomes');
        setValue('learning_outcomes', outcomes.filter((_, i) => i !== index));
    };
    const getDifficultyColor = (level) => {
        switch (level) {
            case 'easy':
                return '#4caf50';
            case 'medium':
                return '#ff9800';
            case 'high':
                return '#f44336';
            default:
                return '#2196f3';
        }
    };
    const onSubmit = (data) => {
        console.log(data);
        alert('Dữ liệu đã được in ra console');
    };
    const options = useMemo(() => {
        return data?.map(({ title, _id }) => ({ label: title, value: _id }));
    }, [data]);
    if (isLoading)
        return _jsx("div", { children: "Loading..." });
    if (isError)
        return _jsx("div", { children: "error" });
    return (_jsx(Paper, { sx: { mt: 2 }, children: _jsx("form", { onSubmit: handleSubmit(onSubmit), children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, children: _jsxs(FormControl, { children: [_jsx(FormLabel, { id: "radio-group-label", children: "Ch\u1ECDn lo\u1EA1i kh\u00F3a h\u1ECDc" }), _jsx(Controller, { name: "isFree", control: control, render: ({ field }) => (_jsxs(RadioGroup, { ...field, row: true, onChange: (e) => setValue('isFree', e.target.value === 'true'), children: [_jsx(FormControlLabel, { value: true, control: _jsx(Radio, {}), label: "Kh\u00F3a h\u1ECDc mi\u1EC5n ph\u00ED" }), _jsx(FormControlLabel, { value: false, control: _jsx(Radio, {}), label: "Kh\u00F3a h\u1ECDc t\u00EDnh ph\u00ED" })] })) })] }) }), !isFree && (_jsxs(_Fragment, { children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Controller, { name: "original_price", control: control, render: ({ field }) => _jsx(TextField, { fullWidth: true, label: "Gi\u00E1 b\u00ECnh th\u01B0\u1EDDng", type: "number", ...field }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Controller, { name: "sale_price", control: control, render: ({ field }) => (_jsx(TextField, { fullWidth: true, label: "Gi\u00E1 sale", type: "number", error: !!errors.sale_price, helperText: +watch('sale_price') > +watch('original_price')
                                            ? 'Giá sale không thể cao hơn giá bình thường'
                                            : '', ...field })) }) })] })), _jsx(Grid, { item: true, xs: 12, children: _jsxs(FormControl, { children: [_jsx(FormLabel, { id: "radio-group-label", children: "Ch\u1EE9ng ch\u1EC9" }), _jsx(Controller, { name: "has_certificate", control: control, render: ({ field }) => (_jsxs(RadioGroup, { ...field, onChange: (e) => setValue('has_certificate', e.target.value === 'true'), children: [_jsx(FormControlLabel, { value: true, control: _jsx(Radio, {}), label: "Kh\u00F3a h\u1ECDc n\u00E0y cung c\u1EA5p ch\u1EE9ng ch\u1EC9" }), _jsx(FormControlLabel, { value: false, control: _jsx(Radio, {}), label: "Kh\u00F3a h\u1ECDc n\u00E0y kh\u00F4ng cung c\u1EA5p ch\u1EE9ng ch\u1EC9" })] })) })] }) }), _jsx(Grid, { item: true, xs: 12, ml: 2, mt: 2, sx: { backgroundColor: theme.palette.background.paper2 }, children: _jsxs(FormControl, { children: [_jsx(FormLabel, { id: "radio-group-label", children: "C\u00E0i \u0111\u1EB7t c\u00F4ng khai" }), _jsx(Controller, { name: "isActive", control: control, render: ({ field }) => (_jsxs(RadioGroup, { ...field, onChange: (e) => setValue('isActive', e.target.value === 'true'), children: [_jsx(FormControlLabel, { value: true, control: _jsx(Radio, {}), label: _jsxs(_Fragment, { children: [_jsx(PublicIcon, { sx: { mr: 1 } }), "C\u00F4ng khai kh\u00F3a h\u1ECDc"] }) }), _jsx(FormControlLabel, { value: false, control: _jsx(Radio, {}), label: _jsxs(_Fragment, { children: [_jsx(LockIcon, { sx: { mr: 1 } }), " Ri\u00EAng t\u01B0 kh\u00F3a h\u1ECDc"] }) })] })) })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(FormLabel, { id: "radio-group-label", children: "Ch\u1ECDn c\u00E1c danh m\u1EE5c" }), _jsx(Controller, { name: "learning_path_ids", control: control, defaultValue: [], render: ({ field }) => (_jsx(Autocomplete, { ...field, multiple // Kích hoạt chế độ chọn nhiều
                                        : true, options: options, getOptionLabel: (option) => option.label, isOptionEqualToValue: (option, value) => option.value === value.value, onChange: (_, value) => field.onChange(value.map((item) => item.value)), value: 
                                        // Kiểm tra và thiết lập giá trị
                                        field.value?.map((id) => ({
                                            label: options.find((opt) => opt.value === id)?.label || '',
                                            value: id,
                                        })) || [] // Nếu không có giá trị, trả về mảng rỗng
                                        , renderInput: (params) => _jsx(TextField, { ...params, placeholder: "Ch\u1ECDn danh m\u1EE5c" }) })) })] }) }), _jsx(Grid, { item: true, xs: 12, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(FormLabel, { id: "difficulty-level-label", children: "Ch\u1ECDn c\u1EA5p \u0111\u1ED9" }), _jsx(Controller, { name: "level", control: control, render: ({ field }) => (_jsxs(Select, { labelId: "difficulty-level-label", value: field.value, onChange: field.onChange, startAdornment: _jsx(TrendingUp, { sx: {
                                                mr: 1,
                                                color: getDifficultyColor(field.value),
                                            } }), children: [_jsx(MenuItem, { value: "easy", children: "D\u1EC5" }), _jsx(MenuItem, { value: "medium", children: "Trung b\u00ECnh" }), _jsx(MenuItem, { value: "high", children: "N\u00E2ng cao" })] })) })] }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsx(Typography, { gutterBottom: true, sx: { display: 'flex', alignItems: 'center' }, children: "K\u1EBFt qu\u1EA3 h\u1ECDc t\u1EADp" }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'flex-start', mb: 2 }, children: [_jsx(TextField, { multiline: true, fullWidth: true, label: "Th\u00EAm k\u1EBFt qu\u1EA3 h\u1ECDc t\u1EADp", value: newOutcome, onChange: (e) => setNewOutcome(e.target.value), sx: { mr: 1 } }), _jsx(Tooltip, { title: "Th\u00EAm k\u1EBFt qu\u1EA3 h\u1ECDc t\u1EADp", children: _jsx(IconButton, { onClick: handleAddOutcome, color: "primary", sx: { mt: 1 }, children: _jsx(Add, {}) }) })] }), _jsx(Paper, { elevation: 1, sx: {
                                    p: 2,
                                    bgcolor: 'background.default',
                                    minHeight: '150px',
                                    maxHeight: '300px',
                                    overflowY: 'auto',
                                }, children: watch('learning_outcomes').length === 0 ? (_jsx(Typography, { color: "text.secondary", textAlign: "center", children: "Ch\u01B0a c\u00F3 k\u1EBFt qu\u1EA3 h\u1ECDc t\u1EADp n\u00E0o \u0111\u01B0\u1EE3c th\u00EAm" })) : (watch('learning_outcomes').map((outcome, index) => (_jsx(Chip, { label: outcome, onDelete: () => handleRemoveOutcome(index), color: "primary", variant: "outlined", sx: { m: 0.5, maxWidth: '100%' } }, index)))) })] })] }) }) }));
});
export default OptionOther;
