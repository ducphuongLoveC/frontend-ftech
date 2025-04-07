import CardCourse from './CardCourse';
// my pj
import CourseSettingTab from '../Modules/CourseSettingTab';

import { Course } from '@/interfaces/course';
import TableModuleTab from '../Modules/TableModuleTab';
import DescriptionTab from '../Modules/DescriptionTab';
interface CourseFormProps {
  datas?: Course;
  onSubmit: (courses: Course) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ datas, onSubmit }) => {
  return (
    <CardCourse
      defaultValue={datas ? datas : {}}
      onSubmit={onSubmit}
      labels={['Chương học', 'Mô tả', 'Cài đặt']}
      contents={[TableModuleTab, DescriptionTab, CourseSettingTab]}
    />
  );
};

export default CourseForm;
