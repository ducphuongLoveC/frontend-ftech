import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation, useQuery } from '@tanstack/react-query';
import CourseForm from './CourseForm';
import HeaderTitle from '../Title';
import path from '@/constants/routes';
import { getCourse, updateCourse } from '@/api/courseApi';
import { useParams } from 'react-router-dom';
// toast
import { ToastContainer, toast } from 'react-toastify';
import Loading from '@/ui-component/Loading';
const UpdateCourse = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['course', id],
        queryFn: () => getCourse(id || ''),
        enabled: !!id,
    });
    const mutation = useMutation({
        mutationKey: ['course', id],
        mutationFn: (course) => updateCourse(id || '', course),
        onSuccess: async () => {
            toast.dismiss();
            toast.success('Cập nhật khóa học thành công.');
        },
        onError: (error) => {
            console.log(error.response.data.message);
            toast.dismiss();
            toast.error(error.response.data.message);
        },
    });
    const handleUpdateCourse = (course) => {
        console.log(course);
        mutation.mutate(course);
    };
    if (isLoading)
        return _jsx("div", { children: "Loading..." });
    if (isError)
        return _jsx("div", { children: "Error fetching course data" });
    return (_jsxs(_Fragment, { children: [_jsx(HeaderTitle, { des: 'Ch\u1EE9c n\u0103ng "S\u1EEDa kh\u00F3a h\u1ECDc" cho ph\u00E9p qu\u1EA3n tr\u1ECB vi\u00EAn s\u1EEDa nhanh c\u00E1c th\u00F4ng tin c\u1EE7a m\u1ED9t kh\u00F3a h\u1ECDc, bao g\u1ED3m modules, resources.', titleButton: "Danh s\u00E1ch kh\u00F3a h\u1ECDc", link: path.admin.courses }), _jsx(CourseForm, { onSubmit: handleUpdateCourse, datas: data }), _jsx(ToastContainer, {}), mutation.isPending && _jsx(Loading, {})] }));
};
export default UpdateCourse;
