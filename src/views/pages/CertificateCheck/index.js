import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { getCertificateByCertificateId } from '@/api/certificate';
import { Link } from '@mui/material';
import Certificate from '../Learning/Resource/Cetificate/Cetificate';
import { Link as LinkDOM } from 'react-router-dom';
import { useState } from 'react';
const CertificateCheck = () => {
    const { control, handleSubmit, } = useForm();
    const [errorFind, setErrorFind] = useState('');
    const mutationFindCertificate = useMutation({
        mutationFn: getCertificateByCertificateId,
        onSuccess: () => {
            setErrorFind('');
        },
        onError: () => {
            setErrorFind('Không tìm thấy chứng chỉ');
        },
    });
    const user = useSelector((state) => state.authReducer.user);
    const onSubmit = (data) => {
        mutationFindCertificate.mutate(data.code);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Box, { component: 'form', noValidate: true, display: 'flex', justifyContent: 'center', alignItems: 'center', sx: {
                    width: '70%',
                    margin: 'auto',
                    flexDirection: 'column',
                }, onSubmit: handleSubmit(onSubmit), children: [_jsxs(Grid, { mt: 2, container: true, children: [_jsx(Grid, { xs: 12, md: 10, item: true, children: _jsx(Controller, { name: "code", control: control, render: ({ field }) => (_jsx(TextField, { fullWidth: true, ...field, label: "Nh\u1EADp code ch\u1EE9ng ch\u1EC9" })) }) }), _jsx(Grid, { xs: 12, md: 2, item: true, children: _jsx(Button, { fullWidth: true, variant: "contained", sx: { height: '100%' }, type: "submit", children: "T\u00ECm ch\u1EE9ng ch\u1EC9" }) })] }), _jsx(Box, { mt: 2, children: mutationFindCertificate?.data &&
                            (mutationFindCertificate.data.user_id._id === user._id ? (_jsx(Box, { children: _jsx(Typography, { children: "Ch\u1EE9ng ch\u1EC9 c\u1EE7a b\u1EA1n" }) })) : (_jsxs(Box, { children: [_jsx(Typography, { component: 'span', children: "Ch\u1EE9ng ch\u1EC9 c\u1EE7a " }), _jsx(Link, { component: LinkDOM, to: `/profile?id=${mutationFindCertificate?.data?.user_id._id}`, sx: { color: 'primary.main' }, children: mutationFindCertificate?.data?.user_id?.name }), _jsx(Typography, { component: 'span', children: " Kh\u00F3a h\u1ECDc " }), _jsx(Link, { component: LinkDOM, to: `/learning/${mutationFindCertificate?.data?.course_id._id}`, sx: { color: 'primary.main' }, children: mutationFindCertificate?.data?.course_id?.title })] }))) }), errorFind && 'Không tìm thấy chứng chỉ'] }), mutationFindCertificate?.data && (_jsx(Certificate, { code: mutationFindCertificate.data.certificate_code, name: mutationFindCertificate.data.name, description: mutationFindCertificate.data.description }))] }));
};
export default CertificateCheck;
