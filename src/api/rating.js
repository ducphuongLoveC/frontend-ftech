import axiosInstance from './axiosInstance';
export const fetchRatingByCourseId = async (course_id) => {
    try {
        const { data } = await axiosInstance.get(`api/rating/${course_id}`);
        return data;
    }
    catch (error) {
        throw error;
    }
};
export const createRating = async (data) => {
    try {
        const res = await axiosInstance.post('api/rating', data);
        return res;
    }
    catch (error) {
        throw error;
    }
};
