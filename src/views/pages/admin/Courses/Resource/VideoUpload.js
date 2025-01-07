import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useImperativeHandle, forwardRef } from 'react';
import { Box, Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import Storage from '../Storage';
const VideoUpload = forwardRef(({ defaultValue }, ref) => {
    const [formData, setFormData] = useState({
        _id: defaultValue?._id || '',
        fileName: '',
        // file: null,
        resource_type: 'Video',
        duration: defaultValue?.duration || '',
        url: defaultValue?.url || '',
    });
    const [videoSrc, setVideoSrc] = useState('');
    // Expose getData method
    useImperativeHandle(ref, () => ({
        getData: () => formData,
    }));
    const handleFile = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const videoElement = document.createElement('video');
                videoElement.src = reader.result;
                videoElement.onloadedmetadata = () => {
                    setVideoSrc(videoElement.src);
                    setFormData((prev) => ({
                        ...prev,
                        file: file,
                        fileName: file.name,
                        duration: Math.floor(videoElement.duration),
                    }));
                };
            };
            reader.readAsDataURL(file);
        }
    };
    return (_jsxs(Box, { children: [_jsxs(Button, { component: "label", startIcon: _jsx(CloudUpload, {}), children: ["T\u1EA3i l\u00EAn video", _jsx("input", { type: "file", accept: "video/*", hidden: true, onChange: handleFile })] }), _jsx(Storage, { type: "videos", onSelectMedia: (url) => {
                    const video = document.createElement('video');
                    video.src = url;
                    video.onloadedmetadata = () => {
                        const duration = Math.round(video.duration);
                        setFormData((pre) => ({
                            ...pre,
                            url,
                            duration,
                        }));
                    };
                } }), videoSrc ? _jsx("video", { controls: true, src: videoSrc }) : formData.url && _jsx("video", { controls: true, src: formData.url })] }));
});
export default VideoUpload;
