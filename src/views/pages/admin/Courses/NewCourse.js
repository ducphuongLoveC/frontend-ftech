import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import CourseForm from './CourseForm';
import { useMutation } from '@tanstack/react-query';
import { newCourse } from '@/api/courseApi';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import path from '@/constants/routes';
import HeaderTitle from '../Title';
import sleep from '@/utils/sleep';
import Loading from '@/ui-component/Loading';
const NewCourse = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationKey: ['courses'],
        mutationFn: newCourse,
        onSuccess: async () => {
            toast.dismiss();
            toast.success('Tạo khóa học thành công');
            await sleep(2000);
            navigate(path.admin.courses);
        },
        onError: (error) => {
            console.log(error.response.data.message);
            toast.dismiss();
            toast.error(error.response.data.message);
        },
    });
    const handleNewCourse = async (course) => {
        console.log(course);
        mutation.mutate(course);
    };
    return (_jsxs(_Fragment, { children: [_jsx(HeaderTitle, { des: 'Ch\u1EE9c n\u0103ng "T\u1EA1o kh\u00F3a h\u1ECDc" cho ph\u00E9p qu\u1EA3n tr\u1ECB \r\n        vi\u00EAn t\u1EA1o nhanh c\u00E1c th\u00F4ng tin c\u1EE7a m\u1ED9t kh\u00F3a h\u1ECDc, bao g\u1ED3m modules, resources.', titleButton: "Danh s\u00E1ch kh\u00F3a h\u1ECDc", link: path.admin.courses }), _jsx(CourseForm, { onSubmit: handleNewCourse }), mutation.isPending && _jsx(Loading, {}), _jsx(ToastContainer, {})] }));
};
export default NewCourse;
