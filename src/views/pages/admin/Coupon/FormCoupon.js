import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Autocomplete, Box, Button, Grid, MenuItem, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
const FormCoupon = ({ textBtn, values, courses, onSubmit, onClose }) => {
    const { control, handleSubmit, setValue, formState: { errors }, } = useForm({
        defaultValues: {
            code: values?.code || '',
            discount_type: values?.discount_type || '',
            discount_value: values?.discount_value || 0,
            start_date: values?.start_date
                ? new Date(new Date(values.start_date).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16)
                : new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),
            end_date: values?.end_date
                ? new Date(new Date(values.end_date).getTime() + 7 * 60 * 60 * 1000)
                    .toISOString()
                    .slice(0, 16)
                : '',
            max_uses: values?.max_uses || 1,
            course_ids: values?.courses?.length ? values.courses.map((c) => c._id) : [],
        },
    });
    const generateRandomCode = () => {
        const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        setValue('code', randomCode);
    };
    return (_jsxs(Box, { component: "form", noValidate: true, sx: { mt: 2 }, onSubmit: handleSubmit(onSubmit), children: [_jsxs(Grid, { container: true, spacing: 2, children: [_jsxs(Grid, { item: true, xs: 12, sx: { display: 'flex', alignItems: 'center' }, children: [_jsx(Controller, { name: "code", control: control, rules: { required: 'Vui lòng nhập mã giảm giá' }, render: ({ field }) => (_jsx(TextField, { ...field, fullWidth: true, label: "M\u00E3 gi\u1EA3m gi\u00E1", error: !!errors.code, helperText: errors.code?.message, sx: { flex: 1, mr: 1 } })) }), _jsx(Button, { sx: { p: 1.5 }, variant: "outlined", onClick: generateRandomCode, children: "T\u1EA1o ng\u1EABu nhi\u00EAn" })] }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Controller, { name: "course_ids", control: control, rules: { required: 'Vui lòng chọn ít nhất 1 khóa học' }, render: ({ field }) => (_jsx(Autocomplete, { ...field, multiple: true, id: "course-select", options: courses, getOptionLabel: (option) => option.title, value: courses.filter((course) => field.value.includes(course._id)), onChange: (_, value) => {
                                    setValue('course_ids', value.map((course) => course._id));
                                }, renderInput: (params) => (_jsx(TextField, { ...params, label: "\u00C1p d\u1EE5ng cho kh\u00F3a h\u1ECDc:", error: !!errors.course_ids, helperText: errors.course_ids?.message })) })) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Controller, { name: "discount_type", control: control, rules: { required: 'Vui lòng chọn loại giảm giá' }, render: ({ field }) => (_jsx(TextField, { ...field, select: true, fullWidth: true, label: "Lo\u1EA1i gi\u1EA3m gi\u00E1", error: !!errors.discount_type, helperText: errors.discount_type?.message, children: _jsx(MenuItem, { value: "percentage", children: "Ph\u1EA7n tr\u0103m" }) })) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Controller, { name: "discount_value", control: control, rules: { required: 'Vui lòng nhập giá trị giảm giá', min: 1 }, render: ({ field }) => (_jsx(TextField, { ...field, fullWidth: true, type: "number", label: "Gi\u00E1 tr\u1ECB gi\u1EA3m gi\u00E1", error: !!errors.discount_value, helperText: errors.discount_value?.message })) }) }), _jsx(Grid, { item: true, xs: 6, children: _jsx(Controller, { name: "start_date", control: control, rules: { required: 'Vui lòng chọn ngày bắt đầu' }, render: ({ field }) => (_jsx(TextField, { ...field, fullWidth: true, type: "datetime-local" // Đổi thành datetime-local
                                , label: "Ng\u00E0y b\u1EAFt \u0111\u1EA7u", InputLabelProps: { shrink: true }, error: !!errors.start_date, helperText: errors.start_date?.message })) }) }), _jsx(Grid, { item: true, xs: 6, children: _jsx(Controller, { name: "end_date", control: control, rules: {
                                required: 'Vui lòng chọn ngày kết thúc',
                                validate: (value) => value >= (control._formValues.start_date || '') || 'Ngày kết thúc phải sau ngày bắt đầu',
                            }, render: ({ field }) => (_jsx(TextField, { ...field, fullWidth: true, type: "datetime-local" // Đổi thành datetime-local
                                , label: "Ng\u00E0y k\u1EBFt th\u00FAc", InputLabelProps: { shrink: true }, error: !!errors.end_date, helperText: errors.end_date?.message })) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(Controller, { name: "max_uses", control: control, rules: {
                                required: 'Vui lòng nhập số lần sử dụng tối đa',
                                min: { value: 1, message: 'Số lần sử dụng tối thiểu là 1' },
                            }, render: ({ field }) => (_jsx(TextField, { ...field, fullWidth: true, type: "number", label: "S\u1ED1 l\u01B0\u1EE3ng", error: !!errors.max_uses, helperText: errors.max_uses?.message })) }) })] }), _jsxs(Box, { sx: { mt: 3, display: 'flex', justifyContent: 'flex-end' }, children: [_jsx(Button, { onClick: onClose, sx: { mr: 2 }, children: "H\u1EE7y" }), _jsx(Button, { variant: "contained", type: "submit", children: textBtn })] })] }));
};
export default FormCoupon;
