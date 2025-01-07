export declare const getCoursesProgressWithUser: (user_id: string) => Promise<any>;
export declare const resetPassword: (data: {
    email: string;
    newPassword: string;
    confirmPassword: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
