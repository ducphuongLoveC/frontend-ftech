import { LearningPath } from '@/views/pages/admin/LearningPath/LearningPathList';
export declare const fetchLearningPaths: (params: {}) => Promise<any>;
export declare const newLearningPath: (datas: {
    title: string;
    description: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const updateLearningPath: (_id: string, updateData: LearningPath) => Promise<any>;
export declare const deleteLearningPath: (_id: string) => Promise<import("axios").AxiosResponse<any, any>>;
