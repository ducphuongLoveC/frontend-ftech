export declare const createCoupon: (data: {}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const updateCoupon: (payload: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getAllCoupon: (params: any) => Promise<any>;
export declare const deleteCoupon: (id: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getCouponsByCourseId: (course_id: string) => Promise<any>;
export declare const applyCoupon: (payload: {
    code: string;
    course_id: string;
    price: string;
    user_id: string;
}) => Promise<any>;
