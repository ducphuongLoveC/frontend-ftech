import axiosInstance from './axiosInstance';
export const getCommentByResourceId = async (resource_id) => {
    try {
        const res = await axiosInstance.get(`api/comment/${resource_id}`);
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
};
export const createComment = async (data) => {
    try {
        const res = await axiosInstance.post(`api/comment`, data);
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
};
export const deleteComment = async (id) => {
    try {
        const res = await axiosInstance.delete(`api/comment/${id}`);
        return res;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
