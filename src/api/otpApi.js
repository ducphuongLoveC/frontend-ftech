import axiosInstance from './axiosInstance';
export const createOtp = async (email) => {
    try {
        const res = await axiosInstance.post(`api/otp/send`, { email });
        return res;
    }
    catch (error) {
        throw error.response.data.message;
    }
};
export const createOtpForResetPassword = async (email) => {
    try {
        const res = await axiosInstance.post(`api/otp/send?type=forget`, { email });
        return res;
    }
    catch (error) {
        throw error.response.data.message;
    }
};
export const verifyOtp = async (data) => {
    try {
        const res = await axiosInstance.post(`api/otp/verify`, data);
        return res;
    }
    catch (error) {
        throw error;
    }
};
