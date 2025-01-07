import React from 'react';
interface CardCourseProps {
    labels: React.ReactNode[];
    contents: React.ComponentType<any>[];
    widthIconImage?: string;
    onSubmit?: (datas: {
        title: string;
        thumbnail: File | null;
    } | any) => void;
    initialTitle?: string;
    initialThumbnail?: File | null | string;
    defaultValue?: any;
    isImage?: boolean;
}
declare const CardCourse: React.FC<CardCourseProps>;
export default CardCourse;
