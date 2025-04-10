import CourseForm from '../Components/CourseForm';
import { useMutation } from '@tanstack/react-query';
import { newCourse } from '@/api/courseApi';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// my pj
import { Course } from '@/interfaces/course';
import path from '@/constants/routes';
import HeaderTitle from '../../Title';
import sleep from '@/utils/sleep';
import Loading from '@/ui-component/Loading';

const NewCourse: React.FC = () => {
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
    onError: (error: any) => {
      console.log(error.response.data.message);

      toast.dismiss();
      toast.error(error.response.data.message);
    },
  });

  const handleNewCourse = async (course: Course) => {
    mutation.mutate(course);
  };

  const data = {
    title: 'Khóa học mới',
    description: 'Mô tả khóa học mới',
    thumbnail: null,
    modules: [
      {
        title: 'Chương 1',
        description: 'Mô tả chương 1',
        resources: [
          {
            title: 'Tài liệu 1',
            description: 'Mô tả tài liệu 1',
            resource_type: 'video',
          },
        ],
      },
    ],
  };

  return (
    <>
      <HeaderTitle
        des='Chức năng "Tạo khóa học" cho phép quản trị 
        viên tạo nhanh các thông tin của một khóa học, bao gồm modules, resources.'
        titleButton="Danh sách khóa học"
        link={path.admin.courses}
      />
      <CourseForm onSubmit={handleNewCourse} datas={data} />
      {mutation.isPending && <Loading />}
      <ToastContainer />
    </>
  );
};

export default NewCourse;
