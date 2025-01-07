import axiosInstance from './axiosInstance';
export const createOrder = async ({ user_id, course_id, payment_method, amount, code, email, }) => {
    const res = await axiosInstance.post(`api/order`, { user_id, course_id, payment_method, amount, code, email, test: '123' });
    return res.data;
};
export const getOrders = async () => {
    const res = await axiosInstance.get(`api/order`);
    return res.data;
};
