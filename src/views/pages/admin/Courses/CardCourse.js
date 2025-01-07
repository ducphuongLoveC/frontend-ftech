import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, Controller } from 'react-hook-form';
import { Box, useTheme, Grid, Button, TextField } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React, { useState, useRef, useEffect } from 'react';
import TabsCustom from '@/components/TabsCustom';
import Storage from './Storage';
const CardCourse = ({ labels, contents, widthIconImage, onSubmit, defaultValue = {}, isImage = true, }) => {
    const theme = useTheme();
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: defaultValue.title || '',
            thumbnail: defaultValue.thumbnail || null,
        },
    });
    const [datas, setDatas] = useState(defaultValue);
    const contentRefs = useRef(Array(contents.length)
        .fill(null)
        .map(() => React.createRef()));
    const getDatas = () => {
        const contentsData = contentRefs.current.reduce((acc, ref) => {
            if (ref && ref.current && typeof ref.current.getData === 'function') {
                acc = { ...acc, ...ref.current.getData() };
            }
            else {
                console.warn('Content component is missing getData method', ref);
                acc = { ...acc };
            }
            return acc;
        }, {});
        return contentsData;
    };
    const onSubmitForm = (data) => {
        if (onSubmit) {
            console.log({ ...data, ...getDatas() });
            onSubmit({ ...data, ...getDatas() });
        }
    };
    const handleCreateData = () => {
        setDatas(getDatas());
    };
    useEffect(() => {
        contentRefs.current = contents.map((_, index) => contentRefs.current[index] || React.createRef());
    }, [contents]);
    return (_jsxs(Box, { sx: {
            backgroundColor: theme.palette.background.paper,
            p: 4,
        }, children: [_jsxs(Grid, { mb: 4, container: true, alignItems: 'center', justifyContent: 'space-between', p: 2, sx: {
                    boxShadow: 'var(--main-box-shadow)',
                    borderRadius: '4px',
                }, children: [_jsx(Grid, { item: true, lg: 8, children: _jsx(Controller, { name: "title", control: control, render: ({ field }) => (_jsx(TextField, { ...field, variant: "outlined", placeholder: "Nh\u1EADp ti\u00EAu \u0111\u1EC1 n\u1ED9i dung", fullWidth: true, InputProps: {
                                    sx: {
                                        borderBottom: `1px solid ${theme.palette.divider}`,
                                        fontSize: '20px',
                                    },
                                } })) }) }), _jsx(Grid, { item: true, children: _jsx(Storage, { type: "images", onSelectMedia: (url) => setValue('thumbnail', url) }) }), isImage && (_jsx(Grid, { item: true, lg: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: "var(--main-box-shadow)", border: `1px dashed ${theme.palette.divider}`, borderRadius: '10px', children: _jsx(Controller, { name: "thumbnail", control: control, render: ({ field }) => {
                                const uniqueId = `upload-thumbnail-${Math.random()}`; // Tạo id duy nhất
                                return (_jsxs(_Fragment, { children: [_jsx("input", { type: "file", accept: "image/*", onChange: (event) => {
                                                const file = event.target.files?.[0] || null;
                                                field.onChange(file);
                                            }, style: { display: 'none' }, id: uniqueId }), _jsx("label", { htmlFor: uniqueId, children: _jsx(Box, { component: "span", sx: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                }, children: field.value ? (_jsx("img", { src: typeof field.value === 'string' ? field.value : URL.createObjectURL(field.value), alt: "Thumbnail", style: {
                                                        height: 'auto',
                                                        objectFit: 'cover',
                                                    } })) : (_jsx(AddAPhotoIcon, { sx: {
                                                        my: 2,
                                                        fontSize: widthIconImage ? `calc(${widthIconImage} / 2)` : '48px',
                                                        color: theme.palette.text.secondary,
                                                    } })) }) })] }));
                            } }) }))] }), _jsx(TabsCustom, { onChange: handleCreateData, labels: labels, contents: contents.map((Content, index) => (_jsx(Content, { ref: contentRefs.current[index], defaultValue: Object.keys(getDatas()).length > 0 ? getDatas() : datas }, index))) }), _jsx(Button, { variant: "outlined", sx: { mt: 2 }, onClick: handleSubmit(onSubmitForm), children: "L\u01B0u" })] }));
};
export default CardCourse;
