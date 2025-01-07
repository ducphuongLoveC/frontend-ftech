export declare const hasAccess: (user_id: string, course_id: string) => Promise<any>;
export declare const createAccess: ({ user_id, course_id }: {
    user_id: string;
    course_id: string;
}) => Promise<any>;
