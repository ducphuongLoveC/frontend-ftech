import { Navigate, useParams } from 'react-router-dom';

import Cookies from 'js-cookie';
const HasAccess: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { id: course_id } = useParams<{ id: string }>();

  const user = JSON.parse(Cookies.get('user') || 'null');

  if (user && Object.keys(user).length && user.courses.includes(course_id)) {
    return <div>{children}</div>;
  }
  return <Navigate to={`/courses/${course_id}`} replace />;
};

export default HasAccess;
