export declare const fetchRatingByCourseId: (course_id: string) => Promise<any>;
export declare const createRating: (data: {
    user_id: string;
    course_id: string;
    stars: number;
    comment: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
