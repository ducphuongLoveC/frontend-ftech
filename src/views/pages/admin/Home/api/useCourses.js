import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
const useCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('api/courses');
                const coursesData = response.data.data;
                if (Array.isArray(coursesData)) {
                    setCourses(coursesData);
                }
                else {
                    console.error('Courses data is not an array:', coursesData);
                    setError('Invalid data format received.');
                    setCourses([]);
                }
            }
            catch (error) {
                console.error('Error fetching courses:', error);
                setError('Failed to fetch courses');
            }
            finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);
    return { courses, loading, error };
};
export default useCourses;
