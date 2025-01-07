import axiosInstance from './axiosInstance';
export const createCoupon = async (data) => {
    try {
        const res = await axiosInstance.post('api/coupon', data);
        return res;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
export const updateCoupon = async (payload) => {
    try {
        const res = await axiosInstance.patch(`api/coupon/${payload.id}`, payload.data);
        return res;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
export const getAllCoupon = async (params) => {
    try {
        const { data } = await axiosInstance.get('api/coupon', { params });
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
export const deleteCoupon = async (id) => {
    try {
        const res = await axiosInstance.delete(`api/coupon/${id}`);
        return res;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
export const getCouponsByCourseId = async (course_id) => {
    try {
        const { data } = await axiosInstance.get(`api/coupon/${course_id}`);
        return data.data;
    }
    catch (error) {
        throw error;
    }
};
export const applyCoupon = async (payload) => {
    try {
        const { data } = await axiosInstance.post(`api/coupon/apply-coupon`, payload);
        return data.data;
    }
    catch (error) {
        throw error;
    }
};
