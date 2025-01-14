import axiosInstance from './axiosInstance';
export const fetchLearningPaths = async (params) => {
    const res = await axiosInstance('api/learning-path', { params });
    return res.data.data;
};
export const newLearningPath = async (datas) => {
    const res = await axiosInstance.post('api/learning-path', datas);
    return res;
};
export const updateLearningPath = async (_id, updateData) => {
    const res = await axiosInstance.patch(`api/learning-path/${_id}`, updateData);
    return res.data;
};
export const deleteLearningPath = async (_id) => {
    const res = await axiosInstance.delete(`api/learning-path/${_id}`);
    return res;
};
