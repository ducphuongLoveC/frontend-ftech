import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Paper, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import html2pdf from 'html2pdf.js';
import { createCertificate, getCertificateByCertificateId } from '@/api/certificate';
import moment from 'moment';
const Certificate = ({ certificate_code, user_id, course_id, name, description, code }) => {
    const certificateRef = useRef(null);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [id, setId] = useState();
    const { data, isLoading } = useQuery({
        queryKey: ['certificate', id],
        queryFn: () => getCertificateByCertificateId(id || ''),
        enabled: id ? true : false,
    });
    useEffect(() => {
        const fetchImage = async () => {
            const url = 'https://res.cloudinary.com/dbd4kxjwi/image/upload/v1734324929/cert_uqffm9.jpg';
            try {
                const response = await fetch(url, { mode: 'cors' });
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                setBackgroundImage(blobUrl);
            }
            catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        fetchImage();
    }, []);
    useEffect(() => {
        const fetchCertificate = async () => {
            if (certificate_code) {
                setId(certificate_code);
            }
            else if (user_id && course_id && name && description) {
                const { certificate_code: existingCertificateCode } = await getCertificateByCertificateId(certificate_code || '');
                if (existingCertificateCode) {
                    setId(existingCertificateCode);
                }
                else {
                    const payload = {
                        user_id,
                        course_id,
                        name,
                        description,
                    };
                    const data = await createCertificate(payload);
                    setId(data.certificate_code);
                }
            }
        };
        fetchCertificate();
    }, [user_id, course_id, name, description, certificate_code]);
    const downloadPDF = () => {
        if (certificateRef.current) {
            const element = certificateRef.current;
            const options = {
                filename: 'Certificate.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 4 },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'landscape',
                },
            };
            html2pdf().from(element).set(options).save();
        }
    };
    if (isLoading)
        return _jsx("div", { children: "Loading..." });
    return (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }, children: [_jsx(Box, { display: 'none', children: _jsx(Paper, { ref: certificateRef, elevation: 0, sx: {
                        width: '100%',
                        height: '107.5vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                    }, children: _jsxs(Box, { mt: 22, textAlign: 'center', children: [_jsx(Box, { position: 'absolute', bottom: 20, right: 15, children: _jsxs(Typography, { variant: "body2", fontSize: 20, color: "textSecondary", sx: { marginTop: 1 }, children: ["code: ", data?.certificate_code || code] }) }), _jsx(Typography, { variant: "h5", fontSize: 20, color: "primary", marginBottom: 2.5, gutterBottom: true, children: "FTECH Academy" }), _jsx(Typography, { variant: "h3", fontWeight: "bold", fontSize: 30, color: "primary", gutterBottom: true, children: "Certificate of Completion" }), _jsx(Typography, { variant: "h6", fontSize: 20, color: "textSecondary", gutterBottom: true, children: "This certifies that" }), _jsx(Typography, { variant: "h4", fontSize: 30, fontWeight: "bold", gutterBottom: true, children: data?.name || name }), _jsx(Typography, { variant: "h6", fontSize: 20, color: "textSecondary", gutterBottom: true, children: "has successfully completed the course" }), _jsx(Typography, { variant: "h5", fontSize: 30, fontWeight: "bold", gutterBottom: true, children: data?.description || description }), _jsx(Typography, { variant: "body1", fontSize: 20, color: "textSecondary", sx: { marginTop: 1.5 }, children: "Special Recognition: Outstanding Performance" }), _jsxs(Typography, { variant: "body2", fontSize: 20, color: "textSecondary", sx: { marginTop: 1 }, children: ["Completion Date: ", data?.issue_date] })] }) }) }), _jsxs(Box, { sx: {
                    backgroundColor: 'white',
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '900px',
                }, children: [_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, children: _jsx(Box, { sx: {
                                width: '80%',
                                height: 'auto',
                                margin: '0 auto',
                                backgroundImage: `url(${backgroundImage})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                minHeight: '500px',
                                display: 'flex',
                                justifyContent: 'center',
                            }, position: 'relative', children: _jsxs(Box, { mt: 17, textAlign: 'center', children: [_jsx(Box, { position: 'absolute', bottom: 15, right: 10, children: _jsxs(Typography, { variant: "body2", fontSize: 12, color: "textSecondary", sx: { marginTop: 1 }, children: ["code: ", data?.certificate_code || code] }) }), _jsx(Typography, { variant: "h5", fontSize: 12, color: "primary", gutterBottom: true, children: "FTECH Academy" }), _jsx(Typography, { mt: 0, variant: "h3", fontWeight: "bold", fontSize: 15, color: "primary", gutterBottom: true, children: "Certificate of Completion" }), _jsx(Typography, { variant: "h6", fontSize: 12, color: "textSecondary", gutterBottom: true, children: "This certifies that" }), _jsx(Typography, { variant: "h4", fontSize: 16, fontWeight: "bold", gutterBottom: true, children: data?.name || name }), _jsx(Typography, { variant: "h6", fontSize: 12, color: "textSecondary", gutterBottom: true, children: "has successfully completed the course" }), _jsx(Typography, { variant: "h5", fontSize: 15, fontWeight: "bold", gutterBottom: true, children: data?.description || description }), _jsx(Typography, { variant: "body1", fontSize: 12, color: "textSecondary", sx: { marginTop: 1 }, children: "Special Recognition: Outstanding Performance" }), _jsxs(Typography, { variant: "body2", fontSize: 12, color: "textSecondary", sx: { marginTop: 1 }, children: ["Completion Date: ", moment(data?.issue_date).format('LLLL')] })] }) }) }), _jsx(Button, { onClick: downloadPDF, variant: "contained", color: "primary", sx: {
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '30px',
                            textTransform: 'none',
                            marginBottom: '16px',
                        }, startIcon: _jsx(DownloadIcon, {}), children: "T\u1EA3i xu\u1ED1ng ch\u1EE9ng ch\u1EC9" })] })] }));
};
export default Certificate;
