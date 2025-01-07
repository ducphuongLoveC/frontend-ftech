export declare const getNotes: (resource_id: string, user_id: string, queries: any[]) => Promise<any>;
export declare const createNote: (noteData: {
    title: string;
    content: string;
    resource_id: string;
    user_id: string;
    markAt: number;
}) => Promise<any>;
export declare const updateNote: (noteId: string, content: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const deleteNote: (noteId: string) => Promise<import("axios").AxiosResponse<any, any>>;
