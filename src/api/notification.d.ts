export declare const getNotificationById: (id: string) => Promise<any>;
export declare const markAsRead: (id: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const markAllAsRead: (user_id: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const deleteAllNotificationsByUserId: (user_id: string) => Promise<import("axios").AxiosResponse<any, any>>;
