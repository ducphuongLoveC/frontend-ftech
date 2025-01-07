export declare const createOtp: (email: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const createOtpForResetPassword: (email: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const verifyOtp: (data: {
    email: string;
    otp: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
