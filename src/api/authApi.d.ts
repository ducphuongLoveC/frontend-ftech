export declare const verifyCaptcha: (token: string | null) => Promise<any>;
export declare const registerUser: (data: {
    name: string;
    email: string;
    password: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const login: (data: {
    email: string;
    password: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
