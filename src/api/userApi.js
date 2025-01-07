import axiosInstance from './axiosInstance';
export const getCoursesProgressWithUser = async (user_id) => {
    try {
        const { data } = await axiosInstance.get(`api/user/${user_id}/courses`);
        return data;
    }
    catch (error) {
        throw error;
    }
};
export const resetPassword = async (data) => {
    try {
        const res = await axiosInstance.put('api/user/reset-password', data);
        return res;
    }
    catch (error) {
        throw error;
    }
};
