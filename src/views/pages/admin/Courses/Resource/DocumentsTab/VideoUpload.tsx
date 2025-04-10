import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Box, Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

import Storage from '../../Components/Storage';

const VideoUpload = forwardRef(({ defaultValue }: any, ref) => {
  const [formData, setFormData] = useState<any>({
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

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const videoElement = document.createElement('video');
        videoElement.src = reader.result as string;
        videoElement.onloadedmetadata = () => {
          setVideoSrc(videoElement.src);
          setFormData((prev: any) => ({
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

  return (
    <Box>
      <Button component="label" startIcon={<CloudUpload />}>
        Tải lên video
        <input type="file" accept="video/*" hidden onChange={handleFile} />
      </Button>
      {/* <Storage
        type="videos"
        onSelectMedia={(url) => {
          setFormData((pre: any) => ({
            ...pre,
            url,
          }));
        }}
      /> */}

      <Storage
        type="videos"
        onSelectMedia={(url) => {
          const video = document.createElement('video');
          video.src = url;

          video.onloadedmetadata = () => {
            const duration = Math.round(video.duration);
            setFormData((pre: any) => ({
              ...pre,
              url,
              duration,
            }));
          };
        }}
      />

      {videoSrc ? (
        <video width={'100%'} controls src={videoSrc} />
      ) : (
        formData.url && <video width={'100%'} controls src={formData.url} />
      )}
    </Box>
  );
});

export default VideoUpload;
