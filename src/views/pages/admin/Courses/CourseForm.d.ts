import { Course } from '@/interfaces/course';
interface CourseFormProps {
    datas?: Course;
    onSubmit: (courses: Course) => void;
}
declare const CourseForm: React.FC<CourseFormProps>;
export default CourseForm;
